document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // 페이지 새로고침 방지

        // 기존 오류 메시지 초기화
        clearErrors();

        // 이메일 유효성 검사
        const email = document.getElementById('email').value;
        if (!isValidEmail(email)) {
            showError('이메일 형식이 올바르지 않습니다.', 'email-error');
            return;
        }

        // 비밀번호 길이 검사
        const password = document.getElementById('password').value;
        if (password.length < 4) {
            showError('비밀번호를 4글자 이상 입력하세요.', 'password-error');
            return;
        }

         // 유효성 검사 성공 시 로그인
        // 로그인 성공 시 애니메이션 실행
        const overlay = document.getElementById('animationOverlay');
        
        setTimeout(function() {
            overlay.classList.add('active'); // 애니메이션 클래스 추가

            setTimeout(function() {
                loginForm.submit(); // 실제 폼 제출
            }, 500); // 애니메이션 지속 시간에 맞춰 타이밍 조절
        }, 0); // 즉시 실행되도록 변경조절
    });

    function showError(message, errorId) {  
        const errorElement = document.getElementById(errorId);
        errorElement.textContent = message;
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
