document.addEventListener('DOMContentLoaded', function() {
    const editNameBtn = document.getElementById('edit-name-btn');
    const modal = document.getElementById('name-change-modal');
    const closeModalBtn = document.querySelector('.close');
    const changeNameBtn = document.getElementById('change-name-btn');
    const newNameInput = document.getElementById('new-name-input');
    
    // Open modal
    editNameBtn.addEventListener('click', () => {
      modal.style.display = 'block';
    });
  
    // Close modal
    closeModalBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  
    // Close modal when clicking outside of the modal
    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  
    // Handle name change
    changeNameBtn.addEventListener('click', async () => {
      const newName = newNameInput.value.trim();
      if (!newName) {
        alert('새 이름을 입력하세요.');
        return;
      }
      if (confirm('이름을 변경하시겠습니까?')) {
        try {
          const response = await fetch(`/myPage/name/${userId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: newName }),
          });
  
          if (response.ok) {
            const data = await response.json();
            document.querySelector('.user-name-email div:first-child').textContent = data.name;
            alert('이름이 성공적으로 변경되었습니다.');
            modal.style.display = 'none';
            location.reload();  // 페이지 새로고침 추가
          } else {
            alert('이름 변경에 실패했습니다.');
          }
        } catch (error) {
          alert('오류가 발생했습니다.');
        }
      }
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    const editPasswordBtn = document.getElementById('edit-password-btn');
    const passwordModal = document.getElementById('password-change-modal');
    const closePasswordModalBtn = document.querySelector('#password-change-modal .close');
    const passwordChangeForm = document.getElementById('password-change-form');

    // 비밀번호 모달 열기
    editPasswordBtn.addEventListener('click', () => {
      passwordModal.style.display = 'block';
    });

    // 비밀번호 모달 닫기
    closePasswordModalBtn.addEventListener('click', () => {
      passwordModal.style.display = 'none';
    });

    // 외부 클릭 시 모달 닫기
    window.addEventListener('click', (event) => {
      if (event.target === passwordModal) {
        passwordModal.style.display = 'none';
      }
    });

    // 비밀번호 변경
    passwordChangeForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const currentPassword = document.getElementById('current-password').value;
      const newPassword = document.getElementById('new-password').value;
      const confirmPassword = document.getElementById('confirm-password').value;

      if (newPassword !== confirmPassword) {
        alert('새 비밀번호가 일치하지 않습니다.');
        return;
      }

      try {
        const response = await fetch(`/myPage/password/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ currentPassword, newPassword }),
        });

        if (response.ok) {
          alert('비밀번호가 변경되었습니다. 다시 로그인해 주세요.');
          window.location.href = '/login';
        } else {
          const errorData = await response.json();
          alert(`${errorData.error}`);
        }
      } catch (error) {
        alert('비밀번호 변경 중 에러가 발생했습니다.');
      }
    });
  });