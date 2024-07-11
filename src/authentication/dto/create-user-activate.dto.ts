import { IsNotEmpty } from "class-validator";

export class CreateUserActivateDto {
    @IsNotEmpty({
        message: 'Token not found'
    })
    readonly token: string;
}