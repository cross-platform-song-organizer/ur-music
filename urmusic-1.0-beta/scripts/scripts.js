var available_tags = [];
var tagString = "";
var all_songs = new Map (); //contains all of the user's songs <3

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
