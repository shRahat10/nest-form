import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRegisterDto } from './dto/create-user-register.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { UserSchema } from 'src/user/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateUserActivateDto } from './dto/create-user-activate.dto';

@Injectable()
export class AuthenticationService {
    constructor(
        @InjectRepository(UserSchema) private userRepository: Repository<UserSchema>,
        @InjectDataSource() private readonly dataSource: DataSource,
        private jwtService: JwtService,
        private mailerService: MailerService
    ) { }

    async register(userRegisterDto: UserRegisterDto) {
        try {
            const { fullName, email, password } = userRegisterDto;

            // const result = await this.userRepository.findOneBy({
            //     email: email,
            // });

            const query = `SELECT * FROM users_table WHERE email = '${email}'`
            const result = await this.dataSource.query(query, [email])

            if (result.length > 0) {
                throw new BadRequestException('Unable to Register with this Email', { cause: new Error(), description: 'Email already registered' })
            }

            const hashPassword = await bcrypt.hash(password, 10);

            const newUser = this.userRepository.create({
                fullName,
                email,
                password: hashPassword
            });

            const res = await this.userRepository.save(newUser);

            const payload = {
                id: res?.id,
                email,
            }

            const token = await this.jwtService.signAsync(payload)

            await this.mailerService.sendMail({
                from: 'Shahriar Haque <shahriar.haque.1011@gmail.com>',
                to: email,
                subject: 'Email Verification',
                text: `Click the link to confirm ${process.env.URL}/?token=${token}`,
            })

            return res
        }
        catch (error) {
            return error
        }
    }

    async accountActivation(createUserActivateDto: CreateUserActivateDto) {
        try {
            const { token } = createUserActivateDto;

            const decoded = await this.jwtService.verify(token, {
                secret: process.env.JWT_SECRET_KEY
            })

            if (!decoded) {
                throw new UnauthorizedException('Unauthorize Access')
            }

            const { id } = decoded;

            const isExpired = decoded.exp < Math.floor(Date.now() / 1000);

            if (isExpired) {
                throw new UnauthorizedException('Unauthorize Access')
            }

            const newUser = await this.userRepository.update(
                id,
                {
                    currentStatus: 'activated',
                }
            )

            return {
                newUser
            }
        }
        catch (error) {
            return error
        }
    }
}
