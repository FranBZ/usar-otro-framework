import { Injectable } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Product } from "./interfaces/product.interface";
import { CreateProductDTO } from "./dto/product.dto";

@Injectable()
export class ProductService {

    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) { }

    async getProducts(): Promise<Product[]> {
        const products = await this.productModel.find()
        return products
    }

    async getProductById(id: string): Promise<Product> {
        const product = await this.productModel.findById(id)
        return product
    }

    async createProduct(createProductDTO: CreateProductDTO): Promise<Product> {
        const product = await new this.productModel(createProductDTO)
        return await product.save()
    }

    async updateProduct(id: string, createProductDTO: CreateProductDTO) {
        const updateProduct = await this.productModel.findByIdAndUpdate(id, createProductDTO, { new: true })
        return updateProduct
    }

    async deleteProduct(id: string): Promise<Product> {
        const deleteProduct = await this.productModel.findByIdAndDelete(id)
        return deleteProduct
    }
}
