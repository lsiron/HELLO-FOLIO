class ServiceError extends Error {
    constructor(message, statusCode, renderPage = null) {
      super(message);
      this.name = 'ServiceError';
      this.statusCode = statusCode;
      this.renderPage = renderPage;
    }
  }
  
module.exports = ServiceError;