import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../../../common/decorator/public.decorator';
import express from 'express';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class CookieGuard extends AuthGuard('cookie') {
	constructor(private reflector: Reflector) {
		super()
	}

	canActivate(context: ExecutionContext) {
		// check type request
		if (context.getType() !== 'http') {
			return true
		}

		// check public
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
			context.getHandler(),
			context.getClass()
		])

		if (isPublic) return true

		return super.canActivate(context)
	}

}