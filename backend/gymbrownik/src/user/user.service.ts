import { Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly database: DatabaseService) {}

  private async getUserOrThrow(id: number) {
    const user = await this.database.user.findUnique({
      where: { id },
      include: { trainingWeeks: true },
    });

    if (user == null) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async create(dto: CreateUserDto) {
    const hashed = await bcrypt.hash(dto.password, 10);
    return this.database.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        password: hashed,
      },
      include: { trainingWeeks: true },
    });
  }

  async findAll() {
    return this.database.user.findMany({
      include: { trainingWeeks: true },
      orderBy: { id: "asc" },
    });
  }

  async findOne(id: number) {
    return this.getUserOrThrow(id);
  }

  async update(id: number, dto: UpdateUserDto) {
    await this.getUserOrThrow(id);

    return this.database.user.update({
      where: { id },
      data: {
        ...(dto.email && { email: dto.email }),
        ...(dto.name && { name: dto.name }),
      },
      include: { trainingWeeks: true },
    });
  }

  async remove(id: number): Promise<void> {
    await this.getUserOrThrow(id);
    await this.database.user.delete({ where: { id } });
  }
}
