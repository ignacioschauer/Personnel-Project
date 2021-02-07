// Get the modal

var modal = document.getElementById("exampleModal");

var modalTwo = document.getElementById("exampleModal2");

var modalThree = document.getElementById("exampleModal3");

var modalFour = document.getElementById("exampleModal4");

// Get the button that opens the modal

var easyOne = document.getElementById("dropdown01");

var easyTwo = document.getElementById("addButton");

var easyThree = document.getElementById("editButton");

var easyFour = document.getElementById("deleteButton");

// Get the <span> element that closes the modal

var span = document.getElementsByClassName("close")[0];

var btnTwo = document.getElementsByClassName("close")[1];

var btnThree = document.getElementsByClassName("close")[2];

var btnFour = document.getElementsByClassName("close")[3];

// Get the <close> button that closes the modal

var closeFirst = document.getElementById("closeModal");

var closeSecond = document.getElementById("closeModal2");

var closeThird = document.getElementById("closeModal3");

var closeFourth = document.getElementById("closeModal4");

// When the user clicks on the button, open the modal

easyOne.onclick = function() {
  modal.style.display = "block";
  modalTwo.style.display = "none";
  modalThree.style.display = "none";
  modalFour.style.display = "none";
}

easyTwo.onclick = function() {
  modalTwo.style.display = "block";
  modal.style.display = "none";
  modalThree.style.display = "none";
  modalFour.style.display = "none";
}

easyThree.onclick = function() {
  modalThree.style.display = "block";
  modalTwo.style.display = "none";
  modal.style.display = "none";
  modalFour.style.display = "none";
}

easyFour.onclick = function() {
  modalFour.style.display = "block";
  modalThree.style.display = "none";
  modalTwo.style.display = "none";
  modal.style.display = "none";
}

// When the user clicks on <span> (x), close the modal

span.onclick = function() {
  modal.style.display = "none";
}

btnTwo.onclick = function() {
  modalTwo.style.display = "none";
}

btnThree.onclick = function() {
  modalThree.style.display = "none";
}

btnFour.onclick = function() {
  modalFour.style.display = "none";
}

closeFirst.onclick = function() {
  modal.style.display = "none";
}

closeSecond.onclick = function() {
  modalTwo.style.display = "none";
}

closeThird.onclick = function() {
  modalThree.style.display = "none";
}

closeFourth.onclick = function() {
  modalFour.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  } else if (event.target == modalTwo) {
    modalTwo.style.display = "none"
  } else if (event.target == modalThree) {
    modalThree.style.display = "none"
  } else if (event.target == modalFour) {
    modalFour.style.display = "none"
  }
}

// Employee List

//$.each(result.data.country, function(index) {

$(document).ready(function () {

  $.ajax ({
    url: 'php/getAll.php',
    type: 'POST',
    dataType: 'json',
    data: {
      id : 1
    },
    success: function (result) {
  
      console.log(result.data) 
  
        if (result.status.name == "ok") {
  
        
        $.each(result.data, function(index) {
                             
          $('#employeeList').append(
  
            $("<tr>" +
            "<td class='firstTd'><input type='checkbox' class='checkbox'></td>" +
            "<td class='firstTd'>" + result.data[index].id + "</td>" +
            "<td class='secondTd'>" + result.data[index].firstName + "</td>" +
            "<td class='secondTd'>" + result.data[index].lastName + "</td>" +
            "<td>" + result.data[index].jobTitle + "</td>" +
            "<td>" + result.data[index].email + "</td>" +
            "<td class='secondTd'>" + result.data[index].departmentId + "</td>" +
            "</tr>"
                
          ));
        });                    
      };          
    } 
  });
});

// Delete Row 

/*var confirmDelete = document.getElementById("confirmDeletion");

function deleteRow() {
  document.querySelectorAll('#employeeList .checkbox:checked').forEach(e => {
    e.parentNode.parentNode.remove()
  });
}

confirmDelete.onclick = deleteRow ();*/

$('#confirmDeletion').click(function(){
  $('.checkbox:checked').each(function(){
    $(this).parent('tr').remove();
  });
});

 
/*$('#closeModal2').click(function(){

  $.ajax ({
    url: 'php/addPersonnel.php',
    type: 'POST',
    dataType: 'json',
    data: {
      firstName: $('#firstName').val(),
      lastName: $('#lastName').val(),
      jobTitle: $('#jobTitle').val(),
      email: $('#email').val(), 
      departmentId: $('#departmentId').val(),
    },
    success: function (result) {
  
      console.log(result);

      alert("add Personnel php is working")

    }
  });
})*/

$('#closeModal2').click(function(){

      function clearInput() {
      $("#myForm :input").each ( function() {
        $(this).val('');
      })
      };

      clearInput();
});
  