/* TO DO: When a song is deleted here, it will also be deleted on our server. */
var itemsToDelete = [];

$('td:first-of-type input').addClass('checkbox');

$('#delete').click(function() {
    if (!$('#delete').hasClass("active")) {
        $('#main-library-content td:first-of-type').css({"display": "table-cell"});
        $('#main-library-content th:first-of-type').css({"display": "table-cell"});
        confirmDialog();
        $('#delete').addClass("active");

        $("#add").removeClass("active");
        $("#filter").removeClass("active");
    }
    else {
        turnOff();
    }
})

function turnOff () {
    /* Need to add confirmation panel, which leads to deleting */
    $('#main-library-content td:first-of-type').css ({"display": "none"});
    $('#main-library-content th:first-of-type').css ({"display": "none"});
    $('#confirm-popup').remove();
    $('#delete').removeClass("active");
}

function confirmDialog(){
    $(`<div id="confirm-popup"> 
            <div style="display: flex; justify-content: space-between">
            <div style="display: flex; gap: 0;"> 
                <button class="delete" id="yes">Confirm</button>
                <button class="cancel" id="no">Cancel</button>
            </div>
            <div><button class="clear" id="clear">Clear</button></div>
            </div> 
    </div>`).appendTo('.top-bar');

     //Pass true to a callback function
     $("#yes").click(function () {
        $("#myModal").css('display', 'hidden');
        console.log("We clicked yes!");
        $('#delete').focus(); /* Maintains focus on delete button */

        for (var i = 0; i < itemsToDelete.length; i++) {
            var row = $(itemsToDelete[i]).closest("tr").find('td');
            console.log($(itemsToDelete[i]).closest("tr"));
            all_songs.delete(row[1].innerHTML + ";" + row[2].innerHTML);
            $($(itemsToDelete[i]).closest("tr")).remove();
        }
    });
      
     //Pass false to callback function
     $("#confirm-popup #no").click(function () {
        $('#main-library-content td:first-of-type').css ({"display": "none"});
        $('#main-library-content th:first-of-type').css ({"display": "none"});
        $('#confirm-popup').remove();
        $('#delete').removeClass("active");
        itemsToDelete = [];
     });

     $("#confirm-popup #clear").click(function () {
         console.log("Clicked clear!");
        $('.checkbox').prop("checked", false);
        itemsToDelete = [];
     })
  }

/* Deletes everything that's checked */
$('.checkbox').click(function () {
    itemsToDelete.push(this);
 })
