import {Orders} from '../../models/orders.models';
import client from '../../database';


const OrdersStore = new Orders();

describe('Orders API test', () => {
  describe('Test Methods', () => {
    it('Get all Orders method', () => {
      expect(OrdersStore.index).toBeDefined();
    });
    it('show Orders method', () => {
      expect(OrdersStore.show).toBeDefined();
    });
    it('create Orders method', () => {
      expect(OrdersStore.create).toBeDefined();
    });
    it('Delete Orders method', () => {
      expect(OrdersStore.delete).toBeDefined();
    });
  });

    afterAll(async () => {
      const conn = await client.connect();
      const sql = `DELETE FROM orders;`;
      await conn.query(sql);
      conn.release();
    });

});