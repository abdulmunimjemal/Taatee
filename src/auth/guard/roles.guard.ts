import { Role } from '../role/role.enum'
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<Role[]>('roles', context.getHandler())
    if (!roles  || roles.length === 0) {
      // No roles are specified, allow access
      return true
    }

    const request = context.switchToHttp().getRequest()
    const user = request.user

    // Check if the user has the 'admin' role
    if (roles.includes(Role.Admin)) {
        if (user.role !== Role.Admin) {
            throw new ForbiddenException('Unauthorized: Higher Priviledge Required');
          }
      }
    return true;
  }
}