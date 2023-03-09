import { CanActivate, ExecutionContext } from "@nestjs/common";

export class RoleGuard implements CanActivate{
    private rolePassd : string;

    constructor(role:string){
        this.rolePassd = role
    }

    canActivate(context: ExecutionContext):boolean{
        const ctx = context.switchToHttp();
        const req:any = ctx.getRequest<Request>();
        return this.rolePassd == req.user.role;
    }
}