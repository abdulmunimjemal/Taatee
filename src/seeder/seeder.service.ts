// src/seeder/seeder.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Connection } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { Role } from 'src/auth/role/role.enum';
import * as dotenv from 'dotenv';

dotenv.config();
const salt = parseInt(process.env.SALT, 10);

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(private readonly connection: Connection) {}

  async onModuleInit() {
    await this.seedAdmin();
  }

  private async seedAdmin() {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@test.com';

    // Find the admin user by email
    const adminUser = await this.connection.getRepository(User).findOne({ where: { email: adminEmail } });

    if (!adminUser) {
      // Create admin user
      const newAdminUser = new User();
      newAdminUser.email = adminEmail;
      newAdminUser.firstName = process.env.ADMIN_FIRST_NAME || 'Abdulmunim';
      newAdminUser.lastName = process.env.ADMIN_LAST_NAME || 'Jundurahman';
      newAdminUser.password = process.env.ADMIN_PASSWORD || 'admin'; // You should hash the password
      newAdminUser.role = Role.Admin;

      let password = newAdminUser.password;

      newAdminUser.password = await bcrypt.hashSync(newAdminUser.password, 10);

      // Save admin user to the database
      await this.connection.getRepository(User).save(newAdminUser);

      console.log('Admin user created successfully.');
      console.log('Email:' + newAdminUser.email);
      console.log('Password:' + password);
      console.log('Please change the password immediately.');

    } else {
      // Update existing admin user
      adminUser.firstName = process.env.ADMIN_FIRST_NAME || 'Abdulmunim';
      adminUser.lastName = process.env.ADMIN_LAST_NAME || 'Jundurahman';
      adminUser.password = process.env.ADMIN_PASSWORD || 'admin'; // You should hash the password

      let password = adminUser.password;

      adminUser.password = await bcrypt.hashSync(adminUser.password, salt);

      // Save updated admin user to the database
      await this.connection.getRepository(User).save(adminUser);

      console.log('Admin user updated successfully.');
      console.log('Email:' + adminUser.email);
      console.log('Password:' + password);
      console.log('Please change the password immediately.');
    }
  }
}
