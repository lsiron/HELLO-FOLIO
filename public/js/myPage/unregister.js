function confirmDeactivation() {
  const userEmailElement = document.querySelector('[data-user-email]');
  const userEmail = userEmailElement.getAttribute('data-user-email');
  const inputEmail = prompt("정말로 탈퇴하시겠습니까? 이메일을 입력해주세요:");

  if (inputEmail === userEmail) {
    return true; // 폼 제출
  } else {
    alert("이메일이 일치하지 않습니다. 회원탈퇴가 취소되었습니다.");
    return false; // 폼 제출 방지
  }
}