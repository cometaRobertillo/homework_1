/* 
 * API - Router & Handlers provider
 * Date: 11/10/2018
 * Author: Roberto García
 */

// Active strict mode
"use strict";

// Not found handler
const notFound = (data, callback) =>{

    // Callback route not found
    callback(404);
};

this.notFound = notFound;

module.exports = this;