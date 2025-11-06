import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { SerializedUser } from '../auth.interface';
type SerializationDone = (err: Error | null, data?: unknown) => void;

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: SerializedUser, done: SerializationDone) {
    console.log('🔐 Serializing user:', {
      id: user.id,
      email: user.email,
      provider: user.provider,
      firstName: user.firstName,
      lastName: user.lastName,
    });
    done(null, user);
  }

  deserializeUser(payload: SerializedUser, done: SerializationDone) {
    console.log('🔓 Deserializing user:', {
      id: payload?.id,
      email: payload?.email,
      provider: payload?.provider,
      firstName: payload?.firstName,
      lastName: payload?.lastName,
    });
    done(null, payload);
  }
}
