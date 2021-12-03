import app from '../src/app'

import request from 'supertest'

let token:any
describe("USER API",()=>{
    it("should sign up user",async ()=>{
        const res = await request(app)
        .post('/auth/signup')
        .send({first_name:"shade", 
        last_name:"kola", 
        email:"tomi12@gmail.com", 
        phoneNumber:"0803463654", 
        address:"lekki", 
        password:"1234"})
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('data')
    })

    it("should report a registered user",async ()=>{
        const res = await request(app)
        .post('/auth/signup')
        .send({first_name:"tomi", 
        last_name:"sola", 
        email:"tomi1@gmail.com", 
        phoneNumber:"0803463654", 
        address:"lekki", 
        password:"1234"})
        expect(res.statusCode).toEqual(400)
        expect(res.body.message).toBe('user already exists')
    })



    it("should login a user",async ()=>{
        const res = await request(app)
        .post('/auth/signin')
        .send({ 
        email:"tomi1@gmail.com",  
        password:"1234"})
        token=res.body.data.token
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('data')
    })


    it("should report invalid details of a user on signin",async ()=>{
        const res = await request(app)
        .post('/auth/signin')
        .send({ 
        email:"tomi1@gmail.com",  
        password:"12345"})
        expect(res.statusCode).toEqual(400)
        expect(res.body.message).toBe('invalid details')
    })



    it("should not login a user that is not registered",async ()=>{
        const res = await request(app)
        .post('/auth/signin')
        .send({ 
        email:"tomi@gmail.com",  
        password:"1234"})
        expect(res.statusCode).toEqual(404)
        expect(res.body.message).toBe('user does not exist')
    })
})

describe("PROPERTY API",()=>{
    it("create a property",async ()=>{
        const res = await request(app)
        .post('/property')
        .set("authorization", `${token}`)
        .send({ 
            price:50000, 
            state:"lagos", 
            city:"lagos", 
            address:"ilupeju", 
            type:"flat"})
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('data')
    })

    it("get all property",async ()=>{
        const res = await request(app)
        .get('/property')
        .set("authorization", `${token}`)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('data')
    })

    it("get a property",async ()=>{
        const res = await request(app)
        .get(`/property/${1}`)
        .set("authorization", `${token}`)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('data')
    })
    it("should not get a property",async ()=>{
        const res = await request(app)
        .get(`/property/${1000}`)
        .set("authorization", `${token}`)
        expect(res.statusCode).toEqual(400)
        expect(res.body.message).toBe("This property does not exist")
    })

    it("get a property by type",async ()=>{
        const res = await request(app)
        .get(`/property/type?type=flat`)
        .set("authorization", `${token}`)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('data')
    })
    it("should not get a property of type that doesn't exist",async ()=>{
        const res = await request(app)
        .get(`/property/type?type=bungalow`)
        .set("authorization", `${token}`)
        expect(res.statusCode).toEqual(404)
        expect(res.body.message).toBe("Property of this type does not exist")
    })
    it("should update the status of a property from available to sold",async ()=>{
        const res = await request(app)
        .patch(`/property/${7}/sold`)
        .set("authorization", `${token}`)
        console.log(res.body)
        expect(res.statusCode).toEqual(200)
        expect(res.body.status).toBe("success")
    })
    it("should delete a property",async ()=>{
        const res = await request(app)
        .delete(`/property/${10}`)
        .set("authorization", `${token}`)
        console.log(res.body)
        expect(res.statusCode).toEqual(200)
        expect(res.body.status).toBe("deleted successfully")
    })
    it("should update the status of a property",async ()=>{
        const res = await request(app)
        .patch(`/property/${5}`)
        .set("authorization", `${token}`)
        .send({ 
            price:700000, 
            state:"osun", 
            city:"lagos", 
            address:"ipaja", 
            })
        console.log(res.body)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty("data")
    })
})
    
