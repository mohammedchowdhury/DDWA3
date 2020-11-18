$(document).ready(function(){
    loadContacts(); 
    $("#add-button").click(function(event){
        $.ajax({
            type:"POST",
            url: 'http://localhost:8080/contact',
            data : JSON.stringify({
                firstName:$("#add-first-name").val(),
                lastName:$("#add-last-name").val(),
                company:$("#add-company").val(),
                phone:$("#add-phone").val(),
                email:$("#add-email").val()
            }),
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            "datatype":"json",
            success: function(){
                $("#errorMessages").empty();
                $("#add-first-name").val(""),
                $("#add-last-name").val(""),
                $("#add-company").val(""),
                $("#add-phone").val(""),
                $("#add-email").val("")
                loadContacts(); 
            },
            error: function(){
                $("#errorMessages").append($("<li>")
                .attr({class: "list-group-item list-group-item-danger"})
                .text("Error calling web service. Please try again."))
                ; 
            }
        })
    }); 

    $('#edit-button').click(function(event){
        $.ajax({
            type:'PUT',
            url: 'http://localhost:8080/contact/'+$('#edit-contact-id').val(),
            data: JSON.stringify({
                contactID: $("edit-contact-id").val(),
                firstName:$("#edit-first-name").val(),
                lastName:$("#edit-last-name").val(),
                company:$("#edit-company").val(),
                phone:$("#edit-phone").val(),
                email:$("#edit-email").val()
            }),
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            "datatype":"json",
            success: function(){
                $('#errorMessages').empty();
                hideEditForm(); 
                loadContacts();
            }, 
            error: function(){
                $("#errorMessages").append($("<li>")
                .attr({class: "list-group-item list-group-item-danger"})
                .text("Error calling web service. Please try again.")); 
            }
        })
    });

    


}); 

function loadContacts(){
    clearContactTable(); 
    var contentRows = $("#contentRows");
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/contacts',
        success: function(contactArray){
            $.each(contactArray, function(index,contact){
                var name = contact.firstName+" "+contact.lastName; 
                var company = contact.company;
                var contactId = contact.contactId; 
                var row = '<tr>'; 
                row +="<td>"+name+"</td>"; 
                row +="<td>"+company+"</td>"; 
                row +='<td><a onclick=showEditForm('+contactId+')>Edit</a></td>'; 
                row +="<td><a>Delete</a></td>"; 
                row +="</tr>"; 
                contentRows.append(row); 
            });
        },
        error: function(){
         $("#errorMessages").append($("<li>")
                            .attr({class: "list-group-item list-group-item-danger"})
                            .text("Error calling web service. Please try again."))
                            ; 
        }
    }); 
}

function clearContactTable(){
    $("#contentRows").empty(); 
}

function showEditForm(contactID){
    $("#errorMessages").empty();
    //make an ajax call
    $.ajax({
        type:"GET",
        url:'http://localhost:8080/contact/'+contactID,
        success: function(data,status){
            $("#edit-first-name").val(data.firstName); 
            $("#edit-last-name").val(data.lastName); 
            $("#edit-company").val(data.company); 
            $("#edit-email").val(data.email); 
            $("#edit-phone").val(data.phone); 
            $("#edit-contact-id").val(data.contactId); 
        },
        error:function(){
        }
    })
    $("#contactTableDiv").hide(); 
    $("#editFormDiv").show(); 
}

// takes place when cancel button is pressed
function hideEditForm(){
    $("#errorMessages").empty();
    
    $("#edit-first-name").val(""),
    $("#edit-last-name").val(""),
    $("#edit-company").val(""),
    $("#edit-email").val(""),
    $("#edit-phone").val("")

    $("#editFormDiv").hide(); 
    $("#contactTableDiv").show(); 
}

// $(document).ready(function(){

//     $.ajax({
//         type: 'GET',
//         url: 'http://localhost:8080/contacts',
//         success: function(contactArray) {
//             // get a reference to the 'allContacts' div
//             var contactsDiv = $('#allContacts');

//             // go through each of the returned contacts and append the info to the
//             //contactsDiv
//             $.each(contactArray, function(index, contact) {
//                 var contactInfo = '<p>';
//                 contactInfo += 'Name: ' + contact.firstName + ' ' + contact.lastName + '<br>';
//                 contactInfo += 'Company: ' + contact.company + '<br>';
//                 contactInfo += 'Email: ' + contact.email + '<br>';
//                 contactInfo += 'Phone: ' + contact.phone + '<br>';
//                 contactInfo += '<p>';
//                 contactInfo += '<hr>';

//                 contactsDiv.append(contactInfo);
//             })
//         },
//         error: function (jqXHR, textStatus, errorThrown) {
//             alert("FAILURE!");
//         }
//     });

//     $('#add-button').on('click', function() {
//         $.ajax({
//             type: 'POST',
//             url: 'http://localhost:8080/contact',
//             data: JSON.stringify({
//                 firstName: $('#add-first-name').val(),
//                 lastName: $('#add-last-name').val(),
//                 company: $('#add-company').val(),
//                 phone: $('#add-phone').val(),
//                 email: $('#add-email').val()
//             }),
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             'dataType': 'json',
//             success: function(contact) {
//                 // get a reference to the 'newContact' div
//                 var newContactDiv = $('#newContact');

//                 // append contact info to the newContact div
//                 var contactInfo = '<p>';
//                 contactInfo += 'Name: ' + contact.firstName + ' ' + contact.lastName + '<br>';
//                 contactInfo += 'Company: ' + contact.company + '<br>';
//                 contactInfo += 'Email: ' + contact.email + '<br>';
//                 contactInfo += 'Phone: ' + contact.phone + '<br>';
//                 contactInfo += '<hr>';

//                 newContactDiv.append(contactInfo);
//             },
//             error: function(jqXHR, textStatus, errorThrown) {
//                 alert('FAILURE');
//             }
//         });
//     });
// })