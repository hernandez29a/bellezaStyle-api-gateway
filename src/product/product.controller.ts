import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ClientProxyBellezaConsultin } from 'src/common/proxy/client.proxy';
import { IProduct } from 'src/common/interfaces/product.interface';
import { Observable } from 'rxjs';
import { ProductMSG } from 'src/common/constanstst';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';

@Controller('product')
export class ProductController {
  constructor(private readonly clientProxy: ClientProxyBellezaConsultin) {}
  private _clientProxyProduct = this.clientProxy.clientProxyProducts();

  @Post()
  create(@Body() createProductDto: CreateProductDto): Observable<IProduct> {
    return this._clientProxyProduct.send(ProductMSG.CREATE, createProductDto);
  }

  @Get()
  findAll(@Query() pagnationDto: PaginationDto): Observable<IProduct[]> {
    return this._clientProxyProduct.send(ProductMSG.FIND_ALL, pagnationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this._clientProxyProduct.send(ProductMSG.FIND_ONE, id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Observable<IProduct> {
    return this._clientProxyProduct.send(ProductMSG.UPDATE, {
      id,
      updateProductDto,
    });
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this._clientProxyProduct.send(ProductMSG.DELETE, id);
  }
}
