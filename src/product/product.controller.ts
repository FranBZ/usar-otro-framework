import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException } from '@nestjs/common'
import { CreateProductDTO } from "./dto/product.dto"
import { ProductService } from "./product.service";

@Controller('product')
export class ProductController {

    constructor(private readonly productService: ProductService) {}

    @Get('/')
    async getProduct(@Res() res) {
        const products = await this.productService.getProducts()
        return res.status(HttpStatus.OK).json({ products })
    }

    @Get('/:id')
    async getProductById(@Res() res, @Param('id') id) {
        const product = await this.productService.getProductById(id)
        if(!product) throw new NotFoundException("No existe un producto con ese ID");
        return res.status(HttpStatus.OK).json({ product })
    }

    @Post('/')
    async createPost(@Res() res, @Body() createProductDTO: CreateProductDTO) {
        const product = await this.productService.createProduct(createProductDTO)
        return res.status(HttpStatus.OK).json({ mensagge: 'guardado exitoso', product })
    }

    @Put('/:id') 
    async updateProduct(@Res() res, @Param('id') id, @Body() createProductDTO: CreateProductDTO) {
        const product = await this.productService.updateProduct(id, createProductDTO)
        if(!product) throw new NotFoundException("No existe un producto con ese ID");
        return res.status(HttpStatus.OK).json({ mensagge: 'actualizado exitoso', product })
    }

    @Delete('/:id')
    async deleteProduct(@Res() res, @Param('id') id) {
        const product = await this.productService.deleteProduct(id)
        if(!product) throw new NotFoundException("No existe un producto con ese ID");
        return res.status(HttpStatus.OK).json({ mensagge: 'borrado exitoso', product })
    }

}
