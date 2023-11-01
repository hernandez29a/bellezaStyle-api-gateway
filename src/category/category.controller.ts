import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ClientProxyBellezaConsultin } from 'src/common/proxy/client.proxy';
import { CategoryMSG, ProductMSG } from 'src/common/constanstst';
import { ICategory } from 'src/common/interfaces/category.interface';
import { Observable, lastValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { isValidObjectId } from 'mongoose';

@Controller('category')
export class CategoryController {
  constructor(private readonly clientProxy: ClientProxyBellezaConsultin) {}
  private _clientProxyCategory = this.clientProxy.clientProxyCategories();
  private _clientProxyProduct = this.clientProxy.clientProxyProducts();

  async validProduct(products: string[]) {
    for (const productId of products) {
      if (!isValidObjectId(productId)) {
        throw new BadRequestException(`The value is not a valid mongo ID`);
      }
      await lastValueFrom(
        this._clientProxyProduct.send(ProductMSG.FIND_ONE, productId),
      );
    }
  }

  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Observable<ICategory>> {
    //this.validProduct(createCategoryDto.products);
    await this.validProduct(createCategoryDto.products);
    return this._clientProxyCategory.send(
      CategoryMSG.CREATE,
      createCategoryDto,
    );
  }

  @Get()
  findAll(@Query() pagnationDto: PaginationDto): Observable<ICategory[]> {
    //console.log(pagnationDto);
    return this._clientProxyCategory.send(CategoryMSG.FIND_ALL, pagnationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseMongoIdPipe) id: string): Observable<ICategory> {
    return this._clientProxyCategory.send(CategoryMSG.FIND_ONE, id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    await this.validProduct(updateCategoryDto.products);
    return this._clientProxyCategory.send(CategoryMSG.UPDATE, {
      id,
      updateCategoryDto,
    });
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string): Observable<ICategory> {
    return this._clientProxyCategory.send(CategoryMSG.DELETE, id);
  }

  @Patch('addProduct/:categoryId')
  async addProduct(
    @Param('categoryId', ParseMongoIdPipe) categoryId: string,
    @Body() updateCategory: UpdateCategoryDto,
  ) {
    await this.validProduct(updateCategory.products);
    //return { categoryId, updateCategory };
    return this._clientProxyCategory.send(CategoryMSG.ADD_PRODUCT, {
      categoryId,
      updateCategory,
    });
  }
}
