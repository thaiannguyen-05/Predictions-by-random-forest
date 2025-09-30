import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { Strategy } from "passport-custom";
import { AuthService } from "src/modules/auth/service/auth.service";
@Injectable()
export class CookieStrategy extends PassportStrategy(Strategy, 'cookie') {
    constructor(
        private readonly authService: AuthService
    ) {
        super()
    }

    async validate(req: Request): Promise<any> {
        // get access token from req
        const accessToken = req.cookies?.access_token

        if (!accessToken) throw new UnauthorizedException("Access token not found")


        return await this.authService.validate(accessToken)
    }

}