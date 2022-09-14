import UserStore from "../../models/user"
const store = new UserStore()

describe('User Model', () => {
  describe('Methods of user models are exist', () => {
    it('should have an index method', () => {
      expect(store.index).toBeDefined()
    })

    it('should have a show method', () => {
      expect(store.show).toBeDefined()
    })

    it('should have a create method', () => {
      expect(store.create).toBeDefined()
    })

    it('should have a delete method', () => {
        expect(store.delete).toBeDefined()
    })

    it('should have an authenticate method', () => {
      expect(store.authenticate).toBeDefined()
    })
  })

  

  it('create method should add a user', async () => {
    const result = await store.create({
        name: "adham ahmad",
        email: "adham.os1988@gmail.com",
        password: "12345678"
    })
    expect(result).toEqual(result)
  })

  it('index method should return a list of users', async () => {
    const result = await store.index()
    expect(result).toEqual([
      ...result 
    ])
  })
})