import { Body, Controller, Post, Put } from '@nestjs/common';
import { UserRegisterDto } from './dto/create-user-register.dto';
import { AuthenticationService } from './authentication.service';
import { CreateUserActivateDto } from './dto/create-user-activate.dto';

@Controller('auth')
export class AuthenticationController {
    constructor(private readonly authService: AuthenticationService) { }

    @Post('register')
    register(@Body() userRegisterDto: UserRegisterDto) {
        return this.authService.register(userRegisterDto);
    }

    @Put('account-activation')
    accountActivation(@Body() createUserActivateDto: CreateUserActivateDto) {
        return this.authService.accountActivation(createUserActivateDto);
    }
}
