/* 
 * Config - environment configuration
 * Date: 11/10/2018
 * Author: Roberto García
 */

// Activate strict mode
"use strict";

// Container for environments
const environments = {};

// Staging (default) environments
environments.staging = {
    "httpPort":3000,
    "httpsPort":3001,
    "envName": "staging"
};

environments.production = {
    "httpPort":5000,
    "httpsPort":5001,
    "envName": "production"
};

const 
    // Determinate environment by command-line argument
    currentEnvironment = typeof(process.env.NODE_ENV) == "string" ? process.env.NODE_ENV.toLowerCase():"",
    
    // Check current environment is one of disponible environments, if not, default to staging
    environmentToExport = typeof(environments[currentEnvironment]) == "object" ? environments[currentEnvironment] : environments.staging;
    
// Export module
module.exports = environmentToExport;