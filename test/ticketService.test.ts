import { calculateUrgency } from "../src/api/v1/services/ticketService";
import { Ticket } from "../src/api/v1/models/ticketModel";


describe("Urgency Calculation Service", () => {

  it("should calculate LOW urgency correctly", async () => {
    // Arrange
    const ticket: Ticket = {
      id: 1,
      title: "Test Low",
      description: "Low urgency test",
      priority: "low",
      status: "open",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    };

    // Act
    const result = await calculateUrgency(ticket);

    // Assert
    expect(result.urgencyScore).toBe(10 + 2 * 5); 
    expect(result.urgencyLevel).toBe("Low urgency. Address when capacity allows.");
  });
})
