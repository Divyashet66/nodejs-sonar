const request = require("supertest");
const app = require("../index");
const logger = require('../utils/logger')

describe("Test the root path", () => {
  test("It should response the GET method", done => {
    request(app)
      .get("/")
      .then(response => {
        expect(response.statusCode).toBe(200);
        logger.info("testing root path success")
        done();
      });
  });

});
