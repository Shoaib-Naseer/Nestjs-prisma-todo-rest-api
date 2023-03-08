import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(private jwtService:JwtService , private prisma:PrismaService){}

    async validateUser(useremail:string,password:string): Promise<any>{
        const user = await this.prisma.user.findUnique({where:{
            email:useremail
        }})
        if (user && user.password==password) {
            const {password, ...result} = user;
            return result;
            
        }
        return null;
    }

    async validateUserById(id: number): Promise<any> {
        const user = await this.prisma.user.findUnique({where:{
            id
        }});
        if (user) {
          const { password, ...result } = user;
          return result;
        }
        return null;
      }


    async login(user: User,loginDto:LoginDto): Promise<any> {
        const payload = { sub: user.id, role: user.role };
        return this.jwtService.sign(payload)
    }
}
