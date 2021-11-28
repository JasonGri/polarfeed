const express = require('express');
const UserRepo = require('../repositories/users');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const tokenRepo = require('../repositories/tokens');



const router = express.Router();

// request to get all users from db
router.get('/users', async (req, res) => {
    const users = await UserRepo.find();
    res.send(users);
});

// request to get specific user from db
router.get('/users/:id', async (req, res) => {
    const { id } = req.params;

    const user = await UserRepo.findById(id);

    if (user) {
        res.send(user);
    } else {
        res.sendStatus(404);
    }
});

// request to delete specific user from db
router.delete('/users/:id', async (req, res) => {
    // req.params is used for info given on the url
    const { id } = req.params;

    const user = await UserRepo.delete(id);

    if (user) {
        res.send(`The following user was deleted: ${user[0].username}`);
    } else {
        res.Status(404).send('User was not found.');
    }
});


// Registration
router.post('/register', async (req, res) => {
    const { email, username, password } = req.body;

    // Password encryption
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await UserRepo.findByEmail(email);

    if (user) {
        res.send('A user with the same email already exist!');
    } else {
        const newUser = await UserRepo.insert(username, hashedPassword, email);
        res.send(newUser);

        // verification code generation
        const token = Math.floor((Math.random() * 100) + 54);
        const verificationToken = await tokenRepo.insert(newUser[0].id, token);
        console.log(verificationToken);
        // jwt token
        // let jwtTokenEmailVerify = jwt.sign(
        //     { email: user.dataValues.email }, 'secret',
        //     // { expiresIn: "1h" }
        // );

        // create reusable transporter object using the default SMTP transport
        let transporter = await nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const message = {
            from: '<no-reply@example.com>',
            to: `${email}`,
            subject: "Email Verification",
            text: 'text/plain', // plain text body
            // html: `Press <a href=http://localhost:3000/verify/${verificationToken[0].token}> here </a> to verify yout email.`
        }
        // send mail with defined transport object
        const info = await transporter.sendMail(message);

        console.log(`Message sent: ${info.messageId}`);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }


});

// login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await UserRepo.findByEmail(email);
    if (!user) {
        res.send('Invalid Credentials');
    }
    if (!user.is_verified) {
        res.send('Please confirm your email!');
    }
    const valid_pass = await bcrypt.compare(password, user[0].password);
    if (!valid_pass) {
        res.send('Invalid Credentials')
    }
});

module.exports = router;