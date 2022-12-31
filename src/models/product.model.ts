import client from '../database';
import product from '../types/product.types';

export class products {
  async index(): Promise<product[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM product';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get product. Error: ${err}`);
    }
  }

  async show(productID: string): Promise<product> {
    try {
      const sql = 'SELECT * FROM product WHERE productID=($1)';
      const conn = await client.connect();
      const result = await conn.query(sql, [productID]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${productID}. Error: ${err}`);
    }
  }

  async create(p: product): Promise<product> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO product (productName, Price, Category) VALUES($1, $2, $3) RETURNING *';
      const result = await conn.query(sql, [p.productName, p.Price, p.Category]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`Could not add new product ${p.productName}. Error: ${err}`);
    }
  }

  async delete(productID: string): Promise<product> {
    try {
      const sql = 'DELETE FROM product WHERE productID=($1)';
      const conn = await client.connect();
      const result = await conn.query(sql, [productID]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`Could not delete product ${productID}. Error: ${err}`);
    }
  }
}
