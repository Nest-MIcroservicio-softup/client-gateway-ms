import { Body, Controller, Get, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { create } from 'domain';
import { NATS_SERVICE } from 'src/config';
import { CreateAuthDto, LoginUserDto } from './dto';
import { catchError } from 'rxjs';
import { AuthGuard } from './guards/auth.guard';
import { Token, User } from './decorators';
import { CurrentUser } from './interfaces/current-user.interface';


@Controller('auth')
export class AuthController {
  constructor(
    @Inject(NATS_SERVICE) private client: ClientProxy
  ) { }

  @Post('registro')
  async registro(@Body() createUserDto: CreateAuthDto) {
    return this.client.send('registro.usuario', createUserDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      })
    );
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.client.send('login.usuario', loginUserDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      })
    );
  }

  @UseGuards(AuthGuard)
  @Get('verificar-usuario')
  async verifyUser(@User() user: CurrentUser, @Token() token: string){

    console.log({user, token});
    //return {user, token};    
   
  }


}
