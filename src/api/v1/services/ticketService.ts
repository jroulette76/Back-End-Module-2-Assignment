import { tickets } from "../../../data/tickets";
import type { Ticket } from "../models/ticketModel";

/**
 * Get all tickets
 */
export const getAllTickets = async (): Promise<Ticket[]> => {
    return structuredClone(tickets);
};

/**
 * Get a single ticket by ID
 */
export const getTicketById = async (id: number): Promise<Ticket> => {
    const ticket = tickets.find((t) => t.id === id);
    if (!ticket) {
        throw new Error(`Ticket with ID ${id} not found`);
    }
    
    return structuredClone(ticket);
};

/**
 * Create a new ticket
 */
export const createTicket = async (data: {
  title: string;
  description: string;
  priority: "critical" | "high" | "medium" | "low";
}): Promise<Ticket> => {
  const newTicket: Ticket = {
    id: tickets.length + 1,
    title: data.title,
    description: data.description,
    priority: data.priority,
    status: "open",
    createdAt: new Date(),
  };

  tickets.push(newTicket);
  return structuredClone(newTicket);
};

/**
 * Update an existing ticket
 */
export const updateTicket = async (
  id: number,
  updates: Partial<Pick<Ticket, "title" | "description" | "priority" | "status">>
): Promise<Ticket> => {
  const index = tickets.findIndex((t) => t.id === id);

  if (index === -1) {
    throw new Error(`Ticket with ID ${id} not found`);
  }

  tickets[index] = {
    ...tickets[index],
    ...updates,
  };

  return structuredClone(tickets[index]);
};

/**
 * Delete a ticket by ID
 */
export const deleteTicket = async (id: number): Promise<void> => {
  const index = tickets.findIndex((t) => t.id === id);

  if (index === -1) {
    throw new Error(`Ticket with ID ${id} not found`);
  }

  tickets.splice(index, 1);
};
