var available_tags = [];
var tagString = "";
var all_songs = new Map (); //contains all of the user's songs <3
makeTable();

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
    else if ($(this).hasClass("fa-filter")) {
        addFilter();
    }
})

/* Used to call whatever needs to be closed */
function closeInfo(closer) {
    console.log(closer);
    console.log("Going back");
    $("#main").fadeTo(200, 1);
    $("#main").css("pointer-events", "auto");
    $("nav").fadeTo(200, 1);
    $("nav").css("pointer-events", "auto");
    console.log("Going to make table");
    makeTable();

    $(closer).remove();
}

//reorganizes table in alphabetical order
function makeTable(reqs) {
    //in the case no requirements are given, we set the array to empty
    if (reqs == undefined) reqs = [];

    //clears table
    $("#main-library-content table tbody").empty();

    //sorts all songs based on song title
    var sorted_songs = new Map([...all_songs.entries()].sort());
    
    //iterates through all the songs and adds them to the table
    const iterator1 = sorted_songs.values();
    for (let value of iterator1) {
        console.log(reqs);
        console.log(value.tags);
        
        /*
        * if all the required tags exist in the song, 
        * then we'll update the table accordingly
        */
        if (reqs.every(i => value.tags.includes(i))) {
            var tag_table = "";
            for (var i = 0; i < value.tags.length; i++) {
                if (i <= 1) {
                    console.log(value.tags[i]);
                    tag_table += "<div class='tag'>" + value.tags[i] + "</div>";
                    console.log(tag_table);
                }
            }
            addCell(value.song,value.artist,tag_table);
        }
    }
}

function addCell(song, artist, tag_table) {

    /*
     * after a new cell is added, something funky happens. This is for the cases where we've 
     * already added another cell before and are adding another one
     */
    console.log("Got to adding a cell");
 
    $("tr").removeClass("new");
    $(`<tr class="new">
   <td><input type="checkbox" class="checkbox"></td>
   <td>` + song + `</td>
   <td>` + artist + `</td>
   <td>` + tag_table + `</td>
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
 
    $('.new .checkbox').click(function() {
        itemsToDelete.push(this);
    })
 }