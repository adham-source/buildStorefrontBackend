import Client from '../database';
export type Order = {
  id?: string;
  user_id: string;
  status: 'active' | 'complete';
};

export type OrderProducts = {
  id?: string;
  quantity: number;
  order_id: string;
  product_id: string;
};

export default class OrderStore {
  async create(order: Order): Promise<Order> {
    try {
      const connection = await Client.connect();
      const sql = 'INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *';
      const result = await connection.query(sql, [order.user_id, order.status]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot create order ${err}`);
    }
  }

  async show(user_id: string): Promise<Order[]> {
    try {
      const connection = await Client.connect();
      const sql = 'SELECT * FROM orders WHERE orders.user_id = $1';
      const result = await connection.query(sql, [user_id]);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot show current order by user ${err}`);
    }
  }

  async addProduct(quantity: number, orderId: string, productId: string): Promise<OrderProducts> {
    try {
      const connection = await Client.connect();
      const sql = 'INSERT INTO order_products(quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *';
      const result = await connection.query(sql, [quantity, orderId, productId]);
      connection.release;
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`);
    }
  }
}
