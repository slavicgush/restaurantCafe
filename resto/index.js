import { Router } from "express";
import { homePage,reservationPage,completeReservationPage,getBreakfast,getSoftdrinks,getLunch,getDinner,getKienyeji,displayMenu } from "./controller.js"

const router = Router();

router.get('/',homePage);
router.get('/breakfast/:id?',getBreakfast);
router.get('/softdrinks/:id?',getSoftdrinks);
router.get('/lunch/:id?',getLunch);
router.get('/dinner/:id?',getDinner);
router.get('/kienyeji/:id?',getKienyeji);
router.get('/reservation',reservationPage);
router.get('/menu',displayMenu);
router.get('/completereservation',completeReservationPage)

export { router };