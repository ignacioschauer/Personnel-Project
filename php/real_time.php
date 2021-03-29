<?php 
include ('config.php');
date_default_timezone_set('America/Chicago');
$current_date = date('Y-m-d H:i:s');

if(isset($_GET['get_dropdown_val'])){

	if($_GET['get_dropdown_val'] == 'location_table'){

		$query = 'SELECT id,name,status,l_time as time_check from location where status != 0';

	}else if($_GET['get_dropdown_val'] == 'Department_table'){

		$query = 'SELECT 
			department.id as id,
	        department.name as  name,
	        department.locationID as locationID,
	        location.name as location_name,
	        department.status as status,d_time as time_check
	        from department inner join location on location.id=department.locationID where department.status != 0';

	}else{

		$query = 'SELECT p.id , p.lastName, p.firstName, p.jobTitle, p.email, p.departmentId, d.name as department, l.name as location , p.status as status,p_time as time_check
				FROM personnel 
		        p inner JOIN department d ON (d.id = p.departmentID) 
		        inner JOIN location l ON (l.id = d.locationID) 
		        where p.status != 0';
	}

	$result = $conn->query($query);
   	$data = [];

	while ($row = mysqli_fetch_assoc($result)) {

		
		if($row['time_check'] >= $current_date){
			array_push($data, $row);
		}
		else{

			if($_GET['get_dropdown_val'] == 'location_table'){
				
				if($row['status'] == "2")
					$query = 'DELETE FROM location WHERE id='.$row['id'] ;
				else
					$query = 'update location set status = 0 where id='.$row['id'];

			}else if($_GET['get_dropdown_val'] == 'Department_table'){

				if($row['status'] == "2")
					$query = 'DELETE FROM department WHERE id='.$row['id'] ;
				else
					$query = 'update department set status = 0 where id='.$row['id'];

			}
			else{ 

				if($row['status'] == "2")
					$query = 'DELETE FROM personnel WHERE id='.$row['id'] ;
				else
					$query = 'update personnel set status = 0 where id='.$row['id'];

			}
		    
			$result = $conn->query($query);
		}

		// if($row['status'] == "3"){
		// 	if($_GET['get_dropdown_val'] == 'location_table'){
		// 		$query = 'update location set status = 0 where id='.$row['id'];

		// 	}else if($_GET['get_dropdown_val'] == 'Department_table'){
		// 		$query = 'update department set status = 0 where id='.$row['id'];

		// 	}
		// 	else{ 
		// 		$query = 'update personnel set status = 0 where id='.$row['id'];

		// 	}
		// 	$conn->query($query);
		// }

	}
	echo json_encode($data);
	
}
	
?>