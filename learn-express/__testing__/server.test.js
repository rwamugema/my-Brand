import request from "supertest";
import app from "../index.js";
import mongoose from "mongoose";
import {createBlog, updateBlog } from "../controllers/blogController";
import { sign } from "../controllers/authController.js";
import { response } from "express";


let token =""
const blogs = {
    title:"testing jest",
    content:"jest testing"
}
// const sign = {
//     userName:"japhet jest",
//     email:"",
//     password:"57755"
// }
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
            const id = "63e9e53b911487f0537e66e9";
           const Getblog= await request(app).get(`/api/v1/blogs/${id}`).expect(200)
        })
        test("it should return 404", async() =>{
            const idd = '12345'
          const noblog =   await request(app).post(`/api/v1/blogs/${idd}`).expect(404)
        })
    })
  
    //    describe("sign user in", () =>{
    //     test("should sign user in", async () =>{
    //         const user = {
    //             userName:"jehhhhhhh",
    //             email:"je2@gmail.com",
    //             password:"43434343434343"
    //         }
    //         // const res = sign(user)
    //         // expect(res).toBeTruthy()
    //         const userBody = await request(app)
    //         .post('/api/v1/signup').send(user)
    //         console.log(userBody);

            
    //     })
    //    })
            describe("login user", () =>{
            test("it should return 200", async () =>{
               const res =  await request(app).post("/api/v1/login")
               .send(logn)
               token = res.body.accessToken
               expect(res.statusCode).toBe(200)
            })
            // test("it should return 400", async () =>{
            //     const res = await request(app)
            //     .post("api/v1/login")
            //     .send({})
            //     .expect(400)
            //     .expect("content-type", /json/)
            // })
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
                   await  request(app)
                    .post(`/api/v1/blogs/${id}/comment/create`)
                    .send({comment:"comment added"})
                    .set("Authorization", `Bearer ${token}`)
                    .expect(200);
                    // .expect(c.status).toBe(200)
                
                })
            })
            describe("likes", () =>{
               test("it should return 200", async() =>{
                    let id= "63e9e53b911487f0537e66e9"
                 const res= await   request(app)
                    .post(`/api/v1/blogs/${id}/likes`)
                    .set("Authorization", `Bearer ${token}`)
                    .expect("content-type", /json/)
                    // .expect(res.statusCode).toBe(200)

                })
            })
            describe("likes", () =>{
                test("it should return 403", async () =>{
                    let id = "iiijjjjiii"
                    const response = await request(app)
                    .post(`/api/v1/blogs/${id}/likes`)
                    .set("Authorization", `Bearer ${token}`)
                    .expect("content-type", /json/)
                
                })
            })
        describe("update blog",() =>{
            test('Should not update single  blog', async () => {
                const id="1234567"
                const response = await request(app)
                .patch(`/api/v1/blogs/${id}`).send({title:"updated", content:"updating"})
                .set({authorization: token})
                expect(response.statusCode).toBe(403);
              });
        })

        describe("update the single blog", () =>{
            test("it should update single blog", async () =>{
                let id = "63e9e53b911487f0537e66e9"
               const updatedBlog = await request(app)
                .patch(`/api/v1/blogs/${id}`)
                .send({title:"updated", content:"updating"})
                .set("Authorization", `Bearer ${token}`)
                .expect(200)
                console.log(updatedBlog.body);
            })
        })
    })
   
    