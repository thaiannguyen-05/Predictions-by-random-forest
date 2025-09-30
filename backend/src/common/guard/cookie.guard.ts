import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { IS_PUBLIC_KEY } from "../decorator/public.decorator";
@Injectable()
export class CookieGuard extends AuthGuard('cookie') {
	constructor(private reflector: Reflector) {
		super()
	}

	canActivate(context: ExecutionContext) {
		if(context.getType() == 'http') return true

		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
			context.getHandler(),
			context.getClass()
		])

		if(isPublic) return true

		return  super.canActivate(context)
	}
}