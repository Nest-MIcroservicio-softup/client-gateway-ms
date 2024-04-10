import { Controller, Get, Post, Body,  Param,  Inject, Query, ParseUUIDPipe, Patch,  } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE, ORDERS_SERVICE } from 'src/config';
import { CreateOrdeneDto } from './dto/create-ordene.dto';
import { catchError } from 'rxjs';
import { OrderpaginationDto, StatusDto } from './dto';
import { PaginacionDto } from 'src/common/dtos';

@Controller('ordenes')
export class OrdenesController {
  constructor(
    @Inject(NATS_SERVICE) private client: ClientProxy
  ) {}

  @Post()
  create(@Body() createOrdeneDto: CreateOrdeneDto) {
    console.log(createOrdeneDto)
    return this.client.send({ cmd: 'crear-orden' }, createOrdeneDto);
  }

  @Get()
  findAll(@Query() orderPaginationDto : OrderpaginationDto ){
        
    return this.client.send({ cmd: 'obtener-ordenes' },orderPaginationDto)
    .pipe(
      catchError(err => {throw new RpcException(err)})
    );
  }

  @Get('id/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.client.send({ cmd: 'obtener-orden-por-id' },{id})
    .pipe(
      catchError(err => {throw new RpcException(err)})
    );
  }

  @Get(':status')
  findAllByStatus(
    @Param() statusDto: StatusDto,
    @Query() paginacionDto : PaginacionDto

  ){

     return this.client.send({ cmd: 'obtener-ordenes' },{
        status: statusDto.status,
        ...paginacionDto
     })
     .pipe(
       catchError(err => {throw new RpcException(err)})
     );
  }

  @Patch(':id') 
  changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto
  ){
    return this.client.send({ cmd: 'cambiar-status-orden' },{
      status: statusDto.status,
      id
   })
   .pipe(
     catchError(err => {throw new RpcException(err)})
   );
  }
 
}
