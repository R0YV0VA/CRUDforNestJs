import { Test, TestingModule } from '@nestjs/testing';
import { ExtensionService } from './extension.service';
import { ExtensionController } from './extension.controller';

describe('Extension Controller', () => {
    let controller: ExtensionController;
    
    const mockExtensionsService = {
        getExtensions: jest.fn(() => {return {} }),
        getExtensionById: jest.fn(() =>{
            return{
                id: expect.any(Number)
            }
        }),
        createExtension: jest.fn(() => {
            return{
                name: expect.any(String),
                description: expect.any(String),
                version: expect.any(String), 
                status: expect.any(String),
                preLink: expect.any(String), 
                link: expect.any(String),
                dirPath: expect.any(String)
            }
        }),
        updateExtensions: jest.fn(() => {
            return{
                name: expect.any(String),
                description: expect.any(String),
                version: expect.any(String), 
                status: expect.any(String),
                preLink: expect.any(String), 
                link: expect.any(String),
                dirPath: expect.any(String)
            }
        }),
        deleteExtension: jest.fn(),
        acceptExtension: jest.fn(),
        rejectExtension: jest.fn()
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        controllers: [ExtensionController],
        providers: [ExtensionService],
        }).overrideProvider(ExtensionService).useValue(mockExtensionsService).compile();
    
        controller = module.get<ExtensionController>(ExtensionController);
    })
    it('should be defined', () => {
        expect(controller).toBeDefined();
    })

    it('should create extension', () => {
        expect(controller.createExtension(mockExtensionsService.createExtension(), expect.any(File)))
        .toEqual(
            {
                name: expect.any(String),
                description: expect.any(String),
                version: expect.any(String), 
                status: expect.any(String),
                preLink: expect.any(String), 
                link: expect.any(String),
                dirPath: expect.any(String)
            }, expect.any(File))
    })
    
    it('should get extensions', () => {
        expect(mockExtensionsService.getExtensions()).toEqual({})
    })
})