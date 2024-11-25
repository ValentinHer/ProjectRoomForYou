import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { IPayload } from "../interfaces/payload.interface";
import { UserService } from "../../user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private userService: UserService){
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.extractJWT]),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET_KEY
        })
    }

    private static extractJWT(req: Request){
        if(req.cookies.token){
            return req.cookies.token;
        }

        return null;
    }

    async validate(payload: IPayload){
        const {sub} = payload;
        const userFound = await this.userService.findOne(sub);
        
        return {userId: payload.sub};
    }
}