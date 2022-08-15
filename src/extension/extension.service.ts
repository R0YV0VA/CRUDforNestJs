import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateExtensionDto } from './dto/create-extension.dto';
import { Extension as ExtensionEntity } from './entities/extension.entity';

const fs = require('fs');

@Injectable()
export class ExtensionService {

    constructor(@InjectRepository(ExtensionEntity) private readonly extensionRepository: Repository<ExtensionEntity>) { }
    
    async createExtension(extensionDto: CreateExtensionDto, fileName: String) {
        try{
            const ifExists = await this.extensionRepository.findOneBy({ name: extensionDto.name })
            if (ifExists !== null) {
                throw new Error('Extension already exists')
            }
            extensionDto.preLink = `./uploadedFiles/${fileName}`
            extensionDto.status = 'pending'
            extensionDto.link = `./extensionsStorage/${extensionDto.name.toLowerCase().replace(/ /g, '')}_v${extensionDto.version}/${fileName}`
            extensionDto.dirPath = `./extensionsStorage/${extensionDto.name.toLowerCase().replace(/ /g, '')}_v${extensionDto.version}`
            const newExtension = await this.extensionRepository.create(extensionDto)
            return await this.extensionRepository.save(newExtension)
        } catch (error) {
            console.error(error)
        }
    }

    private sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    private moveFile(from: String, to: String, mkdirPath: String) {
        try{
        fs.mkdir(mkdirPath, (err) => {
            if(err !== null) {
                console.error(err)
            }
        })
        this.sleep(1000)
        fs.rename(from, to, (err) => {
            if(err !== null) {
                console.error(err)
            }
        })
        } catch (error) {
            console.error(error)
        }
    }

    // private function for deleting extension from uploadedFiles folder
    private deleteFile(fileName: String) {
        try{
        fs.unlink(fileName, (err) => {
            if(err !== null) {
                console.error(err)
            }
        })
        this.sleep(1000)
        } catch (error) {
            console.error(error)
        }
    }

    // private function for deleting extension from extensionsStorage with folder
    private deleteExtensionFolder(dirPath: string, extensionPath: string) {
        try{
        this.deleteFile(extensionPath)
        fs.rmdir(dirPath, (err) => {
            if(err !== null) {
                console.error(err)
            }
        })
        this.sleep(1000)
        } catch (error) {
            console.error(error)
        }
    }

    async getExtensions() {
        try{
            return await this.extensionRepository.find()
        }
        catch(error){
            console.error(error)
        }
    }
    
    async getExtensionById(_id: string) {
        try{
            return await this.extensionRepository.findOneBy({ id: parseInt(_id) })
        } catch (error) {
            console.error(error)
        }
    }

    async updateExtensions(extensionDto: CreateExtensionDto, _id: string) {
        try{
            const toUpdateExtension = await this.extensionRepository.findOneBy({ id: parseInt(_id) })
            await this.extensionRepository.merge(toUpdateExtension, extensionDto)
            return await this.extensionRepository.save(toUpdateExtension)
        } catch (error) {
            console.error(error)
        }
    }

    async deleteExtension(_id: string) {
        try{
            const toDeleteExtension = await this.extensionRepository.findOneBy({ id: parseInt(_id) })
            await this.extensionRepository.remove(toDeleteExtension)
            await this.deleteExtensionFolder(toDeleteExtension.dirPath, toDeleteExtension.link)
            return toDeleteExtension
        } catch (error) {
            console.error(error)
        }
    }

    // async function for accepting extension
    async acceptExtension(_id: string) {
        try{
            const toAcceptExtension = await this.extensionRepository.findOneBy({ id: parseInt(_id) })
            toAcceptExtension.status = 'accepted'
            toAcceptExtension.preLink = ''
            await this.moveFile(toAcceptExtension.preLink, toAcceptExtension.link, toAcceptExtension.dirPath)
            return await this.extensionRepository.save(toAcceptExtension)
        } catch (error) {
            console.error(error)
        }
    }

    // async function for rejecting extension
    async rejectExtension(_id: string) {
        try{
            const toDeleteExtension = await this.extensionRepository.findOneBy({ id: parseInt(_id) })
            await this.extensionRepository.remove(toDeleteExtension)
            toDeleteExtension.status = 'rejected'
            await this.deleteFile(toDeleteExtension.preLink)
            return toDeleteExtension
        } catch (error) {
            console.error(error)
        }
    }
}
