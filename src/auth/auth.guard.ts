import { CanActivate,
         ExecutionContext,
         Injectable
 } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UnauthorizedError } from "src/exceptions/unauthentication.error";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authorization = request.headers['authorization'];

        if (!authorization) {
            throw new UnauthorizedError('Acces token not found');
        }

        const token = authorization.replace('Bearer ', '');

        try {
            const payload = await this.jwtService.verifyAsync(token);
            request['user']= payload;
            return true;
        } catch (e) {
            throw new UnauthorizedError(e.message);
        }
        
    }
}