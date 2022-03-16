/* TO DO: When a song is deleted here, it will also be deleted on our server. */
var itemsToDelete = [];

$('td:first-of-type input').addClass('checkbox');

$('#delete').click(function() {
    if ($('td:first-of-type').css('display') == 'none') {
        $('td:first-of-type').css({"display": "table-cell"});
        $('th:first-of-type').css({"display": "table-cell"});
        confirmDialog();
        $(this).focus();
    }
    else {
        /* Need to add confirmation panel, which leads to deleting */
        $('td:first-of-type').css ({"display": "none"});
        $('th:first-of-type').css ({"display": "none"});
        $(this).mousedown();
        $('#confirm-popup').remove();
    }
    console.log("Mode is enabled!");
})

function confirmDialog(){
    $(`<div id="confirm-popup"> 
            <div style="display: flex;">
            <div style="display: flex; gap: 0;"> 
                <button id="yes">Confirm</button>
                <button id="no">Cancel</button>
                </div>
            </div> 
    </div>`).appendTo('.top-bar');

    
     //Pass true to a callback function
     $("#yes").click(function () {
        $("#myModal").css('display', 'hidden');
        console.log("We clicked yes!");

        for (var i = 0; i < itemsToDelete.length; i++) {
            console.log($(itemsToDelete[i]).closest("tr"));
            $($(itemsToDelete[i]).closest("tr")).remove();
        }
    });
      
     //Pass false to callback function
     $("#no").click(function () {
        $('td:first-of-type').css ({"display": "none"});
        $('th:first-of-type').css ({"display": "none"});
        $('#confirm-popup').remove();
        $(this).mousedown();
        itemsToDelete = [];
     });
  }

/* Deletes everything that's checked */
$('.checkbox').click(function () {
    itemsToDelete.push(this);
    console.log("Something was checked!");
    
 })

