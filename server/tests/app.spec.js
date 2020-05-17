const { before, after, it } = require("mocha");
require("../services/mongoose");
const User = require("mongoose").model("User");
const Product = require("mongoose").model("Product");
const app = require("./app.test");
const { createUser, signToken } = require("../services/user");


describe("Security", () => {
  let token;
  before(async () => {
    token = await signToken("test");
  });
  describe("Token verification", () => {
    it("GET /api/auth/token, invalid", () => app
      .request("GET", "/api/auth/token")
      .set("Authorization", "Bearer dfsg")
      .expect(401));
    it("GET /api/auth/token, valid", () => app
      .request("GET", "/api/auth/token")
      .set("Authorization", `Bearer ${token}`)
      .expect(200));
  });
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
    await createUser("test", "test@gmail.com", "test");
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

describe("Product", () => {
  [
    [
      "valid payload",
      { name: "testtest", amount: 12 },
      201,
    ],
    [
      "invalid payload",
      { email: "test@test.com" },
      400,
    ],

  ].forEach(([caseName, payload, expectCode]) => it(caseName, () => app
    .request("POST", "/api/product/createProduct")
    .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYzFiNTM2ZjM0MWFhMzIwZDYyNDN" +
      "lYiIsImlhdCI6MTU4OTc1MzE0M30.RhcBnWya5HgMhzvlTtSDaTBvCrCXKs3kCeZO-iDxeJo")
    .send(payload)
    .expect(expectCode)));
  after(async () => {
    await Product.deleteOne({ name: "testtest" });
  });
});
