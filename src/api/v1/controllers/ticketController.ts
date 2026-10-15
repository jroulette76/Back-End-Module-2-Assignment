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
