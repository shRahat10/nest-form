import { IsNotEmpty } from "class-validator";

export class UserRegisterDto {
    @IsNotEmpty({
        message: 'Full Name is Required'
    })
    readonly fullName: string;

    @IsNotEmpty({
        message: 'Email is Required'
    })
    readonly email: string;

    @IsNotEmpty({
        message: 'Password is Required'
    })
    readonly password: string;
}