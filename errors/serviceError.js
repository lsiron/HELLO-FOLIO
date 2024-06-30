// 서비스 에러 핸들러


// renderPage는 평소에는 빈 상태로 특정 에러시에 렌더링 페이지 지정 가능
class ServiceError extends Error {
    constructor(message, statusCode, renderPage = null) {
      super(message);
      this.name = 'ServiceError';
      this.statusCode = statusCode;
      this.renderPage = renderPage;
    }
  }
  
  module.exports = ServiceError;