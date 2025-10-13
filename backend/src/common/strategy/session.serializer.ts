import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: any, done: Function) {
    console.log('🔐 Serializing user:', {
      id: user.id,
      email: user.email,
      provider: user.provider,
      firstName: user.firstName,
      lastName: user.lastName
    });
    done(null, user);
  }

  deserializeUser(payload: any, done: Function) {
    console.log('🔓 Deserializing user:', {
      id: payload?.id,
      email: payload?.email, 
      provider: payload?.provider,
      firstName: payload?.firstName,
      lastName: payload?.lastName
    });
    done(null, payload);
  }
}