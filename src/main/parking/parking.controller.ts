import { MapInterceptor } from '@automapper/nestjs';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetUser } from 'src/decorator/getUser.decorator';
import { FileToBodyInterceptor } from 'src/interceptor/file.interceptor';
import { Public } from '../auth/public';
import { RoleEnum } from '../auth/role/role.enum';
import { Roles } from '../auth/role/roles.decorator';
import { BaseMultipleFiles } from '../base/base.images.dto';
import {
  IPaginateResponse,
  paginateResponse,
} from '../base/filter.pagnigation';
import { ImageService } from '../image/image.service';
import User from '../user/user.entity';
import { ParkingCreateDTO } from './dto/parking-create.dto';
import ParkingFilterPagination from './dto/parking-pagination.filter';
import ParkingDetailDto from './dto/parking-detail.dto';
import ParkingDTO from './dto/parking.dto';
import Parking from './parking.entity';
import { ParkingService } from './parking.service';
import { HttpCacheInterceptor } from 'src/interceptor/httpCache.interceptor';
import { RedisService } from 'src/redis/redis.service';

@ApiBearerAuth()
@ApiTags('Parkings')
@Controller('parkings')
export class ParkingController {
  constructor(
    private readonly parkingService: ParkingService,
    private imageService: ImageService,
    private redisService: RedisService,
  ) {}

  @Roles(RoleEnum.BUSINESS)
  @Post('/:id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('images'), new FileToBodyInterceptor())
  @ApiResponse({
    status: 201,
    description: 'Upload Images Success',
  })
  async uploadImagesParkings(
    @GetUser() user: User,
    @Body() baseMultipleFiles: BaseMultipleFiles,
    @Param('id') id: string,
  ): Promise<string> {
    const data = await this.parkingService.getParking(id);
    if (!data) {
      throw new BadRequestException('parking not found');
    }
    if (data.business.id !== user.business.id) {
      throw new BadRequestException(
        'you can not upload images for parking ' + data.name,
      );
    }
    await this.redisService.clearCache('/api/v1/parkings');
    return this.imageService.createImagesParking(user, baseMultipleFiles, data);
  }

  @Roles(RoleEnum.BUSINESS)
  @Delete('/:id')
  async remove(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<string> {
    await this.redisService.clearCache('/api/v1/parkings');
    return await this.parkingService.removeOwnerParking(id, user.business.id);
  }

  @Roles(RoleEnum.ADMIN)
  @Get('/processing')
  @UseInterceptors(HttpCacheInterceptor)
  async getParkingProcessing(
    @Query() parkingFilterPagination: ParkingFilterPagination,
  ): Promise<IPaginateResponse<ParkingDTO> | { message: string }> {
    const [list, count] = await this.parkingService.getParkingProcessing(
      parkingFilterPagination,
    );
    if (list.length === 0) {
      return { message: 'No Data' };
    }
    return paginateResponse<ParkingDTO>(
      [list, count],
      parkingFilterPagination.currentPage as number,
      parkingFilterPagination.sizePage as number,
    );
  }

  @Roles(RoleEnum.BUSINESS)
  @UseInterceptors(HttpCacheInterceptor)
  @Get('OwnerParking')
  @Get('me')
  @ApiResponse({
    status: 201,
    description: 'Get All Owner Parking Success',
  })
  async getAllOwnerParking(
    @GetUser() user: User,
    @Query() parkingFilterPagination: ParkingFilterPagination,
  ): Promise<IPaginateResponse<ParkingDTO> | { message: string }> {
    const [list, count] = await this.parkingService.getAllOwnerParking(
      user,
      parkingFilterPagination,
    );
    if (list.length === 0) {
      return { message: 'No Data' };
    }
    return paginateResponse<ParkingDTO>(
      [list, count],
      parkingFilterPagination.currentPage as number,
      parkingFilterPagination.sizePage as number,
    );
  }

  @Roles(RoleEnum.BUSINESS)
  @Post()
  @ApiResponse({
    status: 201,
    description: 'Create Parking Success',
  })
  async createParking(
    @GetUser() user: User,
    @Body() parkingCreateDTO: ParkingCreateDTO,
  ): Promise<string> {
    await this.redisService.clearCache('/api/v1/parkings');
    return await this.parkingService.createParking(user, parkingCreateDTO);
  }

  @Public()
  @Get()
  @UseInterceptors(HttpCacheInterceptor)
  @ApiResponse({
    status: 201,
    description: 'Get All Parking Success',
  })
  async getAllParking(
    @Query() parkingFilterPagination: ParkingFilterPagination,
  ): Promise<IPaginateResponse<ParkingDTO> | { message: string }> {
    const [list, count] = await this.parkingService.getAllParking(
      parkingFilterPagination,
    );
    if (list.length === 0) {
      return { message: 'No Data' };
    }
    return paginateResponse<ParkingDTO>(
      [list, count],
      parkingFilterPagination.currentPage as number,
      parkingFilterPagination.sizePage as number,
    );
  }

  @Public()
  @Get('/:id')
  @UseInterceptors(MapInterceptor(ParkingDetailDto, Parking))
  @ApiResponse({
    status: 201,
    description: 'Get Detail Parking Success',
  })
  async getParking(
    @Param('id') id: string,
  ): Promise<Parking | { message: string }> {
    const data = await this.parkingService.getParking(id);
    if (!data) {
      return { message: 'No Data' };
    }
    return data;
  }

  @Put('/:id/confirm')
  @Roles(RoleEnum.ADMIN)
  @UseInterceptors(MapInterceptor(ParkingDetailDto, Parking))
  async confirmParking(@Param('id') id: string): Promise<Parking> {
    return await this.parkingService.confirmParking(id);
  }
}
