class CustomErrorHandler extends Error {
    constructor(statusCode, message) {
      super();
      this.statusCode = statusCode;
      this.message = message; // Always store the message as an object
    }
  
}
  
module.exports = CustomErrorHandler