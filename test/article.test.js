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
describe("Article Creation", () => {
  it("Should create Article successful", (done) => {
    request(app)
      .post("/article/")
      .set("Authorization", "Bearer " + token)
      .send({
        title: "Test Article",
        content: "This is a test article",
        on_date: "2024-12-1",
        userId: 1,
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        if (!res.text.includes("Article Created"))
          return done(Error("Invalid"));
        return done();
      });
  });
  // Checking if creation of messages require authentication
  it("Should not create Article if not authenticated", (done) => {
    request(app)
      .post("/article/")
      .send({ title: "", content: "", on_date: "", userId: 1 })
      .expect(403)
      .expect({ error: "Authentication required" }, done);
  });
  it("Title is required", (done) => {
    request(app)
      .post("/article")
      .set("Authorization", "Bearer " + token)
      .send({
        title: "",
        content: "This is a test article",
        on_date: "2024-12-1",
        userId: 1,
      })
      .expect(400)
      .end(async (err, res) => {
        if (err) return done(err);
        if (!res.text.includes("title required")) return done(Error("Invalid"));
        return done();
      });
  });
  it("Content is required", (done) => {
    request(app)
      .post("/article")
      .set("Authorization", "Bearer " + token)
      .send({
        title: "Test Article",
        content: "",
        on_date: "2024-12-1",
        userId: 1,
      })
      .expect(400)
      .end(async (err, res) => {
        if (err) return done(err);
        if (!res.text.includes("content required"))
          return done(Error("Invalid"));
        return done();
      });
  });
  it("On_Date is required", (done) => {
    request(app)
      .post("/article")
      .set("Authorization", "Bearer " + token)
      .send({
        title: "Test Article",
        content: "This is a test article",
        on_date: "",
        userId: 1,
      })
      .expect(400)
      .end(async (err, res) => {
        if (err) return done(err);
        if (!res.text.includes("on_date required"))
          return done(Error("Invalid"));
        return done();
      });
  });
});

// ***********************************************************************LIST
describe("Article list", () => {
  it("Should list Article successful", (done) => {
    request(app)
      .get("/article/")
      .expect(200)
      .end(async (err, res) => {
        if (err) return done(err);
        if (!res.text.includes("All Article")) done(Error("Invalid"));
        done();
      });
  });
});

// *********************************************************************** VIEW
describe("Article Viewing", () => {
  it("Should view Article successful", (done) => {
    request(app).get("/article/2").expect(200, done);
  });
});

// *********************************************************************** UPDATE
describe("Article Update", () => {
  it("Should update Article successful", (done) => {
    request(app)
      .put("/article/2")
      .set("Authorization", "Bearer " + token)
      .send({
        title: "Test Article4",
        content: "This is a test article4",
        on_date: "2024-12-14",
        userId: 2,
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        if (!res.text.includes("Article Updated"))
          return done(Error("Invalid"));
        return done();
      });
  });
  it("Should not update Article if not authenticated", (done) => {
    request(app)
      .put("/article/2")
      .send({ title: "", content: "", on_date: "", userId: 1 })
      .expect(403)
      .expect({ error: "Authentication required" }, done);
  });
  it("Title is required", (done) => {
    request(app)
      .put("/article/2")
      .set("Authorization", "Bearer " + token)
      .send({
        title: "",
        content: "This is a test article",
        on_date: "2024-12-1",
        userId: 1,
      })
      .expect(400)
      .end(async (err, res) => {
        if (err) return done(err);
        if (!res.text.includes("title required")) return done(Error("Invalid"));
        return done();
      });
  });
  it("Content is required", (done) => {
    request(app)
      .put("/article/2")
      .set("Authorization", "Bearer " + token)
      .send({
        title: "Test Article",
        content: "",
        on_date: "2024-12-1",
        userId: 1,
      })
      .expect(400)
      .end(async (err, res) => {
        if (err) return done(err);
        if (!res.text.includes("content required"))
          return done(Error("Invalid"));
        return done();
      });
  });
  it("On_Date is required", (done) => {
    request(app)
      .put("/article/2")
      .set("Authorization", "Bearer " + token)
      .send({
        title: "Test Article",
        content: "This is a test article",
        on_date: "",
        userId: 1,
      })
      .expect(400)
      .end(async (err, res) => {
        if (err) return done(err);
        if (!res.text.includes("on_date required"))
          return done(Error("Invalid"));
        return done();
      });
  });
});
it("Should not update Article which you does not own", (done) => {
  request(app)
    .put("/article/1")
    .set("Authorization", "Bearer " + token)
    .send({
      title: "Test Article3",
      content: "This is a test article3",
      on_date: "2024-12-13",
      userId: 2,
    })
    .expect(400)
    .end((err, res) => {
      if (err) return done(err);
      if (!res.text.includes("You are not the owner"))
        return done(Error("Invalid"));
      return done();
    });
});
it("Should not update Article which you does not exist", (done) => {
  request(app)
    .put("/article/10")
    .set("Authorization", "Bearer " + token)
    .send({
      title: "Test Article3",
      content: "This is a test article3",
      on_date: "2024-12-13",
      userId: 2,
    })
    .expect(400)
    .end((err, res) => {
      if (err) return done(err);
      if (!res.text.includes("Article not found"))
        return done(Error("Invalid"));
      return done();
    });
});

// ***********************************************************************DELETE
describe("Article Deletion", () => {
  it("Should delete Article successful", (done) => {
    request(app)
      .delete("/article/3")
      .set("Authorization", "Bearer " + token)
      .expect(200)
      .end(async (err, res) => {
        if (err) return done(err);
        if (!res.text.includes("Article Deleted"))
          return done(Error("Invalid"));
        return done();
      });
  });
  it("Should not delete Article if not authenticated", (done) => {
    request(app)
      .delete("/article/3")
      .expect(403)
      .expect({ error: "Authentication required" }, done);
  });
  it("Should not delete Article if he is not the own", (done) => {
    request(app)
      .delete("/article/1")
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
