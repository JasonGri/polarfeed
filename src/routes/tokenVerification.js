const express = require('express');
const UserRepo = require('../repositories/users');

const router = express.Router();

router.get('/verify/:uniqueString', async (req, res) => {
    // getting the string
    const { uniqueString } = req.params;
    // check if there is anyone with this string

    // if there is anyone, mark them verified

    // redirect to the home or elsewhere

    // else send an error message

})