import OrderStore from "../../models/order"
const store = new OrderStore()

describe('Order Model', () => {
    describe('Methods of order models are exist', () => {

        it('should have a show method', () => {
            expect(store.show).toBeDefined()
        })

        it('should have a create method', () => {
            expect(store.create).toBeDefined()
        })

        it('should have a addProduct method', () => {
            expect(store.addProduct).toBeDefined()
        })
    })

    // it('create method should add a order', async () => {
    //     const result = await store.create({
    //         user_id: "product1",
    //         status: 'active',
    //     })
    //     expect(result).toEqual({ ...result })
    // })

    // it('index method should return a list of product', async () => {
    //     const result = await store.show('user_id')
    //     expect(result).toEqual([
    //         ...result
    //     ])
    // })
})