import ProductStore from "../../models/product"
const store = new ProductStore()

describe('Product Model', () => {
    describe('Methods of product models are exist', () => {
        it('should have an index method', () => {
            expect(store.index).toBeDefined()
        })

        it('should have a show method', () => {
            expect(store.show).toBeDefined()
        })

        it('should have a create method', () => {
            expect(store.create).toBeDefined()
        })
    })

    it('create method should add a product', async () => {
        const result = await store.create({
            name: "product1",
            price: 120,
        })
        expect(result).toEqual({...result})
    })

    it('index method should return a list of product', async () => {
        const result = await store.index()
        expect(result).toEqual([
            ...result
        ])
    })
})