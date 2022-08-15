import { IsNotEmpty, IsString} from 'class-validator';

export class CreateExtensionDto{
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsNotEmpty()
    @IsString()
    description: string;
    
    @IsNotEmpty()
    @IsString()
    version: string;

    @IsString()
    status: string;

    @IsString()
    preLink: string;

    @IsString()
    link: string;

    @IsString()
    dirPath: string;
}