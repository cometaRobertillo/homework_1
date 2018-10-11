/* 
 * RESTFull API - Index
 * Date: 10/10/2018
 * Author: Roberto García
 * Node: v8.12.0
 */

// Activate strict mode
"use strict";

// Dependencies
const
    HTTP = require("http"),
    HTTPS = require("https"),
    URL = require("url"),
    STRINGDECODER = require("string_decoder").StringDecoder,
    CONFIG = require("./env.config"),
    FS = require("fs"),
    ARGS = process.argv.slice(2) || [],
    SERVICES = require("./services/api.services");

// Define server type
let serverType = "";

// Check if args exist
let switchServer = ()=>{
    return typeof (ARGS) == 'object' && ARGS instanceof Array && ARGS.length > 0;
};

// Get Type defined in args
let getServerType = () => {
    
    // Set server type
    serverType = switchServer()? ARGS[0] : "";

    // Display server type
    console.log(serverType != ""? `\nArgs detected - server setted to ${serverType} type` : "\nNo args detected - setted default server");
};

// Init Server
let init = async()=>{

    // Exec type definition by args
    await getServerType();
    
    // Instanciate http server
    let httpServer = serverType == "" || serverType == "http"? HTTP.createServer((req, res)=>{
        unifiedServer(req,res);
    }) : void 0;

    // Start http server
    httpServer != void 0 ? httpServer.listen(CONFIG.httpPort,serverListening(serverType)) : null;

    // Instanciate https server
    let httpsServerOptions = serverType == "https" ?{
        "key": FS.readFileSync("./https/key.pem"),
        "cert": FS.readFileSync("./https/cert.pem")
    } : void 0;

    let httpsServer = serverType == "https" ? HTTPS.createServer(httpsServerOptions,(req, res)=>{
        unifiedServer(req,res);
    }) : void 0;

    // Start https server
    httpsServer != void 0 ?httpsServer.listen(CONFIG.httpsPort,serverListening(serverType)) : null;
}

// Define listen function
let serverListening = (type)=>{

    // Log server listening
    console.log(`Listening on ${type == "https"? type : "http"} port ${type == "https"? CONFIG.httpsPort : CONFIG.httpPort} in ${CONFIG.envName} mode`);
};

// Http & https manager
const unifiedServer = (req, res) =>{

    // Get the url and parse
    let parsedUrl = URL.parse(req.url,true),

        // Get the path
        path = parsedUrl.pathname,
        trimmedPath = path.replace(/^\/+|\/+$/g,""),
    
        // Get the querystring as an object
        queryStringObject = parsedUrl.query,

        // Get method
        method = req.method.toLowerCase(),

        // Get headers as an object
        headers = req.headers,
        
        // Get the payload, if any
        decoder = new STRINGDECODER("utf-8"),
        buffer = "";

    
    req.on("data",(data)=>{

        // Write payload
        buffer += decoder.write(data);
    });

    req.on("end",()=>{

        // End payload
        buffer += decoder.end();

        // Choose request handler
        let chosenHandler = SERVICES.router[trimmedPath] !== void 0 ? SERVICES.router[trimmedPath]: SERVICES.handlers.notFound;

        // Construct data object sended to handler
        let data = {
            "trimmedPath": trimmedPath,
            "queryStringObject": queryStringObject,
            "method": method,
            "headers": headers,
            "payload": buffer
        };

        // Route the request to the handler specified
        chosenHandler(data,(statusCode,payload)=>{

            // Use the status code called back by the handler or default code 200
            statusCode = typeof(statusCode) == "number" ? statusCode : 200;

            // Use the payload called back by the handler or default to an empty object
            payload = typeof(payload) == "object" ? payload : {};

            // Convert the payload to string
            let payloadString = JSON.stringify(payload);

            // Return response
            // Set headers
            res.setHeader("Content-Type","application/json");
            res.writeHead(statusCode);
            // End Request
            res.end(payloadString);
            // Log request data - comment if isn't necesary
            requestLog(data,statusCode);
        });
    });
};

// Log the request information
const requestLog = (requestData,statusCode) =>{
    console.log("===Start request information===")
    console.log("Payload: ",requestData.payload);
    console.log("Headers: ",requestData.headers);
    console.log("StatusCode: ",statusCode);
    console.log(`Path: ${requestData.trimmedPath} \nMethod: ${requestData.method} \nQueryString: `,requestData.queryStringObject);
    console.log("===End request information===");
};

// Run server
init();