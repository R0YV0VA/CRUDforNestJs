import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateExtensionDto } from './dto/create-extension.dto';
import { ExtensionService } from './extension.service';

@Controller('extension')
export class ExtensionController {

    constructor (private extensionService: ExtensionService) { }

    @Post('create')
    @UseInterceptors(FileInterceptor('extensionFile', {
        storage: diskStorage({
            destination: './uploadedFiles',
            filename: (req, file, cb) => {
                cb(null, file.originalname);
            }
        })
    }))
    createExtension(@Body() createExtensionDto: CreateExtensionDto, @UploadedFile() file: Express.Multer.File) {
        return this.extensionService.createExtension(createExtensionDto, file.originalname)
    }

    @Get('get')
    getExtensions() {
        return this.extensionService.getExtensions()
    }

    @Get('get/:id')
    getExtensionById(@Param('id') id: string) {
        return this.extensionService.getExtensionById(id)
    }

    @Put('update/:id')
    updateExtensions(@Body() createExtensionDto: CreateExtensionDto, @Param('id') id: string) {
        return this.extensionService.updateExtensions(createExtensionDto, id)
    }

    @Delete('delete/:id')
    deleteExtension(@Param('id') id: string) {
        return this.extensionService.deleteExtension(id)
    }

    @Put('accept/:id')
    acceptExtension(@Param('id') id: string) {
        return this.extensionService.acceptExtension(id)
    }

    @Delete('reject/:id')
    rejectExtension(@Param('id') id: string) {
        return this.extensionService.rejectExtension(id)
    }
}
