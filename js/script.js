var editid = "0";
      function load($name){
        $.ajax ({
          url: 'php/get_data.php',
          type: 'GET',
          data: {
            drop_down_load:$name
          },
          success: function (result) {
            $('.'+$name).html(result);
          }
        });
      }
      load('department_drop');
      load('location_drop');
      function editButton($id){
        
        editid = $id;
        $('#exampleModal3').modal('show');
        // location update
        if($('#table_selection').val() == 'location_table'){

          $('#locationName_update').val($('#locationName_'+editid).text());

        }
        // department table

        else if($('#table_selection').val() == 'Department_table'){
          var select_text = $('#locationD_ID_'+editid).text();
          $('#departmentName_update').val($('#departmentName_'+editid).text());
          $.ajax ({
            url: 'php/get_data.php',
            type: 'GET',
            data: {
              drop_down_load:'location_drop'
            },
            success: function (result) {
              $('.location_drop').html(result);
              $("#locationid_update option:contains("+select_text+")").attr('selected', true);;
            }
          });
        }
        
        else{
          
          var select_text=$('#departmentId_'+editid).text().trim();
          $('#firstName_update').val($('#firstName_'+editid).text());
          $('#lastName_update').val($('#lastName_'+editid).text());
          $('#jobTitle_update').val($('#jobTitle_'+editid).text());
          $('#email_update').val($('#email_'+editid).text());
            $.ajax ({
            url: 'php/get_data.php',
            type: 'GET',
            data: {
              drop_down_load:'department_drop'
            },
            success: function (result) {
              $('.department_drop').html(result);
              $("#departmentId_update option:contains("+select_text+")").attr('selected', true);;
         
            }
          });
          $('#location_update_select').empty();
          $('#location_update_select').append('<option >'+$('#location_'+editid).text()+'</option>');
          
        }
      }
      
      function deleteButton($delete_id){
        swal({
            title: "Are you sure? Do you want to delete this information? ? ",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            var count = 0;
            if (willDelete) {

              var delete_ids = $delete_id;
              $('#tr_'+delete_ids).remove();
              count++;
            $.ajax ({
                url: 'php/get_data.php',
                type: 'get',
                data: {
                  delete_rows:delete_ids,
                  delete_table_name:($('#table_selection').val() == 'Select Table:')?'Employee_table':$('#table_selection').val()
                },
                success: function (result) {
                  toastr.success("You've deleted "+count+" rows successfully ");
                }
              });
            }
          });
      }
      
      $(document).ready(function () {
        $('.department_drop').on('change', function() {
            $.ajax ({
            url: 'php/get_data.php',
            type: 'GET',
            data: {
              department_id:$(this).val()
            },
            success: function (result) {
              $('.location_drop').html(result);
            }
          });
        });

        $('#table_selection').change(function (e) { 
          e.preventDefault();
          $("#editButton").attr("disabled", true);
          $('input:checkbox').attr('checked',false);

          if($(this).val() == 'location_table'){
            $('.employee_table').hide();
            $('.department_table').hide();
            $('.location_table').show();
            get_all_data('location_table');
          }
          else if($(this).val() == 'Department_table'){
            $('.employee_table').hide();
            $('.department_table').show();
            $('.location_table').hide();
            get_all_data('department_table');
          }
          else{
            $('.employee_table').show();
            $('.department_table').hide();
            $('.location_table').hide();
            get_all_data('employee_table');
          }
           

        });

        $("#addButton").click(function () { 
          $('#exampleModal2').modal('show');
          
        });

        // get all data 

        function get_all_data($TableName){
          $.get("php/get_data.php", 
          {
            get_data:"get_data",
            table_name:$TableName
          },
          function (data) {
            $('#employeeList').html(data);
            // showPage(1);
          });

        }
        get_all_data('employee_table');

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
                departmentId: $('#departmentId option:selected').attr('id'),
              },
              success: function (result) {
                $('#exampleModal2').modal('hide');
                get_all_data('employee_table');
                toastr.success("New record created successfully");
                $('#firstName').val('');
                $('#lastName').val('');
                $('#jobTitle').val('');
                $('#email').val('');
                $('#departmentId').val('0');
              }
            });
        });
        $('#btn_submit_location').click(function(){
            $.ajax ({
              url: 'php/get_data.php',
              type: 'POST',
              data: {
                locationName: $('#locationName').val()
              },
              success: function (result) {
                $('#exampleModal2').modal('hide');
                get_all_data('location_table');
                load('location_drop');
                toastr.success("New record created successfully");
                $('#locationName').val('')
              }
            });
        });
        $('#btn_submit_department').click(function(){
            $.ajax ({
              url: 'php/get_data.php',
              type: 'POST',
              data: {
                departmentName: $('#departmentName').val(),
                locationid: $('#locationid').val()
              },
              success: function (result) {
                $('#exampleModal2').modal('hide');
                get_all_data('department_table');
                load('department_drop');
                load('location_drop');
                toastr.success("New record created successfully");
                $('#departmentName').val('');
                $('#locationid').val('0');
              }
            });
        });
       
        // update data

        $("#btn_update").click(function () { 
         
          $('#exampleModal3').modal('hide');

          if($('#table_selection').val() == 'location_table'){
            $.ajax ({
            url: 'php/get_data.php',
            type: 'GET',
            data: {
              update_id: editid,
              locationName_update: $('#locationName_update').val()
            },
            success: function (result) {
              $('#exampleModal3').modal('hide');
              $('#locationName_'+editid).text($('#locationName_update').val());
              toastr.success("Data updated successfully");
              load('location_drop');
            }
            });

          }

          // department table

          else if($('#table_selection').val() == 'Department_table'){
            $.ajax ({
            url: 'php/get_data.php',
            type: 'GET',
            data: {
              update_id: editid,
              departmentName_update: $('#departmentName_update').val(),
              locationid_update: $('#locationid_update').val()
            },
            success: function (result) {
              $('#exampleModal3').modal('hide');
              $('#departmentName_'+editid).text($('#departmentName_update').val());
              $('#locationD_ID_'+editid).text($('#locationid_update option:selected').text());
              toastr.success("Data updated successfully");
              load('department_drop');
              load('location_drop');
            }
            });
            
          }else{
            $.ajax ({
            url: 'php/get_data.php',
            type: 'GET',
            data: {
              update_id: editid,
              firstName_update: $('#firstName_update').val(),
              lastName_update: $('#lastName_update').val(),
              jobTitle_update: $('#jobTitle_update').val(),
              email_update: $('#email_update').val(), 
              departmentId_update: $('#departmentId_update option:selected').attr('id'),
            },
            success: function (result) {
              $('#exampleModal3').modal('hide');
              $('#firstName_'+editid).text($('#firstName_update').val());
              $('#lastName_'+editid).text($('#lastName_update').val());
              $('#jobTitle_'+editid).text($('#jobTitle_update').val());
              $('#email_'+editid).text($('#email_update').val());
              $('#departmentId_'+editid).text($('#departmentId_update option:selected').text());
              $('#location_'+editid).text($('#location_update_select option:selected').text());
              toastr.success("Data updated successfully");
            }
          });
          }
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

        // $('th').click(function(){
        //     var table = $(this).parents('table').eq(0)
        //     console.log(table);
        //     var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()))
        //     this.asc = !this.asc
        //     if (!this.asc){
        //       rows = rows.reverse()
        //     }
        //     for (var i = 0; i < rows.length; i++){table.append(rows[i])}
        // })
        // function comparer(index) {
        //     return function(a, b) {
        //         var valA = getCellValue(a, index), valB = getCellValue(b, index)
        //         return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB)
        //     }
        // }
        // function getCellValue(row, index){ return $(row).children('td').eq(index).text() }


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
              case 'location Name':
                rows = sortByText(rows, 'td.col-locationName', sort_a_d);
                break;
              case 'Department Name':
                rows = sortByText(rows, 'td.col-departmentName', sort_a_d);
                break;

              case 'location D Id':
                rows = sortByText(rows, 'td.col-locationD', sort_a_d);
                break;
              default:
                console.error('Undefined sort field ' + field);
                break;
            }
            
            for (var i = 0; i < rows.length; i++) {
              $('table tbody').append(rows[i]);
            }
          }

          // employee table
          
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

          // location table 

          $('#location_by').on('change', function() {
            var sort = $('#sort_order_location :selected').val();
            if(sort == 'Ascending')
              sortAllBy(this.value,true);
            else  
              sortAllBy(this.value,false);
          });
          $('#sort_order_location').on('change', function() {
            var order = $('#location_by :selected').val();
            if(this.value == 'Ascending')
              sortAllBy(order,true);
            else  
              sortAllBy(order,false);
          });

          // department

          $('#department_by').on('change', function() {
            var sort = $('#sort_order_department :selected').val();
            if(sort == 'Ascending')
              sortAllBy(this.value,true);
            else  
              sortAllBy(this.value,false);
          });
          $('#sort_order_department').on('change', function() {
            var order = $('#department_by :selected').val();
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

  $('#btn_submit').click(function(){

      function clearInput() {
      $("#myForm :input").each ( function() {
        $(this).val('');
      })
      };

      clearInput();
  })