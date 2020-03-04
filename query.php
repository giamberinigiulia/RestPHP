<?php
//parametri connessione database
$_dbHostname = "localhost:3306";
$_dbName = "FI_ITIS_MEUCCI";
$_dbUsername = "root";
$_dbPassword = "password";
$_con = new PDO("mysql:host=$_dbHostname;dbname=$_dbName", $_dbUsername, $_dbPassword);
$_con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$_con->exec('SET NAMES utf8');

if($_GET['id']) {
    // se passato il parametri id cerca per id
    $id = $_GET['id'];
    $sql = "SELECT * FROM student WHERE id=:id";
    $stmt = $_con->prepare($sql);
    $params = [
        'id' => $id
    ];
    $stmt->execute($params);
    $data = $stmt->fetch(\PDO::FETCH_ASSOC);
} else {
    // se non passato il parametri id ritorna tutta la tabella
    $sql = "SELECT * FROM student";
    $stmt = $_con->prepare($sql);
    $stmt->execute();
    $data = $stmt->fetchAll(\PDO::FETCH_ASSOC);
}
$js_encode = json_encode(array($data), true);

//output
header('Content-Type: application/json');
echo $js_encode;

?>
