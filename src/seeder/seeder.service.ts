// src/seeder/seeder.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Connection } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { Role } from 'src/auth/role/role.enum';

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(private readonly connection: Connection) {}

  async onModuleInit() {
    await this.seedAdmin();
  }

  private async seedAdmin() {
    // Check if admin already exists
    const adminExists = await this.connection.getRepository(User).findOne({ where: { role: Role.Admin } });

    if (!adminExists) {
      // Create admin user
      const adminUser = new User();
      adminUser.email = 'admin@test.com';
      adminUser.firstName = 'Abdulmunim';
      adminUser.lastName = 'Jundurahman';
      adminUser.password = 'admin'; // You should hash the password
      adminUser.role = Role.Admin;

      let password = adminUser.password;

      adminUser.password = await bcrypt.hashSync(adminUser.password, 10);

      // Save admin user to the database
      await this.connection.getRepository(User).save(adminUser);

      console.log('Admin user created successfully.');
      console.log('Email:' + adminUser.email);
      console.log('Password:' + password);
      console.log('Please change the password immediately.');

    } else {
      console.log('Admin user already exists.');
      console.log('Email:' + adminExists.email);
    }
  }
}
