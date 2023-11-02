import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImgMSG } from 'src/common/constanstst';
import { fileFilter } from 'src/common/helper';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { ClientProxyBellezaConsultin } from 'src/common/proxy/client.proxy';

@Controller('img')
export class ImgController {
  constructor(private readonly clientProxy: ClientProxyBellezaConsultin) {}
  private _clientProxyImages = this.clientProxy.clientProxyImages();

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `para btener el url de la imagen por el ${id} de la magen`;
  }

  @Post(':coleccion/:id')
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter: fileFilter,
      limits: { fileSize: 1000000 },
    }),
  )
  async uploadFile(
    @Param('id', ParseMongoIdPipe) id: string,
    @Param('coleccion') coleccion: string,
    @UploadedFile()
    image: Express.Multer.File,
  ) {
    if (!image) {
      throw new BadRequestException('Make sure that file is an image');
    }

    if (!['user'].includes(coleccion)) {
      throw new BadRequestException('Invalid collection');
    }
    //console.log(image);
    const data = {
      id,
      coleccion,
      image,
    };
    //return { data };
    return this._clientProxyImages.send(ImgMSG.UPDATE, data);
  }
}
