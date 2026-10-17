import request from "supertest";
import app from "../src/server";

describe("Ticket Routes API", () => {

 it("should retrieve all tickets", async () => {
  const res = await request(app).get("/api/v1/tickets");

  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty("message", "Tickets retrieved");
  expect(res.body).toHaveProperty("data");
  expect(Array.isArray(res.body.data)).toBe(true);

  // Validate that at least one ticket exists
  expect(res.body.data.length).toBeGreaterThan(0);

  // Validate structure of the first ticket
  const ticket = res.body.data[0];
  expect(ticket).toHaveProperty("id");
  expect(ticket).toHaveProperty("title");
  expect(ticket).toHaveProperty("description");
  expect(ticket).toHaveProperty("priority");
});

it("should retrieve a ticket by ID", async () => {
  const res = await request(app).get("/api/v1/tickets/1");

  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty("message", "Ticket retrieved");
  expect(res.body).toHaveProperty("data");

  // Validate ticket structure
  expect(res.body.data).toHaveProperty("id", 1);
  expect(res.body.data).toHaveProperty("title");
  expect(res.body.data).toHaveProperty("description");
  expect(res.body.data).toHaveProperty("priority");
});

it("should return 400 for invalid ID", async () => {
  const res = await request(app).get("/api/v1/tickets/abc");

  expect(res.status).toBe(400);
  expect(res.body).toHaveProperty("message", "Invalid ticket ID");
});

it("should create a new ticket", async () => {
  const newTicket = {
    title: "New Issue",
    description: "Something is not working",
    priority: "high"
  };

  const res = await request(app)
    .post("/api/v1/tickets")
    .send(newTicket)
    .set("Content-Type", "application/json");

  expect(res.status).toBe(201);
  expect(res.body).toHaveProperty("message", "Ticket created");
  expect(res.body).toHaveProperty("data");

  // Validate structure of created ticket
  expect(res.body.data).toHaveProperty("id");
  expect(res.body.data).toHaveProperty("title", newTicket.title);
  expect(res.body.data).toHaveProperty("description", newTicket.description);
  expect(res.body.data).toHaveProperty("priority", newTicket.priority);
});

it("should update an existing ticket", async () => {
  const updatedTicket = {
    title: "Updated Issue",
    description: "Updated description",
    priority: "low"
  };

  const res = await request(app)
    .put("/api/v1/tickets/1")
    .send(updatedTicket)
    .set("Content-Type", "application/json");

  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty("message", "Ticket updated");
  expect(res.body).toHaveProperty("data");

  // Validate updated fields
  expect(res.body.data).toHaveProperty("id", 1);
  expect(res.body.data).toHaveProperty("title", updatedTicket.title);
  expect(res.body.data).toHaveProperty("description", updatedTicket.description);
  expect(res.body.data).toHaveProperty("priority", updatedTicket.priority);
});

it("should return 400 for invalid ID on update", async () => {
  const res = await request(app)
    .put("/api/v1/tickets/abc")
    .send({
      title: "Bad Update",
      description: "Invalid ID test",
      priority: "high"
    });

  expect(res.status).toBe(400);
  expect(res.body).toHaveProperty("message", "Invalid ticket ID");
});

it("should return urgency details for a ticket", async () => {
  const res = await request(app).get("/api/v1/tickets/1/urgency");

  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty("message", "Ticket urgency calculated");
  expect(res.body).toHaveProperty("data");

  // Validate urgency structure
  expect(res.body.data).toHaveProperty("urgencyScore");
  expect(typeof res.body.data.urgencyScore).toBe("number");

  expect(res.body.data).toHaveProperty("urgencyLevel");
  expect([
    "Low. No immediate action required.",
    "Moderate. Schedule for attention.",
    "High. Immediate action required."
  ]).toContain(res.body.data.urgencyLevel);
});

it("should return 400 for invalid ID on urgency check", async () => {
  const res = await request(app).get("/api/v1/tickets/abc/urgency");

  expect(res.status).toBe(400);
  expect(res.body).toHaveProperty("message", "Invalid ticket ID");
});

it("should delete a ticket by ID", async () => {
  const res = await request(app).delete("/api/v1/tickets/1");

  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty("message", "Ticket deleted");
});

it("should return 400 for invalid ID on delete", async () => {
  const res = await request(app).delete("/api/v1/tickets/abc");

  expect(res.status).toBe(400);
  expect(res.body).toHaveProperty("message", "Invalid ticket ID");
});

})