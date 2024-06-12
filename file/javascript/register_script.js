function validatePasswords() {
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        document.getElementById('confirmPassword').setCustomValidity('비밀번호가 일치하지 않습니다.');
        return false; // 폼 제출을 막습니다.
    }
    var formData = new FormData();
    formData.append('name', document.getElementById('이름').value);
    formData.append('id', document.getElementById('아이디').value);
    formData.append('password', password);

    // HTTP POST 요청 보내기
    sendFormData(formData);

}

function sendFormData(formData) {
    fetch('/user_create', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            console.log('PHP에서 받은 응답:', data);
            // 원하는 작업을 수행 (예: 응답 처리)
        })
        .catch(error => {
            console.error('오류 발생:', error);
        });
}

function handleButtonClick() {
    // 이 부분에서 someCondition을 설정하고 처리합니다.
    let someCondition = true; // 예시로 true로 설정합니다.

    if (someCondition) {
        history.back(-1); // 뒤로가기 동작
    }
    // 이벤트의 기본 동작을 취소하지 않습니다.
}