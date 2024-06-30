document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    signupForm.addEventListener('submit', function(event) {
      event.preventDefault(); // 페이지 새로고침 방지
  
      // 기존 오류 메시지 초기화
      clearErrors();
  
      // 필드 값 가져오기
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();
      const confirmPassword = document.getElementById('confirmPassword').value.trim();
  
      // 유효성 검사
      let isValid = true;
  
      if (name.length < 2) {
        showError('이름을 두 글자 이상 입력해주세요.', 'name-error');
        isValid = false;
      }
  
      if (!isValidEmail(email)) {
        showError('이메일 형식이 올바르지 않습니다.', 'email-error');
        isValid = false;
      }
  
      if (password.length < 4) {
        showError('비밀번호는 4자 이상이어야 합니다.', 'password-error');
        isValid = false;
      }
  
      if (password !== confirmPassword) {
        showError('비밀번호가 일치하지 않습니다.', 'confirmPassword-error');
        isValid = false;
      }
  
      // 유효성 검사 성공 시 폼 제출
      if (isValid) {
        signupForm.submit();
      }
    });
  
    function showError(message, errorId) {  
      const errorElement = document.getElementById(errorId);
      errorElement.textContent = message;
      errorElement.style.color = 'red'; // 에러 메시지를 빨간색으로 표시
    }
  
    function clearErrors() {
      const errorMessages = document.querySelectorAll('.error-message');
      errorMessages.forEach(function(element) {
        element.textContent = '';
      });
    }
  });

  function isValidEmail(email) {  // 이메일 형식 체크
    return /\S+@\S+\.\S+/.test(email);
  }
  