const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'epicskills000@gmail.com',
        pass: 'Epicskills69'
    }
});

const flightSchema = new mongoose.Schema({
    flightNumber: { type: String, required: true },
    airline: { type: String, required: true },
    destination: { type: String, required: true },
    departureTime: { type: Date, required: true },
    status: { type: String, default: 'Scheduled' }
});

// Middleware to log flight creation and send email
flightSchema.pre('save', function (next) {
    if (this.isNew) {
        console.log(`A new flight is being created: ${this.flightNumber} - ${this.airline}`);

        const mailOptions = {
            from: 'epicskills000@gmail.com',
            to: 'abhijith0604@gmail.com',
            subject: 'New Flight Created',
            text: `A new flight has been created:\n\nFlight Number: ${this.flightNumber}\nAirline: ${this.airline}\nDestination: ${this.destination}\nDeparture Time: ${this.departureTime}\nStatus: ${this.status}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });
    }
    next();
});

// Middleware to log flight deletion and send email
flightSchema.pre('remove', function (next) {
    console.log(`A flight is being deleted: ${this.flightNumber} - ${this.airline}`);

    const mailOptions = {
        from: 'epicskills000@gmail.com',
        to: 'abhijithb0604@gmail.com',
        subject: 'Flight Deleted',
        text: `A flight has been deleted:\n\nFlight Number: ${this.flightNumber}\nAirline: ${this.airline}\nDestination: ${this.destination}\nDeparture Time: ${this.departureTime}\nStatus: ${this.status}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });

    next();
});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;
