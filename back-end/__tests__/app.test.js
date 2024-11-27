const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seeds");
const data = require("../db/data/test-data/index");

afterAll(() => {
  return db.end();
});

// beforeEach(() => {
//   return seed(data);
// });

describe("/api/healthcheck", () => {
  test("GET 200", () => {
    return request(app).get("/api/healthcheck").expect(200);
  });
});

describe("/api/events", () => {
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

describe("/api/events/:event_id", () => {
  test("GET 200: responds with an event object corresponding to the passed id", () => {
    return request(app)
      .get("/api/events/1")
      .expect(200)
      .then(({ body }) => {
        const { event } = body;
        expect(event.id).toBe(1);
        expect(event.title).toBe("Tech Conference 2024");
        expect(event.location).toBe("San Francisco, CA");
        expect(event.date).toBe("2024-12-05T00:00:00.000Z");
        expect(event.start_time).toBe("2025-12-05T09:00:00.000Z");
        expect(event.end_time).toBe("2025-12-05T17:00:00.000Z");
        expect(event.summary).toBe(
          "A conference exploring the latest in technology."
        );
        expect(event.description).toBe(
          "Join us for a day of insightful talks, networking, and innovation as top minds discuss the future of technology."
        );
        expect(event.image_dir).toBe("images/events/tech_conference.jpg");
        expect(event.created_at).toBe("2024-11-25T10:30:00.000Z");
        expect(event.updated_at).toBe("2024-11-25T10:30:00.000Z");
        expect(event.created_by).toBe("hanif.uddz@gmail.com");
      });
  });
});
