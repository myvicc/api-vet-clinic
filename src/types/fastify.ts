import { HTTPMethods } from 'fastify';
import { DoctorType } from './doctor.type';
import { UserType } from './User.type';
import { Permission } from './Permission';

declare module 'fastify' {
  interface FastifyRequest {
    user?: Omit<DoctorType, 'id'> | Omit<UserType, 'id'>;
    permission?: [Omit<DoctorType, 'id'> | Omit<UserType, 'id'>]; //?
  }

  interface FastifyContextConfig {
    withAuth?: boolean;
    permission?: Permission[];
    url?: string;
    method?: HTTPMethods;
  }
}

export {};
