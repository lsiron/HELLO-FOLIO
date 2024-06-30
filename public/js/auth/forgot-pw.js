document.getElementById('forgotPasswordForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const submitButton = document.querySelector('.send-button');
    
    // 버튼 비활성화 및 로딩 상태 표시(따닥 방지)
    submitButton.disabled = true;
    submitButton.textContent = '처리 중...';

    try {
        const response = await fetch('/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });

        if (!response.ok) {
            throw new Error('서버 오류');
        }

        const result = await response.json();
        alert(result.message);
    } catch (error) {
        alert('요청 중 오류가 발생했습니다. 다시 시도해주세요.');
        // 에러 발생 시 버튼 재활성화 및 원래 텍스트로 변경
        submitButton.disabled = false;
        submitButton.textContent = '비밀번호 재설정 링크 보내기';
    }
});