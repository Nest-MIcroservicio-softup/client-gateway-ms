import { Module } from '@nestjs/common';
import { ProductosModule } from './productos/productos.module';
import { OrdenesModule } from './ordenes/ordenes.module';
import { NatsModule } from './transports/nats.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [ProductosModule, OrdenesModule, NatsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
