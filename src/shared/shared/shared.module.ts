import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from 'src/main/user/user.module';
import { SharedService } from './shared.service';

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [SharedService],
  exports: [SharedService],
})
export class SharedModule {}
