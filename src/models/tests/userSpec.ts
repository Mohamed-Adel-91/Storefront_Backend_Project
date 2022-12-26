import userModel from '../user.model';


const usersModel = new userModel();
describe('Users Model', () => {
    describe('test methods exists', () => {
      it('should have an index method', () => {
        expect(usersModel.index).toBeDefined()
      })
      it('index method should return a list of users',async () => {
        const result = await usersModel.index();
        expect(result).toEqual([])
      })
      it('should have show method', () => {
        expect(usersModel.show).toBeDefined()
      })
      it('should have create new user', () => {
        expect(usersModel.create).toBeDefined()
      })
      it('should have update user method', () => {
        expect(usersModel.update).toBeDefined()
      })
      it('should have delete one user method', () => {
        expect(usersModel.delete).toBeDefined
      })
      it('should have an authenticate user method', () => {
        expect(usersModel.authenticate).toBeDefined()
      })
    })
})