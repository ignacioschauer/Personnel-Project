<?php 
include ('config.php');
if(isset($_GET['get_data'])){
    $query = 'SELECT p.id, p.lastName, p.firstName, p.jobTitle, p.email, p.departmentId, d.name as department, l.name as location FROM personnel 
    p LEFT JOIN department d ON (d.id = p.departmentID) LEFT JOIN location l ON (l.id = d.locationID) 
    ORDER BY p.lastName, p.firstName, d.name, l.name';
	$result = $conn->query($query);
	if ($result->num_rows > 0) {
        foreach ($result as $key => $result_item) {
        ?>
            <tr id="tr_<?php echo $result_item['id']?>">
                <td class='firstTd'>
                    <input type='checkbox' class='checkbox' onclick="check_box()" id="<?php echo $result_item['id']?>">
                </td>
                <td class="col-id" id="user_id_<?php echo $result_item['id']?>"><?php echo $result_item['id']?></td>
                <td class="col-firstName" id="firstName_<?php echo $result_item['id']?>"><?php echo $result_item['firstName']?></td>
                <td class="col-lastName" id="lastName_<?php echo $result_item['id']?>"><?php echo $result_item['lastName']?></td>
                <td class="col-jobTitle" id="jobTitle_<?php echo $result_item['id']?>"><?php echo $result_item['jobTitle']?></td>
                <td class="col-email" id="email_<?php echo $result_item['id']?>"><?php echo $result_item['email']?></td>
                <td class="col-departmentId" id="departmentId_<?php echo $result_item['id']?>"><?php echo $result_item['departmentId']?></td>
            </tr>
        <?php
        }
	}
}
// add 
else if(isset($_POST["firstName"])){

    $query = 'INSERT INTO personnel (id, firstName, lastName, jobTitle, email, departmentId) VALUES( DEFAULT , "' .  $_POST["firstName"] . '", "' . $_POST["lastName"] . '", "' . $_POST["jobTitle"] . '", "' . $_POST["email"] . '",' . $_POST["departmentId"] . ')';
    $result = $conn->query($query);
}
// update
else if(isset($_GET["update_id"])){

    $query = 'update personnel set firstName="'.$_GET["firstName_update"].'", lastName="'.$_GET["lastName_update"].'", jobTitle="'.$_GET["jobTitle_update"].'", email="'.$_GET["email_update"].'", departmentId="'.$_GET["departmentId_update"].'" where id='.$_GET["update_id"];
    $result = $conn->query($query);
}
// delete
else if(isset($_GET["delete_rows"])){

    $query = 'DELETE FROM personnel WHERE id IN('.$_GET["delete_rows"].')' ;
	$result = $conn->query($query);
}

?>