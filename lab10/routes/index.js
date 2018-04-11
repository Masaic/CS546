const express = require(`express`);
const login = require(`./login`);

const constructorMethod = app => {
    app.use("/", login);
    
    app.get("*", (req, res) => {
        res.sendStatus(404);
    });
};

module.exports = constructorMethod;