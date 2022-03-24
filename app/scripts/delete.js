/* TO DO: When a song is deleted here, it will also be deleted on our server. */
var itemsToDelete = [];

$('td:first-of-type input').addClass('checkbox');

$('#delete').click(function() {
    if (!$('#delete').hasClass("active")) {
        $('#main-library-content td:first-of-type').css({
            "display": "table-cell"
        });
        $('#main-library-content th:first-of-type').css({
            "display": "table-cell"
        });
        confirmDialog();
        $('#delete').addClass("active");

        $("#add").removeClass("active");
        $("#filter").removeClass("active");
    } else {
        turnOff();
    }
})

function turnOff() {
    /* Need to add confirmation panel, which leads to deleting */
    $('#main-library-content td:first-of-type').css({
        "display": "none"
    });
    $('#main-library-content th:first-of-type').css({
        "display": "none"
    });
    $('#confirm-popup').remove();
    $('#delete').removeClass("active");
}

function confirmDialog() {
    $(`<div id="confirm-popup"> 
            <div style="display: flex; justify-content: space-between">
            <div style="display: flex; gap: 0;"> 
                <button class="delete" id="yes">Confirm</button>
                <button class="cancel" id="no">Cancel</button>
                <button class="clear" id="clear" style="margin-left: 2vw">Clear</button>
            </div>
            </div> 
    </div>`).appendTo('.top-bar');

    //Pass true to a callback function
    $("#yes").click(function() {
        $("#myModal").css('display', 'hidden');
        $('#delete').focus(); /* Maintains focus on delete button */

        for (var i = 0; i < itemsToDelete.length; i++) {
            var row = $(itemsToDelete[i]).closest("tr").find('td');
            all_songs.delete(row[1].innerHTML + ";" + row[2].innerHTML); // Delete from stored array
            $($(itemsToDelete[i]).closest("tr")).remove();
        }

        //Display alert that song was deleted successfully
        var div = document.getElementById("top-alert");
        var notificationString = "";
        if (numItemsToDelete == 1) {
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

        itemsToDelete = [];
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
        itemsToDelete = [];
    });

    $("#confirm-popup #clear").click(function() {
        $('.checkbox').prop("checked", false);
        itemsToDelete = [];
    })
}

/* Deletes everything that's checked */
$('.checkbox').click(function() {
    itemsToDelete.push(this);
})