import { Injectable,ExecutionContext } from '@nestjs/common'
import {AuthGuard} from '@nestjs/passport'


export class JwtGuard extends AuthGuard('jwt'){
   
     constants={BY_PASS_URLS: ['/auth/login', '/user/signUp']}
    canActivate(context:ExecutionContext){
        const ctx = context.switchToHttp();
        const req = ctx.getRequest<Request>();
      
        for (let x = 0; x < this.constants.BY_PASS_URLS.length; x++) {
            if (req.url == this.constants.BY_PASS_URLS[x]) return true;
          }

        return super.canActivate(context)
    }
}