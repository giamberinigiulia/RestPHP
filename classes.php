<?php
    $requestMethod = $_SERVER["REQUEST_METHOD"];
	include('./class/Class.php');
	$classe = new classe();
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
					$classe->_id=$id;
					$data=$classe->one();
				}
            }
            else
            {
				if(count($pathArray)>3)
				{
					$id = $pathArray[3];
					$classe->_id=$id;
					$data=$classe->one();
				}
				else
				{
					$data = $classe->lista();
				}
			}
            if(!empty($data)) 
			{
				$js_encode = json_encode(array('status'=>TRUE, 'classeInfo'=>$data), true);
			  	//$js_encode = json_encode(array($data), true);
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
			
			$classe->_year = $i["year"];
			$classe->_section = $i["section"];
			
			$data = $classe->inserimento();
			$js_encode = json_encode(array('status'=>TRUE, 'classeInfo'=>$data), true);

			header('Content-Type: application/json');
			echo $js_encode;			
            break;
		case 'DELETE':
			$pathArray = explode('/', $_SERVER['REQUEST_URI']);
			if($pathArray[3])
            {
                $id = $pathArray[3];
                $classe->_id=$id;
				$data=$classe->eliminazione();
            }
            if(!empty($data)) 
			{
			  $js_encode = json_encode(array('status'=>TRUE, 'classeInfo'=>$data), true);
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
                $classe->_id=$id;
				
				$JSON=file_get_contents('php://input');
				$i=json_decode($JSON,true);
				
				if($i["year"])
					$classe->_year =  $i["year"];
				else 
					$classe->_year = null;
				if($i["section"])
					$classe->_section =  $i["section"];
				else 
					$classe->_section = null;
				
				$data=$classe->aggiornamento();
            }
			if(!empty($data)) 
			{
			  $js_encode = json_encode(array('status'=>TRUE, 'classInfo'=>$data), true);
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
                $classe->_id=$id;
				
				$JSON=file_get_contents('php://input');
				$i=json_decode($JSON,true);
				
				if(isset($i["year"]))
					$classe->_year =  $i["year"];
				if(isset($i["section"]))
					$classe->_section =  $i["section"];
				
				$data=$classe->aggiornamento_parziale();
            }
			if(!empty($data)) 
			{
			  $js_encode = json_encode(array('status'=>TRUE, 'classeInfo'=>$data), true);
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