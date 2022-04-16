/* TO DO: When a song is deleted here, it will also be deleted on our server. */
$('td:first-of-type input').addClass('checkbox');

$('#delete').click(function() {
    if (!$('#delete').hasClass("active")) {
        $('  .library-content td:first-of-type').css({
            "display": "table-cell"
        });
        $('  .library-content th:first-of-type').css({
            "display": "table-cell"
        });
        confirmDialog();
        $('#delete').addClass("active");

        $("#add").removeClass("active");
        $("#filter").removeClass("active");
    } else {
        turnOff();
        $('.checkbox').prop("checked", false);
    }
})

function turnOff() {
    /* Need to add confirmation panel, which leads to deleting */
    $('   .library-content td:first-of-type').css({

        "display": "none"
    });
    $('   .library-content th:first-of-type').css({
        "display": "none"
    });
    $('#confirm-popup').remove();
    $('#delete').removeClass("active");
}

function confirmDialog() {

    var itemsToDelete = new Array();
    $(`<div id="confirm-popup"> 
            <div style="display: flex; justify-content: space-between">
            <div style="display: flex; gap: 0;"> 
                <button class="delete" id="yes">Confirm</button>
                <button class="cancel" id="no">Cancel</button>
                <button class="clear" id="clear" style="margin-left: 2vw">Clear</button>
            </div>
            </div> 
    </div>`).prependTo('.library');
        
    //Pass true to a callback function
    $("#yes").click(function() {
        $("#myModal").css('display', 'hidden');
        $('#delete').focus(); /* Maintains focus on delete button */

        itemsToDelete = []; //make sure it's empty
        itemsToDelete = $('.checkbox:checked');

        //Displays delete confirmation
        if (itemsToDelete.length > 0) {
            document.getElementById("confirm-delete-popup").style.display = "block";
            document.getElementById("confirm-delete").onclick = deleteOnceConfirmed;
            
            //Vary warning message based on number of songs to delete
            if (itemsToDelete.length === 1) {
                var row = $(itemsToDelete[0]).closest("tr").find('td');
                var songTitle = row[1].innerHTML
                var artist = row[2].innerHTML;
                document.getElementById("delete-confirm-warning").textContent = `WARNING: This will permanently delete the song ${songTitle} by ${artist}.`;
            } else {
                document.getElementById("delete-confirm-warning").textContent = `WARNING: This will permanently delete the ${itemsToDelete.length} selected songs.`;
            }
        } else {
            console.log("Error: no songs selected to delete");

            //Display error popup when no songs are selected to delete
            var div = document.getElementById("top-alert");
            document.getElementById("text-of-alert").textContent = "Error: Please select at least one song to delete.";
            div.style.display = "flex";
            setTimeout(function() {
                div.style.animationName = "fadeOut";
            }, 3000);
            setTimeout(function() {
                div.style.display = "none";
                div.style.animationName = "";
            }, 6000);

        }
    });

    //Pass false to callback function
    $("#confirm-popup #no").click(function() {
        $('#main-library-content td:first-of-type').css({
            "display": "none"
        });
        $('#main-library-content th:first-of-type').css({
            "display": "none"
        });
        $('#confirm-popup').remove();
        $('#delete').removeClass("active");
        $('.checkbox').prop("checked", false);
        itemsToDelete = [];
    });

    $("#confirm-popup #clear").click(function() {
        document.getElementById("clear-checkbox-popup").style.display = "block";
    });

    function deleteOnceConfirmed() {
        document.getElementById("confirm-delete-popup").style.display = "none";
    
        for (var i = 0; i < itemsToDelete.length; i++) {
            var row = $(itemsToDelete[i]).closest("tr").find('td');
            all_songs.delete(row[1].innerHTML + ";" + row[2].innerHTML); // Delete from stored array
            $($(itemsToDelete[i]).closest("tr")).remove();
        }
    
        //Display alert that song was deleted successfully
        var div = document.getElementById("top-alert");
        var notificationString = "";
        if (itemsToDelete.length == 1) {
            notificationString = "You successfully deleted 1 song!";
        } else {
            notificationString = "You successfully deleted " + itemsToDelete.length + " songs!";
        }
        document.getElementById("text-of-alert").textContent = notificationString;
        div.style.display = "flex";
        setTimeout(function() {
            div.style.animationName = "fadeOut";
        }, 3000);
        setTimeout(function() {
            div.style.display = "none";
            div.style.animationName = "";
        }, 6000);
    }
}

//Functions called by buttons in confirmation popups
function clearCheckboxes() {
    $('.checkbox').prop("checked", false);
    itemsToDelete = [];
    document.getElementById("clear-checkbox-popup").style.display = "none";
}
function cancelClearCheckboxes() {
    document.getElementById("clear-checkbox-popup").style.display = "none";
}
function cancelDelete() { //where is this used? <-- This is used by the Cancel button on the delete popup, currently index.html line 36
    document.getElementById("confirm-delete-popup").style.display = "none";
}