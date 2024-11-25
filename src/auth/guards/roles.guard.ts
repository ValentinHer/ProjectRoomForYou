import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Roles } from "../decorators/roles.decorator";
import { UserService } from "../../user/user.service";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector, private userService: UserService){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.get(Roles, context.getHandler());
        if(!roles) return true;

        const { user } = context.switchToHttp().getRequest();
        const userFound = await this.userService.findOne(user.userId);
        const matchRoles = this.matchRoles(roles, userFound.role.name);
        if(!matchRoles) throw new UnauthorizedException("User Unauthorized, you don't have the necessary roles");
        return true;
    }

    private matchRoles(roles: string[], userRole: string){
        return roles.includes(userRole);
    }
}