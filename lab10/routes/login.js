const users = require(`../users.js`);
const express = require("express");
const router = express.Router();


router.get(`/`, (req, res) => {
    // If we had a user system, we could check to see if we could access /admin
    console.log(`The request has all the following cookies:`);
    console.log(req.cookies);
    if (req.cookies.AuthCookie) {
        console.log(
            `This user last accessed the site at ${req.cookies.AuthCookie}`
        );
        res.redirect(`/private`);
    } else {
        console.log(`This user has never accessed the site before`);
        res.render(`body/login`)
    }
});

router.post(`/login`, (req, res) => {
    let provideUsername = req.body.username;
    let providePassword = req.body.password;
    console.log(`${provideUsername}`);
    try {
        if (!provideUsername) {
            throw `No valid username provided`;
        }
        if (!providePassword) {
            throw `No valid password provided`;
        }
        const id = users.check(provideUsername, providePassword);
        if (id === `password not match`) {
            throw `password not match`
        }
        if (id === `user not exist`) {
            throw `user not exist`
        }
        console.log(`${id}`);
        res.cookie(`AuthCookie`, id);
        res.redirect(`/private`);
    } catch (e) {
        console.log(e);
        res.status(403).json(e);
        return;
    }
});

router.get(`/private`, (req, res) => {
    if (req.cookies.AuthCookie) {
        console.log(
            `The last id accessed the site is ${req.cookies.AuthCookie}`
        );
        let user = users.getUserById(req.cookies.AuthCookie);
        res.render(`body/private`, { username: user });
    } else {
        res.status(403).json(`No user login`);
    }
});

router.get(`/logout`, (req, res) => {
    res.clearCookie(`AuthCookie`)
    res.render(`body/logout`)
});

module.exports = router;