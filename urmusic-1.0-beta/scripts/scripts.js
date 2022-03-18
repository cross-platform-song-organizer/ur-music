var available_tags = [];
var tagString = "";
var all_songs = new Map (); //contains all of the user's songs <3

remakeList();

/* Opens pop-ups */
$('.view-more').click(function() {
    console.log("Fading main");
    $("#main").fadeTo(200, 0.5);
    $("#main").css("pointer-events", "none");

    $("nav").fadeTo(200, 0.5);
    $("nav").css("pointer-events", "none");
    console.log(this);

    if ($(this).is('td')) {
        songDialog(this); /* Open dialogue window w/ info gathered*/

        $("#song-info").fadeIn(200); /* Show window*/

    } else if ($(this).hasClass("fa-plus")) {
        addDialog();
    }

    /* Gather info from this row to use */

})

/* Used to call whatever needs to be closed */
function closeInfo(closer) {
    console.log(closer);
    console.log("Going back");
    $("#main").fadeTo(200, 1);
    $("#main").css("pointer-events", "auto");

    $("nav").fadeTo(200, 1);
    $("nav").css("pointer-events", "auto");

    $(closer).remove();
}

/*
 ***************** SONG STUFF *****************
 */

/* Sets up stuff for adding + editing + viewing song info */
function infoSetUp() {
    /* Everything to enable Select2 */
    $("#tag-selection").each(function(index, element) {
        $(this).select2({
            tags: true,
            width: "100%" // just for stack-snippet to show properly
        });
    });
    var selected = [];
    

    $(".js-programmatic-disable").on("click", function() {
        $("#tag-selection").prop("disabled", false);
        $("#tag-selection").prop("disabled", false);
    });

    $(".js-programmatic-enable").on("click", function() {
        $("#tag-selection").prop("disabled", true);
        $("#tag-selection").prop("disabled", true);
    });

    /* Sets up textareas to automatically resize as needed */

    $("textarea").each(function() {
        this.setAttribute("style", "height:" + (this.scrollHeight) + "px;", "overflow-y", "scroll");
        this.style.height = "auto";
    }).on("input", function() {
        this.style.height = "auto";
        this.style.height = (this.scrollHeight) + "px";
    });

    //functionalities for viewing more stuff for adding, editing, and viewing songs
    $(".more-button").click(function() {
        console.log("Clicked the 'tags' button");
        var button_id = "#" + $(this).attr('id');
        var table_id = "#" + $(this).attr('id') + "-table";
        console.log(table_id);
        if (!$(this).hasClass("active")) {
            $(this).addClass("active");
            $(table_id).show();
            $(button_id).html("Hide " + ($(button_id).html()).substr($(button_id).html().indexOf("View") + 4));
            console.log(("#" + $(this).attr('id')));
        } else {
            $(this).removeClass("active");
            $(table_id).hide();
            $(button_id).html("View " + ($(button_id).html()).substr($(button_id).html().indexOf("Hide") + 4));
        }
    })
}

//updates all the tags + puts them in alphabetical order
function remakeList () {
    available_tags.sort();
    tagString = "";
    for (var i = 0; i < available_tags.length; i++) {
        tagString += "<option>" + available_tags[i]+"</option>";
    }
}

function addCell (song,artist,tag_table) {

    /*
    * after a new cell is added, something funky happens. This is for the cases where we've 
    * already added another cell before and are adding another one
    */

    $("tr").removeClass("new");
    $(`<tr class="new">
    <td><input type="checkbox" class="checkbox"></td>
    <td>`+song+`</td>
    <td>`+artist+`</td>
    <td>`+tag_table+`</td>
    <td class="view-more"><i class="fas fa-ellipsis-v"></i></td>
    </tr>`).appendTo("#main-library-content table tbody");

    $('.new .view-more').click(function() {
        console.log("Fading main");
        $("#main").fadeTo(200, 0.5);
        $("#main").css("pointer-events", "none");
    
        $("nav").fadeTo(200, 0.5);
        $("nav").css("pointer-events", "none");
        console.log(this);
    
        songDialog(this); // Open dialogue window w/ info gathered

        $("#song-info").fadeIn(200); // Show window
    
    })

    $('.new .checkbox').click(function () {
        itemsToDelete.push(this);
     })
}