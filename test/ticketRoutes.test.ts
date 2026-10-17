import request from "supertest";
import app from "../src/server";

describe("Ticket Routes API", () => {

  it("should retrieve all tickets", async () => {
    const res = await request(app).get("/api/v1/tickets");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Tickets retrieved");
    expect(Array.isArray(res.body.data)).toBe(true);
  });

});
