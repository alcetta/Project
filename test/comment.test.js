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
describe("Comment Creation", () => {
  it("Should create Comment successful", (done) => {
    request(app)
      .post("/comment/")
      .set("Authorization", "Bearer " + token)
      .send({ content: "Test Comment", articleId: 1, userId: 1 })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        if (!res.text.includes("Comment Created"))
          return done(Error("Invalid"));
        return done();
      });
  });
  // Checking if creation of messages require authentication
  it("Should not create Comment if not authenticated", (done) => {
    request(app)
      .post("/comment/")
      .send({ content: "", articleId: 1, userId: 1 })
      .expect(403)
      .expect({ error: "Authentication required" }, done);
  });
  it("Content is required", (done) => {
    request(app)
      .post("/comment")
      .set("Authorization", "Bearer " + token)
      .send({ content: "", articleId: 1, userId: 1 })
      .expect(400)
      .end(async (err, res) => {
        if (err) return done(err);
        if (!res.text.includes("content required"))
          return done(Error("Invalid"));
        return done();
      });
  });
  it("Article must exist", (done) => {
    request(app)
      .post("/comment/")
      .set("Authorization", "Bearer " + token)
      .send({ content: "Test Comment", articleId: 10, userId: 1 })
      .expect(400)
      .end(async (err, res) => {
        if (err) return done(err);
        if (!res.text.includes("article does not exists"))
          done(Error("Invalid"));
        done();
      });
  });
});

// ***********************************************************************LIST

// *********************************************************************** VIEW

// *********************************************************************** UPDATE
describe("Comment Update", () => {
  it("Should update Comment successful", (done) => {
    request(app)
      .put("/comment/2")
      .set("Authorization", "Bearer " + token)
      .send({ content: "Test Comment4", articleId: 2, userId: 2 })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        if (!res.text.includes("Comment Updated"))
          return done(Error("Invalid"));
        return done();
      });
  });
  it("Should not update Comment if not authenticated", (done) => {
    request(app)
      .put("/comment/2")
      .send({ content: "", articleId: 1, userId: 1 })
      .expect(403)
      .expect({ error: "Authentication required" }, done);
  });
  it("Content is required", (done) => {
    request(app)
      .put("/comment/2")
      .set("Authorization", "Bearer " + token)
      .send({ content: "", articleId: 1, userId: 1 })
      .expect(400)
      .end(async (err, res) => {
        if (err) return done(err);
        if (!res.text.includes("content required"))
          return done(Error("Invalid"));
        return done();
      });
  });
  it("Article must exist", (done) => {
    request(app)
      .put("/comment/2")
      .set("Authorization", "Bearer " + token)
      .send({ content: "Test Comment", articleId: 10, userId: 1 })
      .expect(400)
      .end(async (err, res) => {
        if (err) return done(err);
        if (!res.text.includes("article does not exists"))
          done(Error("Invalid"));
        done();
      });
  });
});
it("Should not update Comment which you does not own", (done) => {
  request(app)
    .put("/comment/1")
    .set("Authorization", "Bearer " + token)
    .send({ content: "Test Comment3", articleId: 2, userId: 2 })
    .expect(400)
    .end((err, res) => {
      if (err) return done(err);
      if (!res.text.includes("You are not the owner"))
        return done(Error("Invalid"));
      return done();
    });
});
it("Should not update Comment which you does not exist", (done) => {
  request(app)
    .put("/comment/10")
    .set("Authorization", "Bearer " + token)
    .send({ content: "Test Comment3", articleId: 2, userId: 2 })
    .expect(400)
    .end((err, res) => {
      if (err) return done(err);
      if (!res.text.includes("Comment not found"))
        return done(Error("Invalid"));
      return done();
    });
});

// ***********************************************************************DELETE
describe("Comment Deletion", () => {
  it("Should delete Comment successful", (done) => {
    request(app)
      .delete("/comment/3")
      .set("Authorization", "Bearer " + token)
      .expect(200)
      .end(async (err, res) => {
        if (err) return done(err);
        if (!res.text.includes("Comment Deleted"))
          return done(Error("Invalid"));
        return done();
      });
  });
  it("Should not delete Comment if not authenticated", (done) => {
    request(app)
      .delete("/comment/3")
      .expect(403)
      .expect({ error: "Authentication required" }, done);
  });
  it("Should not delete Comment if he is not the own", (done) => {
    request(app)
      .delete("/comment/1")
      .set("Authorization", "Bearer " + token)
      .expect(400)
      .end(async (err, res) => {
        if (err) return done(err);
        if (!res.text.includes("You are not the owner"))
          return done(Error("Invalid"));
        return done();
      });
  });
});
