const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seeds");
const data = require("../db/data/test-data/index");

beforeAll(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

describe("/api/healthcheck", () => {
  test("GET 200", () => {
    return request(app).get("/api/healthcheck").expect(200);
  });
});

describe("/api/users/register", () => {
  test("POST 201: Inserts a user's registration and returns its register details", () => {
    return request(app)
      .post("/api/users/register")
      .send({
        email: "mia.taylor@example.com",
        password: "password321",
        username: "miataylor",
        first_name: "Mia",
        last_name: "Taylor",
      })
      .expect(201)
      .then(({ body }) => {
        expect(body.email).toBe("mia.taylor@example.com");
        expect(body.username).toBe("miataylor");
        expect(body.first_name).toBe("Mia");
        expect(body.last_name).toBe("Taylor");
        expect(body.role).toBe("user");
      });
  });
});

describe("/api/users/login", () => {
  test("POST 201: Inserts a user login and returns its user details", () => {
    return request(app)
      .post("/api/users/login")
      .send({
        email: "alex.volk@example.com",
        password: "password123",
      })
      .expect(201)
      .then(({ body }) => {
        expect(typeof body.user_id).toBe("string");
        expect(body.email).toBe("alex.volk@example.com");
        expect(body.first_name).toBe("Alex");
        expect(body.last_name).toBe("Volkanovski");
        expect(body.role).toBe("staff");
        expect(body.username).toBe("volk145");
      });
  });
});

describe("/api/events", () => {
  test("GET 200: Responds with an array of event objects", () => {
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
          expect(typeof event.created_at).toBe("string");
          expect(typeof event.updated_at).toBe("string");
          expect(typeof event.created_by).toBe("string");
          expect(typeof event.image_dir).toBe("string");
          expect(typeof event.is_attending).toBe("boolean");
        });
      });
  });
  test("POST 201: Inserts an event object into events and returns it", () => {
    return request(app)
      .post("/api/events")
      .send({
        title: "Winter Gala 2024",
        location: "Denver, CO",
        date: "2024-12-15",
        start_time: "2024-12-15T19:00:00",
        end_time: "2024-12-15T23:00:00",
        summary: "An elegant evening of celebration and networking.",
        description:
          "The Winter Gala is a formal event featuring live music, fine dining, and opportunities to connect with professionals from various industries. Dress to impress!",
        created_by: "hanif.uddz@gmail.com",
        image_dir: "images/events/winter_gala.jpg",
      })
      .expect(201)
      .then(({ body }) => {
        const { event } = body;
        expect(typeof event.id).toBe("number");
        expect(event.title).toBe("Winter Gala 2024");
        expect(event.location).toBe("Denver, CO");
        expect(event.date).toBe("2024-12-15T00:00:00.000Z");
        expect(event.start_time).toBe("2024-12-15T19:00:00.000Z");
        expect(event.end_time).toBe("2024-12-15T23:00:00.000Z");
        expect(event.summary).toBe(
          "An elegant evening of celebration and networking."
        );
        expect(event.description).toBe(
          "The Winter Gala is a formal event featuring live music, fine dining, and opportunities to connect with professionals from various industries. Dress to impress!"
        );
        expect(typeof event.created_at).toBe("string");
        expect(typeof event.updated_at).toBe("string");
        expect(event.created_by).toBe("hanif.uddz@gmail.com");
        expect(event.image_dir).toBe("images/events/winter_gala.jpg");
      });
  });
});

describe("/api/events/:event_id", () => {
  test("GET 200: Responds with an event object corresponding to the passed id", () => {
    return request(app)
      .get("/api/events/1")
      .expect(200)
      .then(({ body }) => {
        const { event } = body;
        expect(event.id).toBe(1);
        expect(event.title).toBe("Tech Conference 2024");
        expect(event.location).toBe("San Francisco, CA");
        expect(event.date).toBe("2024-12-05T00:00:00.000Z");
        expect(event.start_time).toBe("2024-12-05T09:00:00.000Z");
        expect(event.end_time).toBe("2024-12-05T17:00:00.000Z");
        expect(event.summary).toBe(
          "A conference exploring the latest in technology."
        );
        expect(event.description).toBe(
          "Join us for a day of insightful talks, networking, and innovation as top minds discuss the future of technology."
        );
        expect(event.created_at).toBe("2024-11-25T10:30:00.000Z");
        expect(event.updated_at).toBe("2024-11-25T10:30:00.000Z");
        expect(event.created_by).toBe("hanif.uddz@gmail.com");
        expect(event.image_dir).toBe("images/events/tech_conference.jpg");
      });
  });
  test("PATCH 200: Updates an event object corresponding to the passed id and returns it", () => {
    return request(app)
      .patch("/api/events/1")
      .send({
        title: "Tech Conference 2024",
        location: "San Francisco, CA",
        date: "2024-12-05",
        start_time: "2024-12-05T10:00:00",
        end_time: "2024-12-05T15:00:00",
        summary:
          "A conference showcasing and exploring the latest in technology.",
        description:
          "Join us for a day of insightful talks, networking, and innovation as top minds discuss the future of technology. Many professionals and tech founders from leading industries will be in attendance so don't miss out on this opportunity!",
        created_at: "2024-11-25T10:30:00",
        created_by: "hanif.uddz@gmail.com",
        image_dir: "images/events/tech_conference.jpg",
      })
      .expect(200)
      .then(({ body }) => {
        const { event } = body;
        expect(event.id).toBe(1);
        expect(event.title).toBe("Tech Conference 2024");
        expect(event.location).toBe("San Francisco, CA");
        expect(event.date).toBe("2024-12-05T00:00:00.000Z");
        expect(event.start_time).toBe("2024-12-05T10:00:00.000Z");
        expect(event.end_time).toBe("2024-12-05T15:00:00.000Z");
        expect(event.summary).toBe(
          "A conference showcasing and exploring the latest in technology."
        );
        expect(event.description).toBe(
          "Join us for a day of insightful talks, networking, and innovation as top minds discuss the future of technology. Many professionals and tech founders from leading industries will be in attendance so don't miss out on this opportunity!"
        );
        expect(event.created_at).toBe("2024-11-25T10:30:00.000Z");
        expect(typeof event.updated_at).toBe("string");
        expect(event.created_by).toBe("hanif.uddz@gmail.com");
        expect(event.image_dir).toBe("images/events/tech_conference.jpg");
      });
  });
  test("DELETE 204: Deletes an event object corresponding to the passed id", () => {
    return request(app).delete("/api/events/6").expect(204);
  });
});
