import request from "supertest";
import { app } from "../../app";

it("fails when email does not exist", async () => {
  return request(app)
    .post("/api/users/signin")
    .send({
      email: "testd@test.com",
      password: "asds",
    })
    .expect(400);
});
