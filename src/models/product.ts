import Client from '../database';
export type Product = {
  id?: string;
  name: string;
  price: number;
};

export default class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const connection = await Client.connect();
      const sql = 'SELECT * FROM products';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }

  async show(id: string): Promise<Product> {
    try {
      const connection = await Client.connect();
      const sql = 'SELECT * FROM products WHERE id=($1)';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }

  async create(product: Product): Promise<Product> {
    try {
      const connection = await Client.connect();
      const sql = 'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *';
      const result = await connection.query(sql, [product.name, product.price]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add new product ${product.name}. Error: ${err}`);
    }
  }
}
