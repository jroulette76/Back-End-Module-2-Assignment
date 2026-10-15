import express, { Router } from "express";
import * as ticketController from "../controllers/ticketController";

const router: Router = express.Router();

// GET all tickets
router.get("/", ticketController.getAllTickets);

// GET ticket by ID
router.get("/:id", ticketController.getTicketById);

// GET ticket urgency
router.get("/:id/urgency", ticketController.getTicketUrgency);

// CREATE ticket
router.post("/", ticketController.createTicket);

// UPDATE ticket
router.put("/:id", ticketController.updateTicket);

// DELETE ticket
router.delete("/:id", ticketController.deleteTicket);

export default router;
