import { AuthGuardProps } from './AuthGuard';
import { GuestGuardProps } from './GuestGuard';
import { RoleGuardProps } from './RoleGuard';

export * from './AuthGuard';
export * from './GuestGuard';
export * from './RoleGuard';

export type GuardProps = Partial<RoleGuardProps & GuestGuardProps & AuthGuardProps>;
