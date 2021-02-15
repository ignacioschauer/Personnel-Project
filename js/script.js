$(document).ready(function () {

  $("#addButton").click(function () { 
    $('#exampleModal2').modal('show');
    
  });
  // all data get
  function get_all_data(){
    $.get("php/get_data.php", 
    {
      get_data:"get_data"
    },
    function (data) {
      $('#employeeList').html(data);
      // showPage(1);
    });

  }
  get_all_data();

  // insert data

  $('#btn_submit').click(function(){
      $.ajax ({
        url: 'php/get_data.php',
        type: 'POST',
        data: {
          firstName: $('#firstName').val(),
          lastName: $('#lastName').val(),
          jobTitle: $('#jobTitle').val(),
          email: $('#email').val(), 
          departmentId: $('#departmentId').val(),
        },
        success: function (result) {
          $('#exampleModal2').modal('hide');
          get_all_data();
          toastr.success("Add Data Successfully");
        }
      });
  });
  // Edit

  $('#editButton').click(function () {
    
    var editid="0";
    $('input.checkbox:checkbox:checked').each(function () {
      editid = $(this).attr('id');
    });
    $('#exampleModal3').modal('show');
    $('#firstName_update').val($('#firstName_'+editid).text());
    $('#lastName_update').val($('#lastName_'+editid).text());
    $('#jobTitle_update').val($('#jobTitle_'+editid).text());
    $('#email_update').val($('#email_'+editid).text());
    $('#departmentId_update').val($('#departmentId_'+editid).text());
   
  });

  // update data

  $("#btn_update").click(function () { 
    var editid="0";
    $('input.checkbox:checkbox:checked').each(function () {
      editid = $(this).attr('id');
    });
    $('#exampleModal3').modal('hide');
    $.ajax ({
      url: 'php/get_data.php',
      type: 'GET',
      data: {
        update_id: editid,
        firstName_update: $('#firstName_update').val(),
        lastName_update: $('#lastName_update').val(),
        jobTitle_update: $('#jobTitle_update').val(),
        email_update: $('#email_update').val(), 
        departmentId_update: $('#departmentId_update').val(),
      },
      success: function (result) {
        $('#exampleModal3').modal('hide');
        $('#firstName_'+editid).text($('#firstName_update').val());
        $('#lastName_'+editid).text($('#lastName_update').val());
        $('#jobTitle_'+editid).text($('#jobTitle_update').val());
        $('#email_'+editid).text($('#email_update').val());
        $('#departmentId_'+editid).text($('#departmentId_update').val());
        toastr.success("Update Data Successfully");
      }
    });
  });

  // delete data
  
  $('#deleteButton').click(function(){
    
    swal({
      title: "Are you sure. You want to delete this information? ",
      // text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      var count = 0;
      if (willDelete) {
        var delete_ids = $(".checkbox:checked").map(function() {
        var row_id = $(this).attr('id');
        $('#tr_'+row_id).remove();
        count++;
        return $(this).attr('id');
      }).get().join(',');

      $.ajax ({
          url: 'php/get_data.php',
          type: 'get',
          data: {
            delete_rows:delete_ids,
          },
          success: function (result) {
            toastr.success("You've deleted "+count+" rows successfully ");
          }
        });
      }
    });
  });
 
  // search 
 
  $("#search").keyup(function () {
      var value = this.value.toLowerCase().trim();
      $("table tr").each(function (index) {
          if (!index) return;
          $(this).find("td").each(function () {
              var id = $(this).text().toLowerCase().trim();
              var not_found = (id.indexOf(value) == -1);
              $(this).closest('tr').toggle(!not_found);
              return not_found;
      });
    });
  });
});

