import { Module } from '@nestjs/common';
import { ProductosModule } from './productos/productos.module';
import { OrdenesModule } from './ordenes/ordenes.module';
import { NatsModule } from './transports/nats.module';
import { HealthCheckModule } from './health-check/health-check.module';



@Module({
  imports: [ProductosModule, OrdenesModule, NatsModule, HealthCheckModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
