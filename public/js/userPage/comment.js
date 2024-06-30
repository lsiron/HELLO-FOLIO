document.getElementById('commentForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const comment = document.getElementById('comment').value.slice(0, 20); // 댓글을 최대 20자로 제한
    const password = document.getElementById('password').value;
    const parentId = document.getElementById('parentId').value;
    const submitButton = document.querySelector('.send-button');
    
    // 버튼 비활성화 및 로딩 상태 표시(따닥 방지)
    submitButton.disabled = true;
    submitButton.textContent = '처리 중...';

    
    try {
        const response = await fetch('/userPage/comment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ comment, password, parentId })
        });
    
        const result = await response.json();

        if (!response.ok) throw new Error(result.message || '서버 오류');

        // 댓글 생성 후, 댓글 목록에 추가
        const commentsList = document.getElementById('comments-list');
        const newComment = document.createElement('div');

        // 객체에서 데이터 가져오고, 데이터 기반으로 댓글 목록에 요소 추가하고 클래스 부여 한 뒤, HTML 삽입
        newComment.id = `comment-${result.data._id}`;
        newComment.classList.add('comments-content');
        newComment.innerHTML = `
            <strong>${result.data.writer}:</strong> <span class="comment-text">${result.data.comment}</span>
            <br><small>${new Date(result.data.createdAt).toLocaleString()}</small>
            <button class="edit-button" data-id="${result.data._id}">수정</button>
            <button class="delete-button" data-id="${result.data._id}">삭제</button>
        `;

        // 리스트 맡에 새로운 댓글 추가 그리곤 댓글창과 비밀번호 창 초기화
        commentsList.appendChild(newComment);
        document.getElementById('comment').value = '';
        document.getElementById('password').value = '';

        // 응답에서 총 페이지 수를 가져옴
        const totalPages = result.totalPages;

        // 마지막 페이지로 리디렉션
        window.location.href = `/userPage/${parentId}?page=${totalPages}`;
    } catch (error) {
        alert(error.message);
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = '댓글 작성';
    }
});

// 수정 및 삭제 버튼 이벤트 핸들러
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('edit-button')) {
        const commentId = e.target.dataset.id;
        openEditModal(commentId);
    }
    if (e.target.classList.contains('delete-button')) {
        const commentId = e.target.dataset.id;
        openDeleteModal(commentId);
    }
});

// 수정 모달 열기
function openEditModal(commentId) {
    const editModal = document.getElementById('edit-modal');
    const editComment = document.getElementById('edit-comment');
    const editPassword = document.getElementById('edit-password');
    const commentText = document.querySelector(`#comment-${commentId} .comment-text`).textContent;

    editComment.value = commentText;
    editPassword.value = ''; // 비밀번호 초기화
    editModal.style.display = 'block';

    // 다른 모달 닫기(수정 모달과 삭제 모달이 동시에 열리지 못하게 함)
    const deleteModal = document.getElementById('delete-modal');
    deleteModal.style.display = 'none';

    // 모달 위치 설정(해당 댓글 바로 아래)
    const commentElement = document.getElementById(`comment-${commentId}`);
    commentElement.parentNode.insertBefore(editModal, commentElement.nextSibling);

    document.getElementById('update-comment').onclick = async function() {
        const newComment = editComment.value;
        const password = editPassword.value;
        
        try {
            const response = await fetch(`/userPage/comment/${commentId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ comment: newComment, password })
            });
            const result = await response.json();

            if (!response.ok) throw new Error(result.message || '서버 오류');
            
            document.querySelector(`#comment-${commentId} .comment-text`).textContent = newComment;
            editModal.style.display = 'none';
        } catch (error) {
            alert(error.message);
        }
    };
}

// 수정 모달 닫기 버튼 이벤트
document.getElementById('edit-close').addEventListener('click', function() {
    const editModal = document.getElementById('edit-modal');
    editModal.style.display = 'none';
});

// 수정 및 삭제 버튼 이벤트 핸들러
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('edit-button')) {
        const commentId = e.target.dataset.id;
        openEditModal(commentId);
    }
    if (e.target.classList.contains('delete-button')) {
        const commentId = e.target.dataset.id;
        openDeleteModal(commentId);
    }
});

// 삭제 모달 열기
function openDeleteModal(commentId) {
    const deleteModal = document.getElementById('delete-modal');
    const deletePassword = document.getElementById('delete-password');
    deletePassword.value = ''; // 비밀번호 초기화
    deleteModal.style.display = 'block';
    document.getElementById('delete-comment-id').value = commentId;

    // 다른 모달 닫기(수정 모달과 삭제 모달이 동시에 열리지 못하게 함)
    const editModal = document.getElementById('edit-modal');
    editModal.style.display = 'none';

    // 모달 위치 설정(해당 댓글 바로 아래)
    const commentElement = document.getElementById(`comment-${commentId}`);
    commentElement.parentNode.insertBefore(deleteModal, commentElement.nextSibling);

    document.getElementById('delete-comment').onclick = async function() {
        const password = deletePassword.value;
        const commentId = document.getElementById('delete-comment-id').value;
        
        try {
            const response = await fetch(`/userPage/comment/${commentId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            });
            const result = await response.json();
            
            if (!response.ok) throw new Error(result.message || '서버 오류');
            
            document.getElementById(`comment-${commentId}`).remove();
            deleteModal.style.display = 'none';
        } catch (error) {
            alert(error.message);
        }
    };
}

// 삭제 모달 닫기 버튼 이벤트
document.getElementById('delete-close').addEventListener('click', function() {
    const deleteModal = document.getElementById('delete-modal');
    deleteModal.style.display = 'none';
});