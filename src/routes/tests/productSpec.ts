import {products} from '../../models/product.model';
import client from '../../database';
import product from '../../types/product.types';

const productStore = new products();

describe('Product API test', () => {
  describe('Test Methods', () => {
    it('Get all products method', () => {
      expect(productStore.index).toBeDefined();
    });
    it('show products method', () => {
      expect(productStore.show).toBeDefined();
    });
    it('create product method', () => {
      expect(productStore.create).toBeDefined();
    });
    it('Delete product method', () => {
      expect(productStore.delete).toBeDefined();
    });
  });
  describe('Test logic', () => {
    const products = {
      productName: 'test',
      Price: 2000,
      Category: 'test123',
    } as product;

    beforeAll(async () => {
      const createTestProducts = await productStore.create(products);
      products.productID = createTestProducts.productID;
    });
    afterAll(async () => {
      const conn = await client.connect();
      const sql = `DELETE FROM product;`;
      await conn.query(sql);
      conn.release();
    });
    it('Get all products should return all products in the database', async () => {
      const products = await productStore.index();
      expect(products.length).toBe(1);
    });
  });
});