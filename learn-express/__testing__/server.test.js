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
let uploadedPost
// const app = createServer()
jest.setTimeout(30000)

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
 
    describe("get single blog",() =>{
        test("it should return single blog", async () =>{
            const id = "63e669a510bf8ab57b4fa345";
            await request(app).get(`/api/v1/blogs/${id}`).expect(404)
        })
    })
  
        // describe("sign up user", () =>{
        //     test("it should return 400", async () =>{
        //         await request(app).post("/api/v1/signup").send(sign).expect(400)
        //     })
        // })
        describe("sign up user", () =>{
            test("this is about signIn when there are send without identification",async()=>{
                await request(app).post("/api/v1/signup").send({}).expect(200)
            })
            const testing={
                username:"bdhghdg",
                email:"ddghjgdhg@gmail.com",
                password:"gdhdghgdh"
            }
            test("it should sign in user",async()=>{
                await request(app).post("/api/v1/signup").send(testing).expect(400)
            })
        })
            describe("login user", () =>{
            test("it should return 200", async () =>{
               const res =  await request(app).post("/api/v1/login")
               .send(logn)
               token = res.body.accessToken
               expect(res.statusCode).toBe(200)
            })
            test("it should return 400", async () =>{
                const res = await request(app)
                .post("api/v1/login")
                .send({})
                .expect(400)
                .expect("content-type", /json/)
            })
        })
     
        describe("create blog ",() =>{
            test("it should create blog ", async () =>{
               request(app)
               const { body } = await request(app)
                .post("/api/v1/blogs")
                .set("Authorization", `Bearer ${token}`)
                .field("title", "title title")
                .field("content", "post content")
                // .attach("image", path.resolve(__dirname, "../data/profile.jpg"))
                .expect(201)
                .expect("content-type", /json/)
                // uploadedPost = body.blog.id;
            })
        })
        describe("user logout", () =>{
            test("user should logout", async() =>{
              const res = await  request(app)
                .get("/api/v1/logout")
                .set("Authorization", `Bearer ${token}`)
                .expect("content-type", /json/)
            })
        })
        describe("delete blog", () =>{
            test("it should delete a blog", async () =>{
                const id = "63e669a510bf8ab57b4fa345"
             const res= await request(app)
             .delete(`/api/v1/blogs/${id}`)
             .set("Authorization", `Bearer ${token}`)
             expect(res.status).toBe(400)
            })
        })
            describe("create comment", () =>{
                test("it should create comment", async() =>{
                    let id= "63e66d952dc28981273fb0f8"
                     request(app)
                    .post(`/api/v1/blogs/${id}/comment/create`)
                    .send({comment:"comment added"})
                    .set("Authorization", `Bearer ${token}`)
                    .expect(200);
                    // .expect(c.status).toBe(200)
                
                })
            })
            describe("likes", () =>{
               test("it should return 403", async() =>{
                    let id= "63e669a510bf8ab57b4fa345"
                 const res= await   request(app)
                    .post('/api/v1/blogs/63e669a510bf8ab57b4fa345/likes')
                    // .set({authorization: token})
                    expect(res.statusCode).toBe(403)

                })
            })
        describe("update blog",() =>{
            test('Should update single  blog', async () => {
                const id="1234567"
                const response = await request(app)
                .patch(`/api/v1/blogs/${id}`).send({title:"updated", content:"updating"})
                .set({authorization: token})
                expect(response.statusCode).toBe(403);
        
              });
        })

    })
   
    