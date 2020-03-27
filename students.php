<?php
    $requestMethod = $_SERVER["REQUEST_METHOD"];
	include('./class/Student.php');
	$student = new Student();
    switch($requestMethod)
    {
        case 'GET':
			$pathArray = explode('/', $_SERVER['REQUEST_URI']);
			if(in_array("?",$pathArray))
			{
				$path = explode ('?', $pathArray[2]);
				if($path[1])
				{
					$p = explode('=',$path[1]);
					$id = $p[1];
					$student->_id=$id;
					$data=$student->one();
				}
			}
			else
            {
				if($pathArray[3])
				{
					$id = $pathArray[3];
					$student->_id=$id;
					$data=$student->one();
				}
				else
				{
					$data = $student->lista();
				}
			}
            if(!empty($data)) 
			{
			  $js_encode = json_encode(array('status'=>TRUE, 'studentInfo'=>$data), true);
			} 
			else 
			{
			  $js_encode = json_encode(array('status'=>FALSE, 'message'=>'There is no record yet.'), true);
			}
            header('Content-Type: application/json');
            echo $js_encode;
            break;
        case 'POST':
			$JSON=file_get_contents('php://input');
			$i=json_decode($JSON,true);
			
			$student->_name = $i["name"];
			$student->_surname = $i["surname"];
			$student->_sidiCode = $i["sidicode"];
			$student->_taxCode = $i["taxcode"];

			$data = $student->inserimento();
			$js_encode = json_encode(array('status'=>TRUE, 'studentInfo'=>$data), true);

			header('Content-Type: application/json');
			echo $js_encode;			
            break;
		case 'DELETE':
			$pathArray = explode('/', $_SERVER['REQUEST_URI']);
			if($pathArray[3])
            {
                $id = $pathArray[3];
                $student->_id=$id;
				$data=$student->eliminazione();
            }
            if(!empty($data)) 
			{
			  $js_encode = json_encode(array('status'=>TRUE, 'studentInfo'=>$data), true);
			} 
			else 
			{
			  $js_encode = json_encode(array('status'=>FALSE, 'message'=>'Opss'), true);
			}
            header('Content-Type: application/json');
            echo $js_encode;
            break;
		case 'PUT':
		
			$pathArray = explode('/', $_SERVER['REQUEST_URI']);
			if($pathArray[3])
            {
                $id = $pathArray[3];
                $student->_id=$id;
				
				$JSON=file_get_contents('php://input');
				$i=json_decode($JSON,true);
				
				if($i["name"])
					$student->_name =  $i["name"];
				else 
					$student->_name = null;
				if($i["surname"])
					$student->_surname =  $i["surname"];
				else 
					$student->_surname = null;
				if($i["sidicode"])
					$student->_sidiCode =  $i["sidicode"];
				else 
					$student->_sidiCode = null;
				if($i["taxcode"])
					$student->_taxCode =  $i["taxcode"];
				else 
					$student->_taxCode = null;
				
				$data=$student->aggiornamento();
            }
			if(!empty($data)) 
			{
			  $js_encode = json_encode(array('status'=>TRUE, 'studentInfo'=>$data), true);
			} 
			else 
			{
			  $js_encode = json_encode(array('status'=>FALSE, 'message'=>'Opss'), true);
			}
			header('Content-Type: application/json');
            echo $js_encode;
            break;
		case 'PATCH':
			
			$pathArray = explode('/', $_SERVER['REQUEST_URI']);
			if($pathArray[3])
            {
                $id = $pathArray[3];
                $student->_id=$id;
				
				$JSON=file_get_contents('php://input');
				$i=json_decode($JSON,true);
				
				if(isset($i["name"]))
					$student->_name =  $i["name"];
				if(isset($i["surname"]))
					$student->_surname =  $i["surname"];
				if(isset($i["sidicode"]))
					$student->_sidiCode =  $i["sidicode"];
				if(isset($i["taxcode"]))
					$student->_taxCode =  $i["taxcode"];
				
				$data=$student->aggiornamento_parziale();
            }
			if(!empty($data)) 
			{
			  $js_encode = json_encode(array('status'=>TRUE, 'studentInfo'=>$data), true);
			} 
			else 
			{
			  $js_encode = json_encode(array('status'=>FALSE, 'message'=>'Opss'), true);
			}
			header('Content-Type: application/json');
            echo  $js_encode;
			break;
		
    };
?>