<?php
$conn = mysqli_connect(
    'localhost',
    'root',
    'oohboksoong2',
    'todoDB');

    $filtered = array(
        'name' => mysqli_real_escape_string($conn, $_POST['name']),
        'id' => mysqli_real_escape_string($conn, $_POST['id']),
        'password' => mysqli_real_escape_string($conn, $_POST['password'])
    );

$sql = "
    INSERT INTO user VALUES('{$filtered['name']}',
                            '{$filtered['id']}',
                            '{$filtered['password']}',
                            NOW())
";
$result = mysqli_query($conn, $sql);
if($result === false) {
    echo '저장하는 과정에서 문제가 생겼습니다. 관리자에게 문의해주세요';
    error_log(mysqli_error($conn));
}
?>