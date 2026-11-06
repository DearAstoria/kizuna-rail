import { createConfirmation, getScheduleById, getTicketOptionsForRoute } from '../../models/model.js';
import { yenToUsd } from '../../includes/helpers.js';

const bookingPage = async (req, res) => {
    const { scheduleId } = req.params;

    const schedule = await getScheduleById(scheduleId);
    let ticketOptions = await getTicketOptionsForRoute(schedule.routeId, scheduleId);

    console.log("schedule: ", schedule);
    console.log("ticketOptions: ", ticketOptions);
    ticketOptions = ticketOptions.map(ticket => ({...ticket, price: parseFloat(yenToUsd(ticket.price).toFixed(2))}));
    console.log("Updated ticketOptions: ", ticketOptions);
    res.render('routes/book', {
        title: 'Book Trip',
        schedule,
        ticketOptions
    });
};

const processBookingRequest = async (req, res) => {
    const data = req.body;

    const confirmationNum = await createConfirmation(data);

    res.redirect(`/routes/confirmation/${confirmationNum}`);
};

export { bookingPage, processBookingRequest };