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

})