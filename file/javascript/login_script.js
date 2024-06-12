document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const id = document.getElementById('id').value;
    const password = document.getElementById('password').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, password })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = '../html/todo-main.html';
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});