/* 
 * API - Router & Handlers provider
 * Date: 11/10/2018
 * Author: Roberto García
 */

// Active strict mode
"use strict";

// Set getDate service
const getDate = (date,callback)=>{

    // Set response
    let response = {};

    // Get date
    response.dateNow = new Date();

    // Send response
    callback(200,response);
}

this.getDate = getDate;

module.exports = this;