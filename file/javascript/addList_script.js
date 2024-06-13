
document.getElementById('save-button').addEventListener('click', function () {
    // 저장 버튼 클릭 시 실행할 코드
    addTodo(); // 예를 들어, 위에서 정의한 addTodo 함수 호출
});

async function addTodo() {
    const formData = new FormData(this);
    const data = {
        date: formData.get('date'),
        title: formData.get('title'),
        cate: formData.get('cate')
    };

    try {
        const response = await fetch('/add-todo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to add todo');
        }

        // 성공적으로 추가된 경우, 메인 화면에 일정 추가
        const todoListDiv = document.getElementById('todoList');
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item'); // 필요에 따라 클래스 추가
        todoItem.innerHTML = '<p><strong>Date:</strong> ' + data.date
            + '</p>' + '<p><strong>Title:</strong> ' + data.title + '</p>';
        todoListDiv.appendChild(todoItem);

        // 추가 후 입력 필드 초기화
        document.getElementById('date').value = '';
        document.getElementById('title').value = '';
        document.getElementById('cate').value = '';
    } catch (error) {
        console.error('Error adding todo:', error);
    }
}

document.getElementById('todo-section').addEventListener('submit', function (event) {
    event.preventDefault();
    addTodo();
});