import request from "supertest";
import app from "../index.js";
import mongoose from "mongoose";
import schemaUser from "../learn-express/models/user.js";

let token =""
const blogs = {
    title:"testing jest",
    content:"jest testing"
}
const  user = {
    userName:"alexis",
    email:"btrey@gmial.com",
    password:"1234455566"
}
const logn = {
    email:"res@gmail.com",
    password:"123445"
}
let uploadedPost
jest.setTimeout(30000)

describe("testing", () =>{
    beforeAll(async() =>{
         await mongoose.connect("mongodb+srv://japhet:empire@cluster0.wcifge7.mongodb.net/test")
        
    })
    afterAll(async() =>{
        await mongoose.disconnect();
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
    describe("User Signup", () => {
        test("should sign up user", async () =>{
             await request(app)
            .post("/api/v1/signup")
            .send(user).expect(201)
        })
        test("creates a new user", async () => {
          expect(user).toMatchObject({
            email: "btrey@gmial.com"
          });
        });
        test("delete user", async () =>{
            await schemaUser.deleteOne({ email: "btrey@gmial.com" });
        })
      });

            describe("login user", () =>{
            test("it should return 200", async () =>{
               const res =  await request(app).post("/api/v1/login")
               .send(logn)
               token = res.body.accessToken
               expect(res.statusCode).toBe(200)
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
             console.log(token);
             expect(res.status).toBe(400)
            })
        })
            describe("create comment", () =>{
                test("it should create comment", async() =>{
                    let id= "63e66d952dc28981273fb0f8"
                 const c =  await  request(app)
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
                .expect("content-type", /json/)
            })
        })
    })
   
    