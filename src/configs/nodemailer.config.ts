import { MailerOptions } from '@nestjs-modules/mailer';

export const nodemailerConfig: MailerOptions = {
    transport: {
        host: process.env.MAILER_HOST,
        port: process.env.MAILER_PORT,
        secure: true,
        service: 'GMAIL',
        auth: {
            user: process.env.MAILER_USERMAIL,
            pass: process.env.MAILER_PASSWORD,
        },
    }
};