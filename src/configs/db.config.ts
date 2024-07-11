import * as dotenv from 'dotenv';
dotenv.config();
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { UserSchema } from "src/user/user.entity";

export const mySqlConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [UserSchema],
    synchronize: true,
};

export default null;
