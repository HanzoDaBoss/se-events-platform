const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seeds");
const data = require("../db/data/development-data/index");

beforeAll(() => {
  return seed(data).then(() => {
    return request(app).post("/api/users/login").send({
      email: "alex.volk@example.com",
      password: "password123",
    });
  });
});

afterAll(() => {
  return db.end();
});

describe("/api/users/register", () => {
  test("POST 400: Returns with error if passed user registration is missing required fields", () => {
    return request(app)
      .post("/api/users/register")
      .send({
        email: "mia.taylor@example.com",
        first_name: "Mia",
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
});

describe("/api/users/login", () => {
  test("POST 400: Returns with error if user login details are incorrect", () => {
    return request(app)
      .post("/api/users/login")
      .send({
        email: "notexist@example.com",
        password: "password987",
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid credentials");
      });
  });
});

describe("/api/events", () => {
  test("POST 403: Returns with error if user has unauthorised access", () => {
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
      .expect(403)
      .then(({ body }) => {
        expect(body.msg).toBe("Unauthorised access");
      });
  });
});

describe("/api/events/:event_id", () => {
  test("PATCH 403: Returns with error if user has unauthorised access", () => {
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
      .expect(403)
      .then(({ body }) => {
        expect(body.msg).toBe("Unauthorised access");
      });
  });
  test("DELETE 404: Returns with error if user has unauthorised access", () => {
    return request(app)
      .delete("/api/events/5")
      .expect(403)
      .then(({ body }) => {
        expect(body.msg).toBe("Unauthorised access");
      });
  });
});
