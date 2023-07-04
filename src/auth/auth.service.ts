import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.getByEmail(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const userRole: string = user.roles[0].name;

    const payload = {
      id: user.id,
      email: user.email,
      roles: [userRole],
    };

    console.log(payload);
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
