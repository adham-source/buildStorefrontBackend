import * as bcrypt from 'bcrypt';
import Client from '../database';
import configs from '../configs';

export type User = {
  id?: string;
  name: string;
  email: string;
  password: string;
};

export default class UserStore {
  private pepper = configs.BCRYPT_PASSWORD as string;
  private saltRounds = parseInt(configs.SALT_ROUNDS as string);

  private hash(password: string): string {
    return bcrypt.hashSync(password + this.pepper, this.saltRounds);
  }

  private comparePassword(password: string, hashPassword: string): boolean {
    return bcrypt.compareSync(password + this.pepper, hashPassword);
  }

  async index(): Promise<User[]> {
    try {
      const connection = await Client.connect();
      const sql = 'SELECT id, name, email FROM users';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get users ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const connection = await Client.connect();
      const sql = 'SELECT id, name, email FROM users WHERE id=($1)';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  async create(user: User): Promise<User | null> {
    try {
      const connection = await Client.connect();
      const hashPassword = this.hash(user.password);
      const sql = 'SELECT email FROM users WHERE email= ($1)';
      const result = await connection.query(sql, [user.email]);
      if (result.rowCount === 0 || !result.rows.length) {
        const sql = 'INSERT INTO users(name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email';
        const result = await connection.query(sql, [user.name, user.email, hashPassword]);
        connection.release();
        return result.rows[0];
      }
      connection.release();
      return null;
    } catch (err) {
      throw new Error(`Cannot create user ${err}`);
    }
  }

  async delete(id: string): Promise<User> {
    try {
      const connection = await Client.connect();
      const sql = 'DELETE FROM users WHERE id = ($1) RETURNING id, name, email';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot delete user ${err}`);
    }
  }

  async authenticate(email: string, password: string): Promise<User | null> {
    try {
      const connection = await Client.connect();
      const sql = 'SELECT password FROM users WHERE email= ($1)';
      const result = await connection.query(sql, [email]);

      if (result.rowCount === 1 || result.rows.length) {
        const { password: hashPassword } = result.rows[0];
        const isPassowrdValid = this.comparePassword(password, hashPassword);
        if (isPassowrdValid) {
          const result = await connection.query('SELECT id, email, name FROM users WHERE email=($1)', [email]);
          connection.release();
          return result.rows[0];
        }
      }
      connection.release();
      return null;
    } catch (err) {
      throw new Error(`Cannot login ${err}`);
    }
  }
}
