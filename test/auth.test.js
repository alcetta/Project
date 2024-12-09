const request = require("supertest");
const { sequelize } = require("../models");
const seeder = require("../seeders");
const app = require("../index");

before(async () => {
  await sequelize.sync({ force: true });
  await seeder();
});
describe("Auth", () => {
  it("Should login successful", (done) => {
    request(app)
      .post("/auth/user")
      .send({ username: "alcetta1", password: "123451" })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        if (!res.text.includes("token")) return done(Error("Invalid"));
        return done();
      });
  });
  it("Should login fail when incorrect username", (done) => {
    request(app)
      .post("/auth/user")
      .send({ username: "invalidusername", password: "123456" })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        if (!res.text.includes("Username/Password incorrect"))
          return done(Error("Invalid"));
        return done();
      });
  });
  it("Should login fail when incorrect password", (done) => {
    request(app)
      .post("/auth/user")
      .send({ username: "alcetta1", password: "123456" })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        if (!res.text.includes("Username/Password incorrect"))
          return done(Error("Invalid"));
        return done();
      });
  });
  it("Not accept invalid token", (done) => {
    request(app)
      .post("/article/")
      .set("Authorization", "invalid_token")
      .send({ name: "Alcetta", username: "alcetta", password: "" })
      .expect(400)
      .end(async (err) => {
        if (err) return done(err);
        return done();
      });
  });
});
