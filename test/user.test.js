const request = require("supertest");
const { sequelize } = require("../models");
const seeder = require("../seeders");
const app = require("../index");

before(async () => {
  await sequelize.sync({ force: true });
  await seeder();
});
const token = require("./auth_token");
// *********************************************************************** CREATE
describe("User Creation", () => {
  it("Should create User successful", (done) => {
    request(app)
      .post("/user/")
      .send({ name: "Alcetta", username: "alcetta", password: "12345" })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        if (!res.text.includes("User Created")) return done(Error("Invalid"));
        return done();
      });
  });
  // Checking if creation of messages require authentication
  it("Name is required", (done) => {
    request(app)
      .post("/user")
      .send({ name: "", username: "alcetta", password: "12345" })
      .expect(400)
      .end(async (err, res) => {
        if (err) return done(err);
        if (!res.text.includes("name required")) return done(Error("Invalid"));
        return done();
      });
  });
  it("Username is required", (done) => {
    request(app)
      .post("/user")
      .send({ name: "Alcetta", username: "", password: "12345" })
      .expect(400)
      .end(async (err, res) => {
        if (err) return done(err);
        if (!res.text.includes("username required"))
          return done(Error("Invalid"));
        return done();
      });
  });
  it("Username is unique", (done) => {
    request(app)
      .post("/user/")
      .send({ name: "Alcetta", username: "alcetta1", password: "12345" })
      .expect(400)
      .end(async (err, res) => {
        if (err) return done(err);
        if (!res.text.includes("username exists")) done(Error("Invalid"));
        done();
      });
  });
  it("Password is required", (done) => {
    request(app)
      .post("/user")
      .send({ name: "Alcetta", username: "alcetta", password: "" })
      .expect(400)
      .end(async (err, res) => {
        if (err) return done(err);
        if (!res.text.includes("password required"))
          return done(Error("Invalid"));
        return done();
      });
  });
});

// ***********************************************************************LIST

// *********************************************************************** VIEW

// *********************************************************************** UPDATE
describe("User Update", () => {
  it("Should update User successful", (done) => {
    request(app)
      .put("/user/2")
      .set("Authorization", "Bearer " + token)
      .send({ name: "Alcetta4", username: "alcetta4", password: "123454" })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        if (!res.text.includes("User Updated")) return done(Error("Invalid"));
        return done();
      });
  });
  it("Should not update User if not authenticated", (done) => {
    request(app)
      .put("/user/2")
      .send({ name: "", username: "", password: "" })
      .expect(403)
      .expect({ error: "Authentication required" }, done);
  });
  it("Name is required", (done) => {
    request(app)
      .put("/user/2")
      .set("Authorization", "Bearer " + token)
      .send({ name: "", username: "alcetta", password: "12345" })
      .expect(400)
      .end(async (err, res) => {
        if (err) return done(err);
        if (!res.text.includes("name required")) return done(Error("Invalid"));
        return done();
      });
  });
  it("Username is required", (done) => {
    request(app)
      .put("/user/2")
      .set("Authorization", "Bearer " + token)
      .send({ name: "Alcetta", username: "", password: "12345" })
      .expect(400)
      .end(async (err, res) => {
        if (err) return done(err);
        if (!res.text.includes("username required"))
          return done(Error("Invalid"));
        return done();
      });
  });
  it("Username is unique", (done) => {
    request(app)
      .put("/user/2")
      .set("Authorization", "Bearer " + token)
      .send({ name: "Alcetta", username: "alcetta1", password: "12345" })
      .expect(400)
      .end(async (err, res) => {
        if (err) return done(err);
        if (!res.text.includes("username exists")) done(Error("Invalid"));
        done();
      });
  });
  it("Password is required", (done) => {
    request(app)
      .put("/user/2")
      .set("Authorization", "Bearer " + token)
      .send({ name: "Alcetta", username: "alcetta", password: "" })
      .expect(400)
      .end(async (err, res) => {
        if (err) return done(err);
        if (!res.text.includes("password required"))
          return done(Error("Invalid"));
        return done();
      });
  });
});
it("Should not update User which you does not own", (done) => {
  request(app)
    .put("/user/1")
    .set("Authorization", "Bearer " + token)
    .send({ name: "Alcetta3", username: "alcetta3", password: "123453" })
    .expect(400)
    .end((err, res) => {
      if (err) return done(err);
      if (!res.text.includes("You are not the owner"))
        return done(Error("Invalid"));
      return done();
    });
});
it("Should not update User which you does not exist", (done) => {
  request(app)
    .put("/user/10")
    .set("Authorization", "Bearer " + token)
    .send({ name: "Alcetta3", username: "alcetta3", password: "123453" })
    .expect(400)
    .end((err, res) => {
      if (err) return done(err);
      if (!res.text.includes("User not found")) return done(Error("Invalid"));
      return done();
    });
});

// ***********************************************************************DELETE
