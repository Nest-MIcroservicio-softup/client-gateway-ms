import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginacionDto } from 'src/common/dtos';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { NATS_SERVICE } from 'src/config';



@Controller('productos')
export class ProductosController {
  constructor(
    @Inject(NATS_SERVICE) private client: ClientProxy
  ) {}


  @Post()
  createProduct(@Body() createProductDto: CreateProductoDto){
    
    return this.client.send({cmd: 'crear-producto'}, createProductDto)
   
  }

  @Get()
  getProducts( @Query() paginacionDto: PaginacionDto){
    return this.client.send({cmd: 'obtener-productos'}, paginacionDto);
  }

  @Get(':id')
  async getProduct(@Param('id') id: number){

    try {
      const producto = await firstValueFrom(
          this.client.send({cmd: 'obtener-producto-por-id'}, {id})
      );

      return producto;
      
    } catch (error) {
      throw new RpcException(error);
    }

   
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string){
    try {
      const producto = await firstValueFrom(
          this.client.send({cmd: 'eliminar-producto'}, {id})
      );

      return producto;
      
    } catch (error) {
      throw new RpcException(error);
    }

  }

  @Patch(':id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductoDto: UpdateProductoDto
  ){

    //console.log(updateProductoDto)
    return this.client.send({cmd: 'actualizar-producto'}, {
      id,...updateProductoDto
    }).pipe(
      catchError(err => {throw new RpcException(err)})
    )
  }

}
