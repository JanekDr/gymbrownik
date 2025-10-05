import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DatabaseService } from 'src/database/database.service';
import { JwtService } from '@nestjs/jwt';

/**
 * Guard do autoryzacji zasobów użytkownika:
 * - ADMIN może wszystko
 * - USER tylko swoje zasoby (na podstawie relacji userId lub własnego ID)
 */
@Injectable()
export class OwnerOrAdminGuard implements CanActivate {
    constructor(
        private readonly prisma: DatabaseService,
        private readonly reflector: Reflector,
        private readonly jwt: JwtService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();

        // 1️⃣ Sprawdzenie tokena
        const authHeader = req.headers.authorization;
        if (!authHeader) throw new ForbiddenException('Missing token');

        const token = authHeader.split(' ')[1];
        const payload = this.jwt.verify(token);
        req.user = payload;

        // 2️⃣ Sprawdzenie dekoratora @Resource('model')
        const modelName = this.reflector.get<string>(
            'resource',
            context.getHandler(),
        );
        if (!modelName) {
            throw new ForbiddenException('No resource specified for this guard');
        }

        // 3️⃣ Sprawdzenie poprawności ID z parametru
        const resourceId = parseInt(req.params.id, 10);
        if (isNaN(resourceId)) {
            throw new ForbiddenException('Invalid resource ID');
        }

        // 4️⃣ Admin ma pełny dostęp
        if (payload.role === 'ADMIN') return true;

        // 5️⃣ Jeśli edytujemy użytkownika, sprawdzamy czy to ten sam
        if (modelName === 'user') {
            return payload.sub === resourceId;
        }

        // 6️⃣ Dla innych modeli szukamy właściciela po userId
        const resource = await this.prisma[modelName].findUnique({
            where: { id: resourceId },
            select: { userId: true },
        });

        if (!resource) {
            throw new NotFoundException(`${modelName} with ID ${resourceId} not found`);
        }

        if (resource.userId !== payload.sub) {
            throw new ForbiddenException('You can only modify your own resources');
        }

        return true;
    }
}
