import { BadRequestException, Injectable } from '@nestjs/common';
import { StatusEnum } from 'src/utils/status.enum';
import { BaseService } from '../base/base.service';
import { ParkingService } from '../parking/parking.service';
import { PriceListDetailService } from '../price-list-detail/price-list-detail.service';
import { TypeCarService } from '../type-car/type-car.service';
import User from '../user/user.entity';
import { PriceListCreate } from './dto/price-list-create.dto';
import { PriceListUpdate } from './dto/price-list-update.dto';
import PriceList from './price-list.entity';
import { PriceListRepository } from './price-list.repository';

@Injectable()
export class PriceListService extends BaseService<PriceList> {
  constructor(
    private priceListRepository: PriceListRepository,
    private parkingService: ParkingService,
    private priceListDetail: PriceListDetailService,
    private typeCarService: TypeCarService,
  ) {
    super(priceListRepository);
  }

  async createPriceList(
    user: User,
    idParking: string,
    priceListCreate: PriceListCreate,
  ): Promise<string> {
    const isExsitParking = await this.parkingService.findById(idParking);

    if (!isExsitParking) {
      throw new BadRequestException('Parking Not Found');
    }

    const parking = await this.parkingService.getParkingIdBusiness(
      idParking,
      user.business.id,
    );

    if (!parking) {
      throw new BadRequestException("You can't not host of parking");
    }

    const isExsitPriceParking =
      await this.priceListRepository.findPriceListByIdParking(
        parking.id,
        StatusEnum.ACTIVE,
      );

    if (isExsitPriceParking) {
      const priceList = await this.createData({
        name: priceListCreate.name,
        parking: parking,
        status: StatusEnum.IN_ACTIVE,
      });

      for (const item of priceListCreate.priceListDetails) {
        const typeCar = await this.typeCarService.findById(item.typeCarId);
        if (!typeCar) {
          throw new BadRequestException('TypeCar not found ' + item.typeCarId);
        }
        await this.priceListDetail.createData({
          price: item.price,
          typeCar,
          priceList,
        });
      }
      return 'Create Price Parking Successfully';
    }

    const priceList = await this.createData({
      name: priceListCreate.name,
      parking: parking,
      status: StatusEnum.ACTIVE,
    });

    for (const item of priceListCreate.priceListDetails) {
      const typeCar = await this.typeCarService.findById(item.typeCarId);
      if (!typeCar) {
        throw new BadRequestException('TypeCar not found ' + item.typeCarId);
      }
      await this.priceListDetail.createData({
        price: item.price,
        typeCar,
        priceList,
      });
    }
    return 'Create Price Parking Successfully';
  }

  async getPriceLists(): Promise<PriceList[]> {
    return this.priceListRepository.find({
      relations: ['parking', 'priceListDetails', 'priceListDetails.typeCar'],
    });
  }

  async getPriceListsByIdParking(idParking: string): Promise<PriceList[]> {
    const parking = await this.parkingService.findById(idParking);

    if (!parking) {
      throw new BadRequestException("You can't not host of parking");
    }

    return this.priceListRepository.find({
      relations: ['parking', 'priceListDetails', 'priceListDetails.typeCar'],
      where: {
        parking: parking,
      },
      order: { status: 'ASC' },
    });
  }

  async updateStatusPriceList(
    status: StatusEnum,
    idPriceList: string,
    user: User,
  ): Promise<string> {
    const priceList = await this.findById(idPriceList);
    if (!priceList) {
      throw new BadRequestException('PriceList Not Found');
    }
    const checkPriceListHost = await this.priceListRepository.checkPriceList(
      user,
      idPriceList,
    );

    if (!checkPriceListHost) {
      throw new BadRequestException("You can't not host of parking");
    }

    if (priceList.status === status) {
      throw new BadRequestException('Sorry PriceList was ' + priceList.status);
    }
    //check
    const listPriceOfParking = await this.priceListRepository.find({
      relations: ['parking'],
      where: {
        parking: checkPriceListHost.parking,
      },
      order: { status: 'ASC' },
    });
    if (listPriceOfParking.length === 1) {
      throw new BadRequestException(
        "You have one PriceList and can't not update of PriceList ",
      );
    }
    await this.update(listPriceOfParking[0].id, {
      status:
        status === StatusEnum.ACTIVE ? StatusEnum.IN_ACTIVE : StatusEnum.ACTIVE,
    });
    await this.update(priceList.id, { status: status });
    return 'Update Status Successfully';
  }

  async updatePriceList(
    priceListUpdate: PriceListUpdate,
    user: User,
    id: string,
  ): Promise<string> {
    const priceList = await this.priceListRepository.findOne(
      { id: id },
      {
        relations: ['parking', 'priceListDetails', 'priceListDetails.typeCar'],
      },
    );
    if (!priceList) {
      throw new BadRequestException('PriceList Not Found');
    }

    const parking = await this.parkingService.getParkingIdBusiness(
      priceList.parking.id,
      user.business.id,
    );

    if (!parking) {
      throw new BadRequestException("You can't not host of parking");
    }

    const priceListUpdated = await this.update(priceList.id, {
      name: priceListUpdate.name,
    });
    const priceListDetail =
      await this.priceListDetail.findPriceListDetailByIdPriceList(
        priceListUpdated,
      );

    for (const item of priceListUpdate.priceListDetails) {
      const typeCar = await this.typeCarService.findById(item.typeCarId);
      if (!typeCar) {
        throw new BadRequestException('TypeCar not found ' + item.typeCarId);
      }
      for (const i of priceList.priceListDetails) {
        if (i.typeCar.id === typeCar.id) {
          await this.priceListDetail.update(priceListDetail.id, {
            price: item.price,
            typeCar: typeCar,
            priceList: priceListUpdated,
          });
        }
      }
    }

    return 'Update PriceList SuccessFully';
  }
}
