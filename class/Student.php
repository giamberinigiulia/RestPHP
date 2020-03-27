<?php
/**
 * @package Student class
 *
 * @author 
 *   
 */
 
include("DBConnection.php");
class Student 
{
    protected $db;
    public $_id;
    public $_name;
    public $_surname;
    public $_sidiCode;
    public $_taxCode;
 
    public function __construct() {
        $this->db = new DBConnection();
        $this->db = $this->db->returnConnection();
    }
 
	public function lastID()
	{
		try {
			$sql = "SELECT id FROM student ORDER BY id DESC LIMIT 1";
			$stmt = $this->db->prepare($sql);
			$stmt->execute();
			$result = $stmt->fetch(\PDO::FETCH_ASSOC);
			return $result;
		} catch (Exception $e) {
		    
			die("Oh noes! There's an error in the query!");
			
		}
	}

    //insert
    public function inserimento() {
		try {
    		$sql = 'INSERT INTO student (name, surname, sidi_code, tax_code)  VALUES (:name, :surname, :sidiCode, :taxCode)';
    		$data = [
			    'name' => $this->_name,
			    'surname' => $this->_surname,
			    'sidiCode' => $this->_sidiCode,
			    'taxCode' => $this->_taxCode,
			];
	    	$stmt = $this->db->prepare($sql);
	    	$stmt->execute($data);
			
			return $this->lastID();
 
		} catch (Exception $e) {
    		die("Oh noes! There's an error in the query!" . $e);
		}
 
    }
   
	

    // getAll 
    public function lista() {
    	try {
    		$sql = "SELECT * FROM student";
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
    		$sql = "SELECT * FROM student WHERE id=:id";
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
    		$sql = "DELETE FROM student WHERE id=:id";
		    $stmt = $this->db->prepare($sql);
		    $data = [
		    	'id' => $this->_id
			];
		    $stmt->execute($data);
            return "Eliminazione avvenuta";
		} catch (Exception $e) {
			die("Oh noes! There's an error in the query!");
			
		}
    }

    // put TODO
    public function aggiornamento() 
	{
		try {
    		$sql = "UPDATE student SET name=:name, surname=:surname, sidi_code=:sidiCode, tax_code=:taxCode WHERE id=:id";
		    $stmt = $this->db->prepare($sql);
		    $data = [
		    	'id' => $this->_id,
				'name' => $this->_name,
				'surname' => $this->_surname,
				'sidiCode' => $this->_sidiCode,
				'taxCode' => $this->_taxCode
			];
		    $stmt->execute($data);
            return "Aggiornamento effettuato";
		} catch (Exception $e) {
		    
			die("Oh noes! There's an error in the query!" . $e);
			
		}
    }
 
    // patch TODO
    public function aggiornamento_parziale() 
	{
		try {
    		$sql = "UPDATE student SET ";
			if($this->_name)
				$sql .= " name=:name,";
			if($this->_surname)
				$sql .= " surname=:surname,";
			if($this->_sidiCode)
				$sql .=" sidi_code=:sidiCode,";
			if($this->_taxCode)
				$sql .=" tax_code=:taxCode,";
			
			//rimozione dell'ultima virgola
			$lenght= strlen($sql);
			$sql[$lenght-1]=" ";
			
			$sql .= " WHERE id=:id";
		    $stmt = $this->db->prepare($sql);
		    $data = [
		    	'id' => $this->_id
			];
			if($this->_name)
				$data["name"] = $this->_name;
			if($this->_surname)
				$data["surname"] = $this->_surname;
			if($this->_sidiCode)
				$data["sidiCode"] = $this->_sidiCode;
			if($this->_taxCode)
				$data["taxCode"] = $this->_taxCode;
		    $stmt->execute($data);
            return "Aggiornamento effettuato";
		} catch (Exception $e) {
		    
			die("Oh noes! There's an error in the query!");
			
		}
    }
 
}
?>