import { HTTPMethods } from 'fastify';
import { DoctorType } from './Doctor.type';
import { UserType } from './User.type';
import { Permission } from './Permission';

declare module 'fastify' {
  interface FastifyRequest {
    user?: DoctorType | UserType;
    permission?: [Omit<DoctorType, 'id'> | Omit<UserType, 'id'>]; //? Omit<DoctorType, 'id'>[] | Omit<UserType, 'id'>[];
  }

  interface FastifyContextConfig {
    withAuth?: boolean;
    permission?: Permission[];
    url?: string;
    method?: HTTPMethods;
  }
}

export {};
