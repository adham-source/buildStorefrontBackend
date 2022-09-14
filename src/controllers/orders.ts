import { Request, Response } from 'express';
import OrderStore, { Order } from '../models/order';

const Order = new OrderStore();

export default class OrdersController {
  async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const { user_id, status }: Order = req.body;
      //@ts-ignore
      const verifyId = req.user.id;
      if (verifyId !== user_id) {
        res.status(403).json({
          success: false,
          message: 'Access denied.',
        });
        return;
      }
      const order = await Order.create({ user_id, status });
      res.status(201).json({
        success: true,
        data: order,
        message: `Order of ID: ${order.id} created successfully.`,
      });
    } catch {
      res.status(500).json({
        success: false,
        message: 'Error! Something is wrong.',
      });
    }
  }

  async getOrdersByUserId(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const orders = await Order.show(userId);
      if (!orders) {
        res.status(404).json({
          success: false,
          message: 'Orders of user are not found.',
        });
        return;
      }

      res.json({
        success: true,
        data: orders,
      });
    } catch {
      res.status(500).json({
        success: false,
        message: 'Error! Something is wrong.',
      });
    }
  }

  async addProduct(req: Request, res: Response): Promise<void> {
    try {
      const quantity: number = parseInt(req.body.quantity);
      const orderId: string = req.params.id;
      const productId: string = req.body.productId;
      const addProduc = await Order.addProduct(quantity, orderId, productId);
      res.status(201).json({
        success: true,
        data: addProduc,
      });
    } catch {
      res.status(500).json({
        success: false,
        message: 'Error! Something is wrong.',
      });
    }
  }
}
