import {
  Controller,
  Get,
  Post,
  Param,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImgMSG } from 'src/common/constanstst';
import { fileFilter } from 'src/common/helper';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { ClientProxyBellezaConsultin } from 'src/common/proxy/client.proxy';
import { Response } from 'express';
import { lastValueFrom } from 'rxjs';

@Controller('img')
export class ImgController {
  constructor(private readonly clientProxy: ClientProxyBellezaConsultin) {}
  private _clientProxyImages = this.clientProxy.clientProxyImages();

  @Get(':coleccion/:imageName')
  async getImage(
    @Res() res: Response,
    @Param('imageName') imageName: string,
    @Param('coleccion') coleccion: string,
  ) {
    const data = {
      imageName,
      coleccion,
    };
    //return this._clientProxyImages.send(ImgMSG.GET_IMAGE, data);
    const urlPath = await lastValueFrom(
      this._clientProxyImages.send(ImgMSG.GET_IMAGE, data),
    );
    //console.log(urlPath);
    res.sendFile(urlPath);
    //return 'algo bonito';
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
