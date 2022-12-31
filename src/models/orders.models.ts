import client from '../database';
import orders from '../types/orders.type';

export class Orders {
  async index(): Promise<orders[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }

  async show(orderID: string): Promise<orders> {
    try {
      const sql = 'SELECT * FROM product WHERE orderID=($1)';
      const conn = await client.connect();
      const result = await conn.query(sql, [orderID]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order ${orderID}. Error: ${err}`);
    }
  }

  async create(o: orders): Promise<orders> {
    try {
      const conn = await client.connect();
      const sql = 'INSERT INTO orders (order_status) VALUES ($1) RETURNING *';
      const result = await conn.query(sql, [o.orderID, o.order_status]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`Could not add new order ${o.orderID}. Error: ${err}`);
    }
  }

  async delete(orderID: string): Promise<orders> {
    try {
      const sql = 'DELETE FROM orders WHERE orderID=($1)';
      const conn = await client.connect();
      const result = await conn.query(sql, [orderID]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`Could not delete order ${orderID}. Error: ${err}`);
    }
  }
}
