import { tickets } from "../../../data/tickets";
import type { Ticket } from "../models/ticketModel";

/**
 * Get all tickets
 */
export function getAllTickets(): Ticket[] {
    return tickets;
}

/**
 * Get a single ticket by ID
 */
export function getTicketById(id: number): Ticket | undefined {
    return tickets.find((ticket) => ticket.id === id);
}

/**
 * Create a new ticket
 */
export function createTicket(data: {
  title: string;
  description: string;
  priority: "critical" | "high" | "medium" | "low";
}): Ticket {
  const newTicket: Ticket = {
    id: tickets.length + 1,
    title: data.title,
    description: data.description,
    priority: data.priority,
    status: "open",
    createdAt: new Date(),
  };

  tickets.push(newTicket);
  return newTicket;
}
