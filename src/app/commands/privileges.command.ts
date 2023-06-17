import { Injectable } from '@nestjs/common';
import { Command, ConsoleIO } from '@squareboat/nest-console';
import * as Joi from 'joi';
import { In } from 'typeorm';
import UserService from '../user/user.service';
import { ConstRoles } from '../roles/role.enum';
import { PermissionsEnum } from '../roles/permissions.enum';
import RolesService from '../roles/roles.service';
import RolesRepository from '../roles/repositories/roles.repository';
import PermissionsRepository from '../roles/repositories/permissions.repository';

@Injectable()
export default class PrivilegesCommands {
  constructor(
    private readonly userService: UserService,
    private readonly rolesService: RolesService,
    private readonly rolesRepository: RolesRepository,
    private readonly permissionRepository: PermissionsRepository,
  ) {}

  @Command('create:superuser {--email} {--password}', {
    desc: 'create a super user',
  })
  async createSuperUser(_cli: ConsoleIO) {
    try {
      const { email, password } = this.getEmail(_cli);
      const existUser = await this.userService.getUserByEmail(email);
      const role = await this.rolesService.createRoleAndPermissions(
        ConstRoles.SuperAdmin,
      );
      if (existUser) {
        await this.userService.updateRole(existUser.id, [
          this.rolesRepository.create(role),
        ]);
        _cli.success(
          `User ${existUser.name} roles' has been updated to ${role.name}`,
        );
      } else {
        _cli.success(`Role ${role.name} is created!`);
        await this.userService.create({
          email,
          name: 'super user',
          password,
          roles: [this.rolesRepository.create(role)],
        });
      }

      _cli.success('SuperUser is created!');
      return true;
    } catch (e) {
      return _cli.error(e.message);
    }
  }

  @Command('create:permissions', { desc: 'create all permissions' })
  async saveAllPermissions(_cli: ConsoleIO) {
    try {
      let i = 0;
      const permissionKeys = Object.keys(PermissionsEnum);
      for (const permission of permissionKeys) {
        const { created } = await this.rolesService.createPermissions({
          permissionName:
            PermissionsEnum[permission as keyof typeof PermissionsEnum],
        });
        _cli.info(
          created
            ? `Permission ${
                PermissionsEnum[permission as keyof typeof PermissionsEnum]
              } created!`
            : `Permission ${
                PermissionsEnum[permission as keyof typeof PermissionsEnum]
              } already exist!`,
        );
        if (created) i++;
      }
      return _cli.success(
        i
          ? `All (${i}) Permissions Created!`
          : 'Permissions already is up to date',
      );
    } catch (e) {
      return _cli.error(e.message);
    }
  }

  @Command('create:roles')
  async saveAllRoles(_cli: ConsoleIO) {
    let i = 0;
    await Promise.all(
      Object.keys(ConstRoles).map(async (r) => {
        const role = ConstRoles[r];
        role.permissions = await this.permissionRepository.find({
          where: {
            permissionName: In(
              role.permissions.map((perm) => perm.permissionName),
            ),
          },
        });
        await this.rolesService.createRoleAndPermissions(role);
        _cli.info(
          `Role ${role.name} created and below Permissions are assigned to it`,
        );
        _cli.info(
          `${role.permissions.map((perm) => perm.permissionName).join(',')}`,
        );
        i++;
      }),
    );
    _cli.success(
      `All (${i}) Roles Created and assigned to related Permissions!`,
    );
  }

  private getEmail(_cli: ConsoleIO): {
    email: string;
    password: string;
  } {
    const emailSchema = Joi.object({
      email: Joi.string().email().messages({
        'string.email': 'please provide a valid email with --email option',
      }),
      password: Joi.string().not('secret_default_value').required().messages({
        'string.email': 'please provide a password with --password option',
      }),
    });

    const email = _cli.option<string>('email');
    _cli.info(`email is: ${email}`);

    const password = String(_cli.option<string>('password'));
    _cli.info(
      `password is: ${password.replace(/./g, '*')} with ${
        password.length
      } characters`,
    );

    const { error } = emailSchema.validate({ email, password });

    if (error) throw new Error(error.message);

    return {
      email,
      password,
    };
  }
}
