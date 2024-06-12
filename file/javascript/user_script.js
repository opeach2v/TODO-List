document.addEventListener('DOMContentLoaded', function () {
    fetch('/user')
        .then(response => response.json())
        .then(data => {
            if (data.id) {
                document.getElementById('id').textContent = data.id;
            } else {
                alert('Unauthorized access. Please log in.');
                window.location.href = 'todo-login.html';
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});