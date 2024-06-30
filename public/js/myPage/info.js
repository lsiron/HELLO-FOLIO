document.getElementById('edit-intro-btn').addEventListener('click', () => {
    document.getElementById('intro-display').style.display = 'none';
    document.getElementById('intro-edit').style.display = 'block';
  });
  
  document.getElementById('cancel-intro-btn').addEventListener('click', () => {
    document.getElementById('intro-edit').style.display = 'none';
    document.getElementById('intro-display').style.display = 'block';
  });
  
  document.getElementById('save-intro-btn').addEventListener('click', async () => {
    const content = document.getElementById('intro-input').value.trim(); // Trim to handle spaces
    
    // 자기소개 길이 제한
    if (content.length > 20) {
      alert('자기소개는 최대 20글자까지 입력할 수 있습니다.');
      return;
    }
  
    try {
      let response;
      if (content) {
        // 입력된 자기소개가 있는 경우 업데이트
        if (userIntroduction) {
          response = await fetch(`/myPage/info/${userId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content }),
          });
        } else {
          response = await fetch('/myPage/info', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content }),
          });
        }
      } else {
        // 입력된 자기소개가 없는 경우, 기본 메시지로 처리
        document.getElementById('intro-text').innerText = '자기소개를 입력해 주세요.';
        document.getElementById('intro-edit').style.display = 'none';
        document.getElementById('intro-display').style.display = 'block';
        return;
      }
  
      const result = await response.json();
      if (response.ok) {
        document.getElementById('intro-text').innerText = result.data.content;
        document.getElementById('intro-edit').style.display = 'none';
        document.getElementById('intro-display').style.display = 'block';
      } else {
        alert(result.error || '오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('오류가 발생했습니다.');
    }
  });