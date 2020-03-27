<?php
    $requestMethod = $_SERVER["REQUEST_METHOD"];
	include('./class/Student_Class.php');
	$student_class  = new student_class ();
    switch($requestMethod)
    {
        case 'GET':
            $pathArray = explode('/', $_SERVER['REQUEST_URI']);
            $path = explode ('?', $pathArray[2]);
			if($path[1])
            {
				$p = explode('=',$path[1]);
                if($p[0]==="id")
                {
                    $id = $p[1];
                    $student_class ->_id=$id;
                    $data=$student_class->one();
                }
                else
                {
                    $id_class = $p[1];
                    $student_class ->_id_class=$id_class;
                    $data=$student_class->student_for_class();
                }
            }
            else
            {
                $data = $student_class ->lista();
            }
            if(!empty($data)) 
			{
			  $js_encode = json_encode(array('status'=>TRUE, 'student_classInfo'=>$data), true);
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
			
			$student_class ->_id_student = $i["id_student"];
			$student_class ->_id_class = $i["id_class"];

			$data = $student_class->inserimento();
			$js_encode = json_encode(array('status'=>TRUE, 'student_classInfo'=>$data), true);

            header('Content-Type: application/json');
            echo $js_encode;	
            break;
		case 'DELETE':
			$pathArray = explode('/', $_SERVER['REQUEST_URI']);
			if($pathArray[3])
            {
                $id = $pathArray[3];
                $student_class->_id=$id;
                echo $id;
				$data=$student_class->eliminazione();
            }
            if(!empty($data)) 
			{
			  $js_encode = json_encode(array('status'=>TRUE, 'student_classInfo'=>$data), true);
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
                $student_class->_id=$id;
				
				$JSON=file_get_contents('php://input');
				$i=json_decode($JSON,true);
				
				if($i["id_student"])
					$student_class->_id_student =  $i["id_student"];
				else 
                    $student_class->_id_student = null;
                if($i["id_class"])
					$student_class->_id_class =  $i["id_class"];
				else 
                    $student_class->_id_class = null;
				
				$data=$student_class->aggiornamento();
            }
			if(!empty($data)) 
			{
			  $js_encode = json_encode(array('status'=>TRUE, 'student_classInfo'=>$data), true);
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
                $student_class->_id=$id;
				
				$JSON=file_get_contents('php://input');
				$i=json_decode($JSON,true);
				
				if(isset($i["id_student"]))
                    $student_class->_id_student =  $i["id_student"];
				if(isset($i["id_class"]))
                    $student_class->_id_class =  $i["id_class"];
				
				$data=$student_class->aggiornamento_parziale();
            }
			if(!empty($data)) 
			{
			  $js_encode = json_encode(array('status'=>TRUE, 'student_classInfo'=>$data), true);
			} 
			else 
			{
			  $js_encode = json_encode(array('status'=>FALSE, 'message'=>'Opss'), true);
			}
            header('Content-Type: application/json');
            echo $js_encode;
			break;
		
    };
?>