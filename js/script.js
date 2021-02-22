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
          toastr.success("New record created successfully");
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
        toastr.success("Data updated successfully");
      }
    });
  });

  // delete data
  
  $('#deleteButton').click(function(){
    
    swal({
      title: "Are you sure? Do you want to delete this information? ",
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

  // sort by table heading

  $('th').click(function(){
      var table = $(this).parents('table').eq(0)
      console.log(table);
      var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()))
      this.asc = !this.asc
      if (!this.asc){
        rows = rows.reverse()
      }
      for (var i = 0; i < rows.length; i++){table.append(rows[i])}
  })
  function comparer(index) {
      return function(a, b) {
          var valA = getCellValue(a, index), valB = getCellValue(b, index)
          return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB)
      }
  }
  function getCellValue(row, index){ return $(row).children('td').eq(index).text() }


  // sort dropdown

  function sortByNumber(rows, selector, ascending) {
      rows.sort(function(a, b) {
        var numberA = parseInt($(selector, a).text(), 10);
        var numberB = parseInt($(selector, b).text(), 10);
        if (ascending)
          return numberA - numberB;
        else
          return numberB - numberA;
      });
      
      return rows;
    }
    
    function sortByText(rows, selector, ascending) {
      rows.sort(function(a, b) {
        var textA = $(selector, a).text();
        var textB = $(selector, b).text();
        if (ascending)
          return textA.localeCompare(textB);
        else
          return textB.localeCompare(textA);
      });
      
      return rows;
    }

    function sortAllBy(field,sort) {
      var rows = $('table tbody tr').toArray();
      var sort_a_d = sort;
      switch (field) {
        case 'ID':
        rows = sortByNumber(rows, 'td.col-id', sort_a_d);
        break;
       
        case 'First Name':
        rows = sortByText(rows, 'td.col-firstName', sort_a_d);
        break;

        case 'Last Name':
        rows = sortByText(rows, 'td.col-lastName', sort_a_d);
        break;

        case 'Job Title':
        rows = sortByText(rows, 'td.col-jobTitle', sort_a_d);
        break;

        case 'Email Address':
        rows = sortByText(rows, 'td.col-email', sort_a_d);
        break;

        case 'Department ID':
          rows = sortByText(rows, 'td.col-departmentId', sort_a_d);
          break;
        default:
          console.error('Undefined sort field ' + field);
          break;
      }
      
      for (var i = 0; i < rows.length; i++) {
        $('table tbody').append(rows[i]);
      }
    }
    
    $('#sort_by').on('change', function() {
      var sort = $('#sort_order :selected').val();
      if(sort == 'Ascending')
        sortAllBy(this.value,true);
      else  
        sortAllBy(this.value,false);
    });

    $('#sort_order').on('change', function() {
      var order = $('#sort_by :selected').val();
      if(this.value == 'Ascending')
        sortAllBy(order,true);
      else  
        sortAllBy(order,false);
    });
});

function check_box(){
  var count = $('input:checkbox:checked').length;
    if(count == 1){
      $("#editButton").attr("disabled", false);
    }else{
      $("#editButton").attr("disabled", true);
    }
}
   