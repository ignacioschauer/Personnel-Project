// Get the modal

var modal = document.getElementById("exampleModal");

var modalTwo = document.getElementById("exampleModal2");

var modalThree = document.getElementById("exampleModal3");

// Get the button that opens the modal

var easyOne = document.getElementById("dropdown01");

var easyTwo = document.getElementById("addButton");

var easyThree = document.getElementById("editButton");

var easyFour = document.getElementById("deleteButton");

// Get the <span> element that closes the modal

var span = document.getElementsByClassName("close")[0];

var btnTwo = document.getElementsByClassName("close")[1];

var btnThree = document.getElementsByClassName("close")[2];

// Get the <close> button that closes the modal

var closeFirst = document.getElementById("closeModal");

var closeSecond = document.getElementById("closeModal2");

var closeThird = document.getElementById("closeModal3");

// When the user clicks on the button, open the modal

easyOne.onclick = function() {
  modal.style.display = "block";
  modalTwo.style.display = "none";
}

easyTwo.onclick = function() {
  modalTwo.style.display = "block";
  modal.style.display = "none";
}

easyThree.onclick = function() {
  modalThree.style.display = "block";
  modalTwo.style.display = "none";
  modal.style.display = "none";
  modalFour.style.display = "none";
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

closeFirst.onclick = function() {
  modal.style.display = "none";
}

closeSecond.onclick = function() {
  modalTwo.style.display = "none";
}

closeThird.onclick = function() {
  modalThree.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  } else if (event.target == modalTwo) {
    modalTwo.style.display = "none"
  } else if (event.target == modalThree) {
    modalThree.style.display = "none"
  }
}

// Employee List

//$.each(result.data.country, function(index) {

easyTwo.onclick = function() {

  var employees;

  //alert("Funciona el boton!!");

  employees = "<li>Ignacio Schauer</li>";

$('#employeeList').append(
                                              
  $("<tr>" +
        "<td class='firstTd'><input type='checkbox' class='checkbox'></td>" +
        "<td class='firstTd'>154</td>" +
        "<td class='secondTd'>Ignacio</td>" +
        "<td class='secondTd'>Schauer</td>" +
        "<td>Software Developer</td>" +
        "<td>schauer.ignacio@gmail.com.makingitlongetoseehowitlooks</td>" +
        "<td class='secondTd'>5</td>" +
    "</tr>")
);
                           
 // $('#employeeList').html(employees)
  }
