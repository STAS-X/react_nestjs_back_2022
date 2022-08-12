import {
	Body,
	Controller,
	Delete,
	Get,
	Header,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Put,
	//Redirect,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';

@Controller('products')
export class ProductsController {
	constructor(private readonly productService: ProductsService) {}

	@Get()
	//@Redirect('https://google.com', 301)
	getAll(): Promise<Product[]> {
		return this.productService.getAll();
	}

	@Get(':id')
	getOne(@Param('id') prodId: string): Promise<Product> {
		return this.productService.getById(prodId);
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	@Header('Cache-Control', 'none')
	createOne(@Body() createProductDto: CreateProductDto): Promise<Product> {
		return this.productService.create(createProductDto);
	}

	@Delete(':id')
	removeOne(@Param('id') prodId: string): Promise<Product> {
		return this.productService.remove(prodId);
	}

	@Put(':id')
	updateOne(
		@Body() updateProductDto: UpdateProductDto,
		@Param('id') prodId: string
	): Promise<Product> {
		return this.productService.update(prodId, updateProductDto);
	}
}
