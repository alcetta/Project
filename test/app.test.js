const request = require("supertest");
const app = require("../index");

describe("App Running", () => {
  it("Should application start correctly", (done) => {
    request(app)
      .get("/")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        if (!res.text.includes("Application Started"))
          return done(Error("Invalid"));
        return done();
      });
  });
});
