import supertest from 'supertest';
import app from '../../../index';

const request = supertest(app);
let token: string;
let userId: string;
let productId: string;
let orderId: string

describe('Test APIs endpoint', () => {
    describe('Test users endpoint', () => {
        it("POST /users/register add new user", async () => {
            const response = await request.post('/api/users/register').send({
                "name": "adham ahmad",
                "email": "adham@gmail.com",
                "password": "12345678"
            })
            userId = response.body.data.id
            expect(response.status).toEqual(201)
        })

        it("POST /users/register add new user with same eamil", async () => {
            const response = await request.post('/api/users/register').send({
                "name": "adham ahmad",
                "email": "adham@gmail.com",
                "password": "12345678"
            })
            expect(response.statusCode).toBe(400)
            expect(response.body.message).toEqual('User is already exist.')
        })
        it("POST /users add new user", async () => {
            const response = await request.post('/api/users')
            expect(response.status).toEqual(404)
        })
        it("POST /users/register add new user and without send data", async () => {
            const response = await request.post('/api/users/register')
            expect(response.status).toEqual(500)
            expect(response.body.success).toBeFalsy()
        })

        it("POST /users /users/register add new user and without send data", async () => {
            const response = await request.post('/api/users/register')
            expect(response.status).toEqual(500)
            expect(response.body.message).toEqual('Error! Something is wrong.')
        })

        it("Post /users/login ", async () => {
            const response = await request.post("/api/users/login").send({
                "email": "adham@gmail.com",
                "password": "12345678"
            })
            token = response.headers['x-auth-token']
            // console.log(response.body.token)
            // console.log(('#'.repeat(30)))
            // console.log(response.headers['x-auth-token'])
            // console.log(('#'.repeat(30)))
            expect(response.status).toBe(200)
            expect(response.body.message).toEqual('Login successfuly.')

        })

        it("GET /users within token", async () => {
            const response = await request.get('/api/users').set('x-auth-token', `Bearer ${token}`)
            // console.log(token)
            // console.log(response.body.data)
            expect(response.body.data).toEqual([
                {
                    id: response.body.data[0].id,
                    name: 'adham ahmad',
                    email: 'adham.os1988@gmail.com'
                },
                {
                    id: response.body.data[1].id,
                    name: 'adham ahmad',
                    email: 'adham@gmail.com'
                }
            ])
        })

        it("GET /users without token", async () => {
            const response = await request.get('/api/users')
            expect(response.status).toEqual(403)
            expect(response.body).toEqual({ success: false, message: 'Access denied.' })
        })
    })

    describe('Test products endpoint', () => {
        it("GET /products show all products", async () => {
            const response = await request.get('/api/products')
            expect(response.status).toBe(200)
        })

        it("GET /products/:id show product but id in link not valid.", async () => {
            const response = await request.get('/api/products/3432')
            expect(response.status).toEqual(500)
        })

        it("POST /products add new product without token", async () => {
            const response = await request.post("/api/products").send({
                "name": "product one",
                "price": 700
            })
            expect(response.status).toEqual(403)
            expect(response.body).toEqual({ success: false, message: 'Access denied.' })
        })

        it("POST /products add new product within token", async () => {
            const response = await request.post("/api/products")
                .set('x-auth-token', `Bearer ${token}`)
                .send({
                    "name": "product one",
                    "price": 700
                })
            productId = response.body.data.id
            expect(response.status).toEqual(201)
            expect(response.body).toEqual({
                success: true,
                data: {
                    id: productId,
                    name: 'product one',
                    price: 700
                },
                message: 'Product created successfuly.'
            })
        })
    })

    describe('Test orders endpoint', () => {

        it("POST /orders to create new order without token", async () => {
            const response = await request.post('/api/orders').send({
                "user_id": userId,
                "status": "active"
            })
            expect(response.status).toBe(403)
            expect(response.body).toEqual({ success: false, message: 'Access denied.' })
        })

        it("POST /orders to create new order whithin token and the same user's token", async () => {
            const response = await request.post('/api/orders')
                .send({
                    "user_id": userId,
                    "status": "active"
                })
                .set('x-auth-token', `Bearer ${token}`)
            orderId = response.body.data.id
            expect(response.status).toBe(201)
            expect(response.body).toEqual({
                success: true,
                data: {
                    id: orderId,
                    user_id: userId,
                    status: 'active'
                },
                message: `Order of ID: ${orderId} created successfully.`
            })
        })

        it("POST /orders/:id/products addProduct into order products", async () => {
            const response = await request.post(`/api/orders/${orderId}/products`)
                .set('x-auth-token', `Bearer ${token}`)
                .send({
                    "quantity": 5,
                    "productId": productId
                })
            expect(response.status).toBe(201)
            expect(response.body).toEqual({
                success: true,
                data: {
                    id: response.body.data.id,
                    quantity: 5,
                    order_id: orderId,
                    product_id: productId
                }
            })
        })

        it("GET /orders/:userId get Current Order by user without token", async () => {
            const response = await request.get(`/api/orders/${userId}`)
                expect(response.status).toBe(403)
                expect(response.body).toEqual({ success: false, message: 'Access denied.' })
        })

        it("GET /orders/:userId get Current Order by user", async () => {
            const response = await request.get(`/api/orders/${userId}`)
            .set('x-auth-token', `Bearer ${token}`)
            expect(response.body).toEqual({
                success: true,
                data: [
                    {
                        id: orderId,
                        user_id: userId,
                        status: 'active'
                    }
                ]
            })

        })

    })
})