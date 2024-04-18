import { ExecutionContext, InternalServerErrorException, createParamDecorator } from "@nestjs/common";

export const Token = createParamDecorator((data:unknown, ctx:ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    if(!request.token) {
        throw new InternalServerErrorException('Token no encontrado en el contexto de la petición');
    }

    return request.token;
}
);