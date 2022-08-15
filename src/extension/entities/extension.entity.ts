import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Extension {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'id',
    })
    id: number;
    
    @Column({
        name: 'name',
        nullable: false,
        default: '',
    })
    name: string;

    @Column({
        name: 'description',
        nullable: false,
        default: '',
    })
    description: string;

    @Column({
        name: 'version',
        nullable: false,
        default: '1.0.0',
    })
    version: string;

    @Column({
        name: 'status',
        nullable: false,
        default: '',
    })
    status: string;
    
    @Column({
        name: 'preLink',
        nullable: false,
        default: '',
    })
    preLink: string;

    @Column({
        name: 'link',
        nullable: false,
        default: '',
    })
    link: string;

    @Column({
        name: 'dirPath',
        nullable: false,
        default: '',
    })
    dirPath: string;
}