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


it("should calculate MODERATE urgency correctly", async () => {
  // Arrange
  const ticket: Ticket = {
    id: 2,
    title: "Test Moderate",
    description: "Moderate urgency test",
    priority: "medium",
    status: "open",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
  };

  // Act
  const result = await calculateUrgency(ticket);

  // Assert
  expect(result.urgencyScore).toBe(20 + 3 * 5); 
  expect(result.urgencyLevel).toBe("Moderate. Schedule for attention.");
});

it("should calculate HIGH urgency correctly", async () => {
  // Arrange
  const ticket: Ticket = {
    id: 3,
    title: "Test High",
    description: "High urgency test",
    priority: "high",
    status: "open",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
  };

  // Act
  const result = await calculateUrgency(ticket);

  // Assert
  expect(result.urgencyScore).toBe(30 + 5 * 5);
  expect(result.urgencyLevel).toBe("High urgency. Prioritize resolution.");
});

it("should return minimal urgency for resolved tickets", async () => {
  // Arrange
  const ticket: Ticket = {
    id: 4,
    title: "Test Resolved",
    description: "Resolved ticket test",
    priority: "critical",
    status: "resolved",
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
  };

  // Act
  const result = await calculateUrgency(ticket);

  // Assert
  expect(result.urgencyScore).toBe(0);
  expect(result.urgencyLevel).toBe("Minimal. Ticket resolved.");
});

})