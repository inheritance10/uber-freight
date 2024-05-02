import { Module } from '@nestjs/common';
import { AuthGuard } from "../common/guards/auth.guard";


@Module({
  providers: [AuthGuard]
})
export class RootTestModule {}
