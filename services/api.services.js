/* 
 * API - Router & Handlers provider
 * Date: 11/10/2018
 * Author: Roberto García
 */

// Active strict mode
"use strict";

// Get dependencies
const
    ERRORPROVIDER = require("./ErrorProvider/error.services"),
    DATEPROVIDER = require("./DateProvider/date.services");

// Define handlers
let handlers = {};

// Ping handler
handlers.ping = (data, callback) => {

    // Return 200 if still alive
    callback(200);
};

// Not found handler
handlers.notFound = ERRORPROVIDER.notFound;

// Date handler
handlers.date = DATEPROVIDER.getDate;

// Define request router
let router = {
    "ping": handlers.ping,
    "date": handlers.date
};

this.router = router;
this.handlers = handlers;

module.exports = this;