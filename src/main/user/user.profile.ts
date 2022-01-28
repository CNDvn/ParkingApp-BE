import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { mapFrom, Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import User from './user.entity';
import UserDTO from './user.dto';

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper: Mapper): void => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      mapper.createMap(User, UserDTO).forMember(
        (destination: UserDTO) => destination.fullName,
        mapFrom((source: User) => source.firstName + ' ' + source.lastName),
      );
      // .forMember(
      //   (destination: UserDTO) => destination.address,
      //   mapFrom((source: User) => source.customer.address),
      // )
      // .forMember(
      //   (destination: UserDTO) => destination.level,
      //   mapFrom((source: User) => source.customer.level),
      // );
    };
  }
}
