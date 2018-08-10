if (window.__env === undefined) {
    throw new Error('Environment variable \'window.__env\' is not defined. Please, make sure that _env.js is included to the document.');
} 

let envConfig = window.__env;

export default envConfig;