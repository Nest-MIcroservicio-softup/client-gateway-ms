import { Module } from '@nestjs/common';
import { OrdenesController } from './ordenes.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ORDERS_SERVICE, envs } from 'src/config';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [OrdenesController],
  providers: [],
  imports: [
    NatsModule
  ]
    
})
export class OrdenesModule {}
