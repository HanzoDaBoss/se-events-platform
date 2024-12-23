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
        email: "test-staff@wentevent.com",
        password: "password123",
      })
      .expect(201)
      .then(({ body }) => {
        const user = body.user_data;
        expect(user.email).toBe("test-staff@wentevent.com");
        expect(user.first_name).toBe("Forename");
        expect(user.last_name).toBe("Surname");
        expect(user.role).toBe("staff");
        expect(user.username).toBe("Staff");
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
  test("GET 200: Responds with an array of event objects filtered by the passed filter query", async () => {
    await request(app).post("/api/users-events/3");
    await request(app).post("/api/users-events/4");
    return request(app)
      .get("/api/events?filter=attending")
      .expect(200)
      .then(({ body }) => {
        const { events } = body;
        events.forEach((event) => expect(event.is_attending).toBe(true));
      });
  });
  test("GET 400: Returns with error if passed filter query is not valid", async () => {
    return request(app)
      .get("/api/events?filter=invalidFilter")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid filter query");
      });
  });
  test("GET 200: Responds with an array of event objects sorted by the passed sort_by query in default ascending order", () => {
    return request(app)
      .get("/api/events?sort_by=date")
      .expect(200)
      .then(({ body }) => {
        const { events } = body;
        expect(events).toBeSortedBy("start_time", {
          ascending: true,
          coerce: true,
        });
      });
  });
  test("GET 200: Responds with an array of event objects sorted by the passed sort_by query and order query", () => {
    return request(app)
      .get("/api/events?sort_by=date&order=desc")
      .expect(200)
      .then(({ body }) => {
        const { events } = body;
        expect(events).toBeSortedBy("start_time", {
          descending: true,
          coerce: true,
        });
      });
  });
  test("GET 400: Returns with error if passed sort query is not valid", async () => {
    return request(app)
      .get("/api/events?sort_by=invalidSort")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid sort query");
      });
  });
  test("GET 400: Returns with error if passed order query is not valid", async () => {
    return request(app)
      .get("/api/events?sort_by=date&order=invalidOrder")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid order query");
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
        created_by: "test-staff@wentevent.com",
        image_dir: "winter_gala.jpg",
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
        expect(event.created_by).toBe("test-staff@wentevent.com");
        expect(event.image_dir).toBe("winter_gala.jpg");
      });
  });
  test("POST 400: Returns with error if passed event object is missing required fields", () => {
    return request(app)
      .post("/api/events")
      .send({
        date: "2024-12-15",
        start_time: "2024-12-15T19:00:00",
        summary: "An elegant evening of celebration and networking.",
        description:
          "The Winter Gala is a formal event featuring live music, fine dining, and opportunities to connect with professionals from various industries. Dress to impress!",
        image_dir: "winter_gala.jpg",
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
  test("POST 404: Returns with error if passed event object has a created_by that is not present in users", () => {
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
        created_by: "notindb@gmail.com",
        image_dir: "images/events/winter_gala.jpg",
      })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
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
        expect(event.created_by).toBe("test-staff@wentevent.com");
        expect(event.image_dir).toBe("tech_conference.jpg");
        expect(typeof event.is_attending).toBe("boolean");
      });
  });
  test("GET 404: Returns error if event id is not found in database", () => {
    return request(app)
      .get("/api/events/1234567")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Event not found");
      });
  });
  test("GET 400: Returns error if event id is invalid", () => {
    return request(app)
      .get("/api/events/invalidID")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
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
        created_by: "test-staff@wentevent.com",
        image_dir: "tech_conference.jpg",
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
        expect(event.created_by).toBe("test-staff@wentevent.com");
        expect(event.image_dir).toBe("tech_conference.jpg");
      });
  });
  test("PATCH 404: Returns error if event id is not found in database", () => {
    return request(app)
      .patch("/api/events/100")
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
        created_by: "test-staff@wentevent.com",
        image_dir: "tech_conference.jpg",
      })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Event not found");
      });
  });
  test("PATCH 400: Returns error if event id is invalid", () => {
    return request(app)
      .patch("/api/events/invalidID")
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
        created_by: "test-staff@wentevent.com",
        image_dir: "tech_conference.jpg",
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
  test("PATCH 400: Returns with error if passed event object is missing required fields", () => {
    return request(app)
      .patch("/api/events/1")
      .send({
        title: "Tech Conference 2024",
        start_time: "2024-12-05T10:00:00",
        end_time: "2024-12-05T15:00:00",
        summary:
          "A conference showcasing and exploring the latest in technology.",
        created_by: "test-staff@wentevent.com",
        image_dir: "tech_conference.jpg",
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });

  test("DELETE 204: Deletes an event object corresponding to the passed id", () => {
    return request(app).delete("/api/events/6").expect(204);
  });
  test("DELETE 404: Returns error if event id is not found in database", () => {
    return request(app)
      .delete("/api/events/100")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Event not found");
      });
  });
  test("DELETE 400: Returns error if event id is invalid", () => {
    return request(app)
      .delete("/api/events/invalidID")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
});

describe("/api/users-events/:event_id", () => {
  test("POST 201: Inserts an user-event object into users-events corresponding to the event id and returns it", () => {
    return request(app)
      .post("/api/users-events/2")
      .expect(201)
      .then(({ body }) => {
        const { userEvent } = body;
        expect(typeof userEvent.id).toBe("number");
        expect(typeof userEvent.user_id).toBe("string");
        expect(userEvent.event_id).toBe(2);
      });
  });
  test("POST 404: Returns with error if event id is not found in database", () => {
    return request(app)
      .post("/api/users-events/100")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
      });
  });
  test("POST 400: Returns error if event id is invalid", () => {
    return request(app)
      .post("/api/users-events/invalidID")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });

  test("DELETE 204: Deletes an user-event object corresponding to the passed id", () => {
    return request(app).delete("/api/users-events/2").expect(204);
  });
  test("DELETE 404: Returns with error if event id is not found in database", () => {
    return request(app)
      .delete("/api/users-events/100")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Event not found");
      });
  });
  test("DELETE 400: Returns error if event id is invalid", () => {
    return request(app)
      .delete("/api/users-events/invalidID")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
});

describe("/api/users/logout", () => {
  test("POST 204: Deletes a user's login session", () => {
    return request(app).delete("/api/users/logout").expect(204);
  });
});
