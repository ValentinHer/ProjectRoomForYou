import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Roles } from "../decorators/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get(Roles, context.getHandler());
        if(!roles) return false;

        const request = context.switchToHttp().getRequest();
        const user = request.user;
        return this.matchRoles(roles, user.role.name);
    }

    private matchRoles(roles: string[], userRole: string){
        return roles.includes(userRole);
    }
}