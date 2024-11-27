const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seeds");
const data = require("../db/data/test-data/index");

afterAll(() => {
  return db.end();
});

beforeEach(() => {
  return seed(data);
});

describe("/api/healthcheck", () => {
  test("GET 200", () => {
    return request(app).get("/api/healthcheck").expect(200);
  });
});

describe("/api/topics", () => {
  test("GET 200: responds with an array of event objects", () => {
    return request(app)
      .get("/api/events")
      .expect(200)
      .then(({ body }) => {
        const { events } = body;
        expect(events.length).toBe(5);
        events.forEach((event) => {
          expect(typeof event.id).toBe("number");
          expect(typeof event.title).toBe("string");
          expect(typeof event.location).toBe("string");
          expect(typeof event.date).toBe("string");
          expect(typeof event.start_time).toBe("string");
          expect(typeof event.end_time).toBe("string");
          expect(typeof event.summary).toBe("string");
          expect(typeof event.description).toBe("string");
          expect(typeof event.image_dir).toBe("string");
          expect(typeof event.created_at).toBe("string");
          expect(typeof event.updated_at).toBe("string");
          expect(typeof event.created_by).toBe("string");
        });
      });
  });
});
