"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var order_1 = __importDefault(require("../../models/order"));
var store = new order_1.default();
describe('Order Model', function () {
    describe('Methods of order models are exist', function () {
        it('should have a show method', function () {
            expect(store.show).toBeDefined();
        });
        it('should have a create method', function () {
            expect(store.create).toBeDefined();
        });
        it('should have a addProduct method', function () {
            expect(store.addProduct).toBeDefined();
        });
    });
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
});
