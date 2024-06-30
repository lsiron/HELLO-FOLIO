document.getElementById('resetPasswordForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    try {
        const response = await fetch(`/reset-password/${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password, confirmPassword })
        });

        if (!response.ok) {
            throw new Error('서버 오류');
        }

        const result = await response.json();
        alert(result.message);

        if (result.success) {
            window.location.href = '/login';
        }
    } catch (error) {
        alert('요청 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
});