var available_tags = [];
var tag_occur = new Map(); //keeps how many times a tag has been used; if it reaches -1, delete the tag

var tagString = "";
var all_songs = new Map(); //contains all of the user's songs <3

//persistent information load
$( document ).ready(function() {
    $('body').css('display', 'none');
    $('body').fadeIn(500);
    console.log( "ready!" );

    if (localStorage.getItem("available_tags")!= null) {
        console.log("Available tags isn't nothing");
        available_tags = localStorage.getItem("available_tags").split(",");
    }
    if (localStorage.getItem("tag_occur") != null) {
        tag_occur = new Map(JSON.parse(localStorage.tag_occur));
    }
    if (localStorage.getItem("all_songs") != null) {
        all_songs = new Map(JSON.parse(localStorage.all_songs));
    }
    makeTable();
    setMode();
    remakeList();
    setName();
});

window.addEventListener('beforeunload', function (e) {
    localStorage.tag_occur = JSON.stringify([...tag_occur]); 
    localStorage.all_songs = JSON.stringify([...all_songs]);
    localStorage.setItem("available_tags",available_tags.toString());
});

$("nav button:first-of-type").addClass("active");
$("section").not("#main").hide();
//$("#main").hide();

/* Opens pop-ups */
$('.view-more').click(function() {
    $("#main").fadeTo(200, 0.5);
    $("#main").css("pointer-events", "none");

    $("nav").fadeTo(200, 0.5);
    $("nav").css("pointer-events", "none");

    if ($(this).is('td')) {
        songDialog(this); /* Open dialogue window w/ info gathered*/

        $("#song-info").fadeIn(200); /* Show window*/

    } else if ($(this).hasClass("fa-plus")) {
        addDialog();
    } else if ($(this).hasClass("fa-filter")) {
        addFilter();
    }
});

/* Used to call whatever needs to be closed */
function closeInfo(closer) {
    $("#main").fadeTo(200, 1);
    $("#main").css("pointer-events", "auto");
    $("nav").fadeTo(200, 1);
    $("nav").css("pointer-events", "auto");
    makeTable();
    $(closer).remove();
}

//reorganizes table in alphabetical order
function makeTable(reqs) {
    //in the case no requirements are given, we set the array to empty
    //clears table
    $("  .library-content table tbody").empty();

    //sorts all songs based on song title
    var sorted_songs = new Map([...all_songs.entries()].sort());

    //iterates through all the songs and adds them to the table
    const iterator1 = sorted_songs.values();
    for (let value of iterator1) {
        var tag_table = "";
        /*
         * if all the required tags exist in the song, 
         * then we'll update the table accordingly
         */

        if (reqs == undefined) {
            for (var i = 0; i < value.tags.length; i++) {
                if (i <= 1) {
                    tag_table += "<div class='tag'>" + value.tags[i] + "</div>";
                }
            }
            addCell(value.song, value.artist, value.link, tag_table);
        } else if (reqs.every(i => value.tags.includes(i))) {
            for (var i = 0; i < value.tags.length; i++) {
                if (i <= 1) tag_table += "<div class='tag'>" + value.tags[i] + "</div>";
            }
            addCell(value.song, value.artist, value.link, tag_table);
        }
    }

    if ($("  .library-content table tbody").is(':empty')) {
        $("  .library-content table tbody").append("No song exist.");
    }
}

function addCell(song, artist, link, tag_table) {

    /*
     * after a new cell is added, something funky happens. This is for the cases where we've 
     * already added another cell before and are adding another one
     */

    $("tr").removeClass("new");
    if (link != "") {
        $(`<tr class="new">
            <td><input type="checkbox" class="checkbox"></td>
            <td>` + song + `</td>
            <td>` + artist + `</td>
            <td>` + `<button class="link"><a href='` + link + `' target='_blank'>Listen</i></a></button></td>
            <td>` + tag_table + `</td>
            <td class="view-more"><i class="fas fa-ellipsis-v"></i></td>
            </tr>`).appendTo("  .library-content table tbody");
    } else {
        $(`<tr class="new">
            <td><input type="checkbox" class="checkbox"></td>
            <td>` + song + `</td>
            <td>` + artist + `</td>
            <td></td>
            <td>` + tag_table + `</td>
            <td class="view-more"><i class="fas fa-ellipsis-v"></i></td>
            </tr>`).appendTo("  .library-content table tbody");
    }

    $('.new .view-more').click(function() {
        $("#main").fadeTo(200, 0.5);
        $("#main").css("pointer-events", "none");

        $("nav").fadeTo(200, 0.5);
        $("nav").css("pointer-events", "none");

        songDialog(this); // Open dialogue window w/ info gathered

        $("#song-info").fadeIn(200); // Show window

    })
}

$('nav button').click(function () {
    $("nav button").removeClass("colored");
    $(this).addClass("colored");
    $("section").hide();
    if (this.innerHTML.includes("book")) {
        $('#main').fadeIn(250);
    }
    else if (this.innerHTML.includes("search")) {
        $('#search').fadeIn(250);
        makeSearch();
        document.getElementById("search-area").value = ""; //can't seem to clear it any other way, so no JQuery here
        $('#search-area').removeAttr('readonly');
    }
    else {
        $('#account').fadeIn(250);
    }
})

$('#mode').on('change', function() {
    switch (this.value) {
        case 'Dark mode':
            localStorage.theme = 'Dark';
            break;
        default:
            localStorage.theme = 'Default';
      }
      setMode();
  });

function setMode () {
    if (localStorage.theme == 'Dark') {
        $('#theme').attr('href','styles/dark.css');
        $('#mode').val("Dark mode");
    }
    else {
        $('#theme').attr('href','styles/light.css');
        $('#mode').val("Default");
    }
}

//https://stackoverflow.com/questions/31710127/javascript-image-upload-and-display
var fileTag = document.getElementById("filetag"),
  preview = document.getElementById("preview");
  
fileTag.addEventListener("change", function() {
    changeImage(this);
});

function changeImage(input) {
    var reader;
    if (input.files && input.files[0]) {
        reader = new FileReader();

        reader.onload = function(e) {
            preview.setAttribute('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

$('#search-area').keyup(function() {
    console.log(this);
    console.log("New text: " + $(this).val());
    makeSearch($(this).val());
})

//reorganizes table in alphabetical order
function makeSearch(reqs) {
    //in the case no requirements are given, we set the array to empty
    //clears table
    console.log("Gonna make the table");
    $(".search-library-content table tbody").empty();

    //sorts all songs based on song title
    var sorted_songs = new Map([...all_songs.entries()].sort());

    //iterates through all the songs and adds them to the table
    const iterator1 = sorted_songs.values();
    for (let value of iterator1) {

        /*
         * if all the required tags exist in the song, 
         * then we'll update the table accordingly
         */

        if (reqs == undefined) {
            var tag_table = "";
            for (var i = 0; i < value.tags.length; i++) {
                if (i <= 1) {
                    tag_table += "<div class='tag'>" + value.tags[i] + "</div>";
                }
            }
            addSearchCell(value.song, value.artist, value.link, tag_table);
        } else {
            reqs = reqs.toLowerCase();
            if (value.song.toLowerCase().includes(reqs) || value.artist.toLowerCase().includes(reqs)) {
                var tag_table = "";
                for (var i = 0; i < value.tags.length; i++) {
                    if (i <= 1) tag_table += "<div class='tag'>" + value.tags[i] + "</div>";
                }
                addSearchCell(value.song, value.artist, value.link, tag_table);
            }
        }
    }

    if ($("  .search-library-content table tbody").is(':empty')) {
        $("  .search-library-content table tbody").append("No song exist.");
    }
}

function addSearchCell(song, artist, link, tag_table) {

    /*
     * after a new cell is added, something funky happens. This is for the cases where we've 
     * already added another cell before and are adding another one
     */

    $("tr").removeClass("new");
    if (link != "") {
        $(`<tr class="new">
            <td><input type="checkbox" class="checkbox"></td>
            <td>` + song + `</td>
            <td>` + artist + `</td>
            <td>` + `<button class="link"><a href='` + link + `' target='_blank'>View</a></button></td>
            <td>` + tag_table + `</td>
            <td></td>
            </tr>`).appendTo("  .search-library-content table tbody");
    } else {
        $(`<tr class="new">
            <td><input type="checkbox" class="checkbox"></td>
            <td>` + song + `</td>
            <td>` + artist + `</td>
            <td></td>
            <td>` + tag_table + `</td>
            <td></td>
            </tr>`).appendTo("  .search-library-content table tbody");
    }

    $('.new .view-more').click(function() {
        $("#main").fadeTo(200, 0.5);
        $("#main").css("pointer-events", "none");

        $("nav").fadeTo(200, 0.5);
        $("nav").css("pointer-events", "none");

        songDialog(this); // Open dialogue window w/ info gathered

        $("#song-info").fadeIn(200); // Show window
    })
}

//updates all the tags + puts them in alphabetical order
function remakeList() {
    available_tags.sort();
    tagString = "";
    for (var i = 0; i < available_tags.length; i++) {
        tagString += "<option>" + available_tags[i] + "</option>";
    }
}

$("#change-name").click(function() {
    localStorage.name = $("#account textarea").val();
    console.log($("#account textarea").val());
    setName();
})

$("textarea").each(function() {
    this.setAttribute("style", "height:" + (this.scrollHeight) + "px;", "overflow-y", "scroll");
    this.style.height = "auto";
}).on("input", function() {
    this.style.height = "auto";
    this.style.height = (this.scrollHeight) + "px";
});

function setName() {
    if (localStorage.name != undefined) {
        $("#user-name").text(localStorage.name);
    }
    else {
        $("#user-name").text("Person")
    }
}