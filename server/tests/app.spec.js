const { before, after, it } = require("mocha");
require("../services/mongoose");
const User = require("mongoose").model("User");
const app = require("./app.test");
const { createUser } = require("../services/auth");


describe("Security", () => {
  describe("POST /api/auth/sign-up", () => {
    [
      [
        "valid creds",
        { username: "test", email: "test@test.com", password: "test" },
        201, (body) => {
        body.should.have.property("token");
      },
      ],
      [
        "same email",
        { username: "test", email: "test@test.com", password: "testtest" },
        200, (body) => body.should.eql({ message: "This email already taken" }),
      ],
      [
        "no creds",
        { email: "test@test.com" },
        400, (body) => body.should.eql({ message: "Invalid payload" }),
      ],

    ].forEach(([caseName, payload, expectCode, assertResponseBody]) => it(caseName, () => app
      .request("POST", "/api/auth/sign-up")
      .send(payload)
      .expect(expectCode)
      .expect("Content-Type", /json/)
      .then((res) => assertResponseBody(res.body))));
    after(async () => {
      await User.deleteOne({ email: "test@test.com" });
    });
  });
  before(async () => {
    await createUser("test", "test@gmail.com", "test" );
  });
  describe("POST /api/auth/sign-in", () => {
    [
      [
        "Incorrect email",
        { email: "123", password: "123" },
        403, (body) => body.should.eql({ message: "Incorrect email" }),
      ],
      [
        "invalid password",
        { email: "test@gmail.com", password: "12345" },
        403, (body) => body.should.eql({ message: "Incorrect password" }),
      ],
      [
        "valid creds",
        { email: "test@gmail.com", password: "test" },
        200, (body) => {
        body.should.have.property("token");
      },
      ],
      [
        "no creds",
        { email: "test@test.com" },
        400, (body) => body.should.eql({ message: "Invalid payload" }),
      ],
    ].forEach(([caseName, payload, expectCode, assertResponseBody]) => it(caseName, () => app
      .request("POST", "/api/auth/sign-in")
      .send(payload)
      .expect(expectCode)
      .expect("Content-Type", /json/)
      .then((res) => assertResponseBody(res.body))));
    after(async () => {
      await User.deleteOne({ email: "test@gmail.com" });
    });
  });
});
