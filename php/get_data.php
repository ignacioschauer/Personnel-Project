<?php 
include ('config.php');
if(isset($_GET['get_data'])){
    if($_GET['table_name']=='employee_table'){
        $query = 'SELECT p.id, p.lastName, p.firstName, p.jobTitle, p.email, p.departmentId, d.name as department, l.name as location FROM personnel 
        p inner JOIN department d ON (d.id = p.departmentID) 
        inner JOIN location l ON (l.id = d.locationID) 
        ORDER BY p.lastName, p.firstName, d.name, l.name';
        $result = $conn->query($query);
        if ($result->num_rows > 0) {
            foreach ($result as $key => $result_item) {
            ?>
                <tr id="tr_<?php echo $result_item['id']?>">
                    <td style="display:none" class="col-id" id="user_id_<?php echo $result_item['id']?>"><?php echo $result_item['id']?></td>
                    <td class="col-firstName" id="firstName_<?php echo $result_item['id']?>"><?php echo $result_item['firstName']?></td>
                    <td class="col-lastName" id="lastName_<?php echo $result_item['id']?>"><?php echo $result_item['lastName']?></td>
                    <td class="col-jobTitle" id="jobTitle_<?php echo $result_item['id']?>"><?php echo $result_item['jobTitle']?></td>
                    <td class="col-email" id="email_<?php echo $result_item['id']?>"><?php echo $result_item['email']?></td>
                    <td class="col-location" id="location_<?php echo $result_item['id']?>"><?php echo $result_item['location']?></td>
                    <td class="col-departmentId" id="departmentId_<?php echo $result_item['id']?>"><?php echo $result_item['department']?></td>
                    <td class="col-edit">
                        <button class="btn btn-outline-success btn-size " onclick="editButton(<?php echo $result_item['id']?>)" href="#" onclick=><img src="images/edit.svg" ></button>
                    </td>
                    <td class="col-delete">
                        <button class="btn btn-outline-success btn-size" onclick="deleteButton(<?php echo $result_item['id']?>)" href="#"><img src="images/trashBin.svg" ></button>
                    </td>
                </tr>
            <?php
            }
        }  
    }
    if($_GET['table_name'] == 'location_table'){
        $query = 'SELECT * from location';
        $result = $conn->query($query);
        $count  = 1;
        if ($result->num_rows > 0) {
            foreach ($result as $key => $result_item) {
            ?>
                <tr id="tr_<?php echo $result_item['id']?>">
                    <!--<td class='firstTd'>
                        <input type='checkbox' class='checkbox' onclick="check_box()" id="<?php echo $result_item['id']?>">
                    </td>-->
                    <td class="col-location_id" id="location_id_<?php echo $result_item['id']?>"><?php echo $count++?></td>
                    <td class="col-locationName" id="locationName_<?php echo $result_item['id']?>"><?php echo $result_item['name']?></td>
                    <td class="col-edit">
                        <button class="btn btn-outline-success btn-size" onclick="editButton(<?php echo $result_item['id']?>)" href="#"><img src="images/edit.svg" ></button>
                    </td>
                    <td class="col-edit">
                        <button class="btn btn-outline-success btn-size" onclick="deleteButton(<?php echo $result_item['id']?>)" href="#"><img src="images/trashBin.svg" ></button>
                    </td>
                </tr>
            <?php
            }
        }  
    }
    if($_GET['table_name'] == 'department_table'){
        $query = 'SELECT 
        
        department.id as id,
        department.name as  name,
        department.locationID as locationID,
        location.name as location_name
        
        from department inner join location on location.id=department.locationID ';
        $result = $conn->query($query);
        $count  = 1;
        if ($result->num_rows > 0) {
            foreach ($result as $key => $result_item) {
            ?>
                <tr id="tr_<?php echo $result_item['id']?>">
                    <!--<td class='firstTd'>
                        <input type='checkbox' class='checkbox' onclick="check_box()" id="<?php echo $result_item['id']?>">
                    </td>-->
                    <td class="col-location-ids" id="location_id_<?php echo $result_item['id']?>"><?php echo $count++;?></td>
                    <td class="col-departmentName" id="departmentName_<?php echo $result_item['id']?>"><?php echo $result_item['name']?></td>
                    <td class="col-locationD" id="locationD_ID_<?php echo $result_item['id']?>"><?php echo $result_item['location_name']?></td>
                    <td class="col-edit">
                        <button class="btn btn-outline-success btn-size" onclick="editButton(<?php echo $result_item['id']?>)" href="#"><img src="images/edit.svg" ></button>
                    </td>
                    <td class="col-edit">
                        <button class="btn btn-outline-success btn-size" onclick="deleteButton(<?php echo $result_item['id']?>)" href="#"><img src="images/trashBin.svg" ></button>
                    </td>
                </tr>
            <?php
            }
        }  

    }
}
// add 
else if(isset($_POST["firstName"])){

    $query = 'INSERT INTO personnel (id, firstName, lastName, jobTitle, email, departmentId) VALUES( DEFAULT , "' .  $_POST["firstName"] . '", "' . $_POST["lastName"] . '", "' . $_POST["jobTitle"] . '", "' . $_POST["email"] . '",' . $_POST["departmentId"] . ')';
    $result = $conn->query($query);
}
// add location
else if(isset($_POST["locationName"])){

    $query = 'INSERT INTO location (name) VALUES("' . $_POST["locationName"] . '")';
    $result = $conn->query($query);
}
// add Department
else if(isset($_POST["departmentName"])){

    $query = 'INSERT INTO department (name,locationID) VALUES("' . $_POST["departmentName"] . '","' . $_POST["locationid"] . '")';
    $result = $conn->query($query);
}
// update
else if(isset($_GET["update_id"])){

    if(isset($_GET["firstName_update"])){
        $query = 'update personnel set firstName="'.$_GET["firstName_update"].'", lastName="'.$_GET["lastName_update"].'", jobTitle="'.$_GET["jobTitle_update"].'", email="'.$_GET["email_update"].'", departmentId="'.$_GET["departmentId_update"].'" where id='.$_GET["update_id"];
    }
    else if(isset($_GET["locationName_update"])){
        $query = 'update location set name="'.$_GET["locationName_update"].'" where id='.$_GET["update_id"];
    }
    else if(isset($_GET["departmentName_update"])){
        $query = 'update department set name="'.$_GET["departmentName_update"].'", locationID="'.$_GET["locationid_update"].'" where id='.$_GET["update_id"];
    }
    
    
    $result = $conn->query($query);


}
// delete
else if(isset($_GET["delete_rows"])){

    if($_GET["delete_table_name"] == 'Employee_table'){
        $query = 'DELETE FROM personnel WHERE id IN('.$_GET["delete_rows"].')' ;
    }
    else if($_GET["delete_table_name"] == 'location_table'){
        $query = 'DELETE FROM location WHERE id IN('.$_GET["delete_rows"].')' ;
    }
    else if($_GET["delete_table_name"] == 'Department_table'){
        $query = 'DELETE FROM department WHERE id IN('.$_GET["delete_rows"].')' ;
    }

	$result = $conn->query($query);
}
else if(isset($_GET["drop_down_load"])){

    if($_GET['drop_down_load'] == 'location_drop'){
        $query = 'SELECT * from location';
        $result = $conn->query($query);
        if ($result->num_rows > 0) {
            echo '<option value="0">Select Location</option>';
            foreach ($result as $key => $result_item) {
            ?>
            <option value="<?php echo $result_item['id']?>"><?php echo $result_item['name']?></option>

            <?php
            }
        }
    }
    else if($_GET['drop_down_load'] == 'department_drop'){
        $query = 'SELECT * from department';
        $result = $conn->query($query);
        if ($result->num_rows > 0) {
            echo '<option value="0">Select Department</option>';
            foreach ($result as $key => $result_item) {
            ?>
            <option id="<?php echo $result_item['id']?>" value="<?php echo $result_item['locationID']?>"><?php echo $result_item['name']?></option>

            <?php
            }
        }
    } 
}
else if(isset($_GET['department_id'])){
    $query = 'SELECT * from location where id='.$_GET['department_id'];
    $result = $conn->query($query);
    if ($result->num_rows > 0) {
        foreach ($result as $key => $result_item) {
        ?>
        <option value="<?php echo $result_item['id']?>"><?php echo $result_item['name']?></option>

        <?php
        }
    }
} 

?>