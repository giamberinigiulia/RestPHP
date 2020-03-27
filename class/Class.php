<?php
/**
 * @package Student class
 *
 * @author 
 *   
 */
 
include("DBConnection.php");
class Classe 
{
    protected $db;
    public $_id;
    public $_year;
    public $_section;
 
    public function __construct() {
        $this->db = new DBConnection();
        $this->db = $this->db->returnConnection();
    }
 
	public function lastID()
	{
		try {
			$sql = "SELECT id FROM class ORDER BY id DESC LIMIT 1";
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
    		$sql = 'INSERT INTO class (year, section)  VALUES (:year, :section)';
    		$data = [
			    'year' => $this->_year,
			    'section' => $this->_section,
			];
	    	$stmt = $this->db->prepare($sql);
	    	$stmt->execute($data);

            return $this->lastID();
 
		} catch (Exception $e) {
    		die("Oh noes! There's an error in the query!");
		}
 
    }
   
    // getAll 
    public function lista() {
    	try {
    		$sql = "SELECT * FROM class ORDER BY section ASC";
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
    		$sql = "SELECT * FROM class WHERE id=:id";
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
    		$sql = "DELETE FROM class WHERE id=:id";
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
    		$sql = "UPDATE class SET year=:year, section=:section WHERE id=:id";
		    $stmt = $this->db->prepare($sql);
		    $data = [
		    	'id' => $this->_id,
				'year' => $this->_year,
				'section' => $this->_section
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
    		$sql = "UPDATE class SET ";
			if($this->_year)
				$sql .= " year=:year,";
			if($this->_section)
				$sql .= " section=:section,";
			
			//rimozione dell'ultima virgola
			$lenght= strlen($sql);
			$sql[$lenght-1]=" ";
			
			$sql .= " WHERE id=:id";
		    $stmt = $this->db->prepare($sql);
		    $data = [
		    	'id' => $this->_id
			];
			if($this->_year)
				$data["year"] = $this->_year;
			if($this->_section)
				$data["section"] = $this->_section;
		    $stmt->execute($data);
            return "Aggiornamento effettuato";
		} catch (Exception $e) {
		    
			die("Oh noes! There's an error in the query!");
			
		}
    }
 
}
?>