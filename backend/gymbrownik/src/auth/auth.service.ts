import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthRole } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: DatabaseService,
        private readonly jwtService: JwtService,
    ) {}

    async register(dto: RegisterDto) {
        const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (existing) throw new ConflictException('User already exists');

        const hashed = await bcrypt.hash(dto.password, 10);

        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                name: dto.name,
                password: hashed,
                authRole: dto.authRole || AuthRole.USER,
            },
        });

        return this.generateResponse(user);
    }

    async login(dto: LoginDto) {
        const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (!user) throw new UnauthorizedException('Invalid credentials');

        const valid = await bcrypt.compare(dto.password, user.password);
        if (!valid) throw new UnauthorizedException('Invalid credentials');

        return this.generateResponse(user);
    }

    private generateResponse(user: any) {
        const payload = { sub: user.id, email: user.email, role: user.authRole };
        const token = this.jwtService.sign(payload);

        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.authRole,
            },
        };
    }
}
