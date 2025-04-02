import request from "supertest";
import { app } from "../../app";

it("return a 201 on successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "asds",
    })
    .expect(201);
});

it("return a 400 with invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test",
      password: "asds",
    })
    .expect(400);
});

it("return a 400 with invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "asd",
    })
    .expect(400);
});

it("disallows duplicate a=email", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "asdf",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "asdf",
    })
    .expect(400);
});

it("sets a cookie after signup", async () => {
  const res = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "asdf",
    })
    .expect(201);

  expect(res.get("Set-Cookie")).toBeDefined();
});
