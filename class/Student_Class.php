<?php
/**
 * @package Student class
 *
 * @author 
 *   
 */
 
include("DBConnection.php");
class student_class 
{
    protected $db;
    public $_id;
    public $_id_student;
    public $_id_class;
 
    public function __construct() {
        $this->db = new DBConnection();
        $this->db = $this->db->returnConnection();
    }
 
    //insert
    public function inserimento() {
		try {
    		$sql = 'INSERT INTO student_class (id_student, id_class)  VALUES (:id_student, :id_class)';
    		$data = [
			    'id_student' => $this->_id_student,
			    'id_class' => $this->_id_class,
			];
	    	$stmt = $this->db->prepare($sql);
	    	$stmt->execute($data);
			$status = $stmt->rowCount();
            return $status;
 
		} catch (Exception $e) {
    		die("Oh no! Stai cercando di aggiungere uno studente giaà assegnato ad una classe, ad un'altra! Riprova con un nuovo utente");
		}
    }
   
    // getAll 
    public function lista() {
    	try {
    		$sql = "SELECT * FROM student_class";
		    $stmt = $this->db->prepare($sql);
 
		    $stmt->execute();
		    $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);
            return $result;
		} catch (Exception $e) {
		    die("Oh noes! There's an error in the query!");
		}
    }

    // getOne
    public function one() {
    	try {
    		$sql = "SELECT * FROM student_class WHERE id=:id";
		    $stmt = $this->db->prepare($sql);
		    $data = [
		    	'id' => $this->_id
			];
		    $stmt->execute($data);
		    $result = $stmt->fetch(\PDO::FETCH_ASSOC);
            return $result;
		} catch (Exception $e) {
		    die("Oh noes! There's an error in the query!");
		}
    }
 
    // delete TODO
    public function eliminazione() 
	{
		try {
    		$sql = "DELETE FROM student_class WHERE id=:id";
		    $stmt = $this->db->prepare($sql);
		    $data = [
		    	'id' => $this->_id
			];
		    $stmt->execute($data);
            return "Eliminazione avvenuta";
		} catch (Exception $e) {
		    
			echo $e;
			die("Oh noes! There's an error in the query!");
			
		}
    }

    // put TODO
    public function aggiornamento() 
	{
		try {
    		$sql = "UPDATE student_class SET id_student=:id_student, id_class=:id_class WHERE id=:id";
		    $stmt = $this->db->prepare($sql);
		    $data = [
		    	'id' => $this->_id,
				'id_student' => $this->_id_student,
				'id_class' => $this->_id_class
			];
		    $stmt->execute($data);
            return "Aggiornamento effettuato";
		} catch (Exception $e) {
		    
			die("Oh noes! There's an error in the query!");
			
		}
    }
 
    // patch TODO
    public function aggiornamento_parziale() 
	{
		try {
    		$sql = "UPDATE student_class SET ";
			if($this->_id_student)
				$sql .= " id_student=:id_student,";
			if($this->_id_class)
				$sql .= " id_class=:id_class,";
			
			//rimozione dell'ultima virgola
			$lenght= strlen($sql);
			$sql[$lenght-1]=" ";
			
			$sql .= " WHERE id=:id";
		    $stmt = $this->db->prepare($sql);
		    $data = [
		    	'id' => $this->_id
			];
			if($this->_id_class)
				$data["id_class"] = $this->_id_class;
			if($this->_id_student)
                $data["id_student"] = $this->_id_student;
            $stmt->execute($data);
            return "Aggiornamento effettuato";
		} catch (Exception $e) {
		    
			die("Oh noes! There's an error in the query!".$e);
			
		}
    }
    public function student_for_class()
    {
        try {

/*
            $cdata=DB::table('student')
                    ->join('student_class', 'student.id', '=', 'student_class.id_student')
                    ->select('student.*')
                    ->where('student_class.id_class',$this->_id_class)
                    ->get();
        
            echo json_encode($cdata);
        */

    		$sql = "SELECT S.* FROM student as S inner join student_class as SC on S.id=SC.id_student where SC.id_class=:id_class";
            $stmt = $this->db->prepare($sql);
            $data = [
		    	'id_class' => $this->_id_class
            ];
		    $stmt->execute($data);
		    $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);
            return $result;
		} catch (Exception $e) {
		    die("Oh noes! There's an error in the query!".$e);
		}
    }
}
?>