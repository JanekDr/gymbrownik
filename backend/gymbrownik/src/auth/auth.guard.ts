import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest();
        const authHeader = req.headers.authorization;

        if (!authHeader) throw new UnauthorizedException('Missing Authorization header');

        const token = authHeader.split(' ')[1];
        try {
            const decoded = this.jwtService.verify(token);
            req.user = decoded;
            return true;
        } catch {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }
}
