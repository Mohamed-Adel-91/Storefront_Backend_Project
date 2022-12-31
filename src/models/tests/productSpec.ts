import {products} from '../product.model';

const productsModel = new products();
describe('product Model', () => {
  describe('test methods exists', () => {
    it('should have an index method', () => {
      expect(productsModel.index).toBeDefined();
    });
    it('index method should return a list of products', async () => {
      const result = await productsModel.index();
      expect(result).toEqual([]);
    });
    it('should have show method', () => {
      expect(productsModel.show).toBeDefined();
    });
    it('should have create new product', () => {
      expect(productsModel.create).toBeDefined();
    });
    it('should have delete one product method', () => {
      expect(productsModel.delete).toBeDefined;
    });
  });
});