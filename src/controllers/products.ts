import { Request, Response } from 'express';
import ProductStore, { Product } from '../models/product';

const Product = new ProductStore();

export default class ProductsController {
  async getProducts(req: Request, res: Response): Promise<void> {
    try {
      const products = await Product.index();
      if (!products.length || products.length === 0) {
        res.status(404).json({
          success: false,
          message: 'Products are not found',
        });
        return;
      }
      res.json({
        success: true,
        data: products,
      });
    } catch {
      res.status(500).json({
        success: false,
        message: 'Error! Something is wrong.',
      });
    }
  }

  async getProduct(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const product = await Product.show(id as string);
      if (!product) {
        res.status(404).json({
          success: false,
          message: 'Product is not found',
        });
        return;
      }
      res.json({
        success: true,
        data: product,
      });
    } catch {
      res.status(500).json({
        success: false,
        message: 'Error! Something is wrong.',
      });
    }
  }

  async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const { name, price }: Product = req.body;
      const product = await Product.create({ name, price });
      res.status(201).json({
        success: true,
        data: product,
        message: 'Product created successfuly.',
      });
    } catch {
      res.status(500).json({
        success: false,
        message: 'Error! Something is wrong.',
      });
    }
  }
}
