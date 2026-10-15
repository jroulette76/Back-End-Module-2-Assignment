import type { Request, Response } from "express";
import * as ticketService from "../services/ticketService";
import { HTTP_STATUS } from "../../../constants/httpStatus";

export const getAllTickets = async (req: Request, res: Response) => {
  try {
    const tickets = await ticketService.getAllTickets();

    return res.status(HTTP_STATUS.OK).json({
      message: "Tickets retrieved",
      data: tickets,
    });
  } catch (error: any) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

export const getTicketById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Invalid ticket ID",
      });
    }

    const ticket = await ticketService.getTicketById(id);

    return res.status(HTTP_STATUS.OK).json({
      message: "Ticket retrieved",
      data: ticket,
    });
  } catch (error: any) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      message: error.message,
    });
  }
};

export const createTicket = async (req: Request, res: Response) => {
  try {
    const { title, description, priority } = req.body;

    if (!title || !description || !priority) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Missing required fields: title, description, priority",
      });
    }

    const allowedPriorities = ["critical", "high", "medium", "low"];
    if (!allowedPriorities.includes(priority)) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Invalid priority value",
      });
    }

    const newTicket = await ticketService.createTicket({
      title,
      description,
      priority,
    });

    return res.status(HTTP_STATUS.CREATED).json({
      message: "Ticket created",
      data: newTicket,
    });
  } catch (error: any) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};
