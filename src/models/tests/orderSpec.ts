import {Orders} from '../orders.models';

const OrdersModel = new Orders();
describe('product Model', () => {
  describe('test methods exists', () => {
    it('should have an index method', () => {
      expect(OrdersModel.index).toBeDefined();
    });
    it('index method should return a list of products', async () => {
      const result = await OrdersModel.index();
      expect(result).toEqual([]);
    });
    it('should have show method', () => {
      expect(OrdersModel.show).toBeDefined();
    });
    it('should have create new Order', () => {
      expect(OrdersModel.create).toBeDefined();
    });
    it('should have delete one Order method', () => {
      expect(OrdersModel.delete).toBeDefined;
    });
  });
});