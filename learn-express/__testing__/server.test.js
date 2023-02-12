import request from "supertest";
import app from "../index.js";
import mongoose from "mongoose";
import {createBlog } from "../controllers/blogController";

let token =""
const blogs = {
    title:"testing jest",
    content:"jest testing"
}
const sign = {
    userName:"japhet jest",
    email:"",
    password:"57755"
}
const signWithEmail = {
    userName:"japhet jest",
    email:"jesttesting@gmail.com",
    password:"57755"
}
const logn = {
    email:"res@gmail.com",
    password:"123445"
}
const comment = {
    comment: "comment"
}
// const app = createServer()
jest.setTimeout(20000)

describe("testing", () =>{
    beforeAll(async() =>{
         await mongoose.connect("mongodb+srv://japhet:empire@cluster0.wcifge7.mongodb.net/test")
    })
    afterAll(async() =>{
         mongoose.disconnect();
   })
describe("get blogs", () =>{
    test("it should return list of blogs",async() =>{
const {body}= await request(app)     
        .get("/api/v1/blogs")
        // .expect("content-type", /json/)
        .expect(200)
      })
    })
    describe("create blog ",() =>{
        test("it should create blog ", async () =>{
            const {body} = request(app)
            .post("/api/v1/blogs").send(blogs).expect("content-type", /json/)
        })
    })
    describe("get single blog",() =>{
        test("it should return single blog", async () =>{
            const id = "1234567890";
            await request(app).get(`/api/v1/blogs/${id}`).expect(500)
        })
    })
    describe("delete blog", () =>{
        test("it should delete a blog", async () =>{
            const id = "34343434"
         const res= await request(app).delete(`/api/v1/blogs/${id}`)
         expect(res.status).toBe(403)
        })
    })
        describe("sign up user", () =>{
            test("it should return 400", async () =>{
                await request(app).post("/api/v1/signup").send(sign).expect(400)
            })
        })
        describe("sign up user", () =>{
            test("it should return 400", async () =>{
              const body =  await request(app).post("/api/v1/signup").send(signWithEmail).expect(400)
            })
        })
            describe("login user", () =>{
            test("it should return 400", async () =>{
               const res =  await request(app).post("/api/v1/login").send(logn)
               token = res.body.accessToken
               console.log(token);
               expect(res.status).toBe(200)
            })
            describe("create comment", () =>{
                test("it should create comment", async() =>{
                    let id= "12344556567567678"
                    const c = await request(app).post(`/blogs/${id}/comment/create`).send(comment)
                    expect(c.status).toBe(404)
                })
            })
            describe("likes", () =>{
                test("it should add like", async() =>{
                    let id= "12344556567567678"
                    const c = await request(app).post(`/blogs/${id}/likes`).expect(404)

                })
            })

        })
        describe("update blog",() =>{
            test('Should update single  blog', async () => {
                const response = await request(app).patch('/api/v1/blogs/id');
                expect(response.statusCode).toBe(403);
        
              });
        })
    // describe("create blog", () =>{
    //     test("it should create a blog", async () =>{
    //         const id = "12345566666"
    //        const body = await request(app)
    //        .patch(`/api/v1/blogs/${id}`)
    //         .expect(403)
    //     })
    // })
})
