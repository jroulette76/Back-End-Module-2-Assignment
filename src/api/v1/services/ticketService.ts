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
