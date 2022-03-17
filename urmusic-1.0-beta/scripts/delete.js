/* TO DO: When a song is deleted here, it will also be deleted on our server. */
var itemsToDelete = [];

$('td:first-of-type input').addClass('checkbox');

$('#delete').click(function() {
    if (!$(this).hasClass("active")) {
        $('#main-library-content td:first-of-type').css({"display": "table-cell"});
        $('#main-library-content th:first-of-type').css({"display": "table-cell"});
        confirmDialog();
        $(this).addClass("active");

        $("#add").removeClass("active");
        $("#filter").removeClass("active");

        console.log(this);
    }
    else {
        /* Need to add confirmation panel, which leads to deleting */
        $('#main-library-content td:first-of-type').css ({"display": "none"});
        $('#main-library-content th:first-of-type').css ({"display": "none"});
        $('#confirm-popup').remove();
        $(this).removeClass("active");
    }
    console.log("Mode is enabled!");
})

function confirmDialog(){
    $(`<div id="confirm-popup"> 
            <div style="display: flex; justify-content: space-between">
            <div style="display: flex; gap: 0;"> 
                <button id="yes">Confirm</button>
                <button id="no">Cancel</button>
            </div>
            <div><button id="clear">Clear</button></div>
            </div> 
    </div>`).appendTo('.top-bar');

     //Pass true to a callback function
     $("#yes").click(function () {
        $("#myModal").css('display', 'hidden');
        console.log("We clicked yes!");
        $('#delete').focus(); /* Maintains focus on delete button */

        for (var i = 0; i < itemsToDelete.length; i++) {
            console.log($(itemsToDelete[i]).closest("tr"));
            $($(itemsToDelete[i]).closest("tr")).remove();
        }
    });
      
     //Pass false to callback function
     $("#no").click(function () {
        $('#main-library-content td:first-of-type').css ({"display": "none"});
        $('#main-library-content th:first-of-type').css ({"display": "none"});
        $('#confirm-popup').remove();
        $('#delete').removeClass("active");
        itemsToDelete = [];
     });

     $("#clear").click(function () {
         console.log("Clicked clear!");
        $('.checkbox').prop("checked", false);
        itemsToDelete = [];
     })
  }

/* Deletes everything that's checked */
$('.checkbox').click(function () {
    itemsToDelete.push(this);
    console.log("Something was checked!");
    
 })
