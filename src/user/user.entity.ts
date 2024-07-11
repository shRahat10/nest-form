import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity({
    name: 'users_table'
})
export class UserSchema {
    // for reg
    @PrimaryGeneratedColumn({ type: 'mediumint', unsigned: true, comment: 'User identification number' })
    id: number;

    // for reg
    @Column({ type: 'varchar', length: 100, nullable: false })
    fullName: string;

    // for reg
    @Column({ type: 'varchar', length: 40, nullable: true })
    login: string;

    // for reg
    @Column({ type: 'varchar', length: 255, nullable: false })
    password: string;

    @Column({ type: 'varchar', length: 40, nullable: true })
    salt: string;

    // for reg
    @Column({ type: 'varchar', nullable: false, comment: 'User Role identification number', default: 'user' })
    role: 'user' | 'admin' | 'super_admin';

    @Column({ type: 'tinyint', width: 1, nullable: true })
    isSuperAdmin: number;

    // for reg
    @Column({ type: 'char', length: 1, default: '0' })
    isSupportUser: string;

    // for reg
    @Column({ type: 'int', nullable: true })
    branchId: number;

    // for reg
    @Column({ type: 'varchar', length: 100, nullable: true })
    email: string;

    @Column({ type: 'varchar', length: 40, nullable: true })
    activationCode: string;

    @Column({ type: 'varchar', length: 40, nullable: true })
    forgottenPasswordKey: string;

    @Column({ type: 'datetime', nullable: true })
    forgottenPasswordRequested: Date;

    @Column({ type: 'varchar', length: 40, nullable: true })
    rememberCode: string;

    @Column({ type: 'int', nullable: true })
    createdBy: number;

    @CreateDateColumn({ type: 'datetime', nullable: true })
    createdOn: Date;

    @Column({ type: 'int', nullable: true })
    modifiedBy: number;

    @UpdateDateColumn({ type: 'datetime', nullable: true })
    modifiedOn: Date;

    @Column({ type: 'datetime', nullable: true })
    lastLogin: Date;

    @Column({ type: 'varchar', length: 20, nullable: true })
    lastIp: string;

    @Column({ type: 'varchar', length: 10, nullable: true })
    currentStatus: string;

    @Column({ type: 'tinyint', width: 1, default: () => "'0'" })
    isDeleted: number;

    @Column({ type: 'int', nullable: true })
    deletedBy: number;

    @Column({ type: 'datetime', nullable: true })
    deletedOn: Date;

    // for reg
    @Column({ type: 'varchar', length: 30, default: 'english' })
    defaultLanguage: string;

    // for reg
    @Column({ type: 'smallint', nullable: true })
    employeeId: number;

    @Column({ type: 'datetime', nullable: true })
    lastPasswordChanged: Date;
}
