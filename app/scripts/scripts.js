var available_tags = [];
var tag_occur = new Map(); //keeps how many times a tag has been used; if it reaches -1, delete the tag

var tagString = "";
var all_songs = new Map(); //contains all of the user's songs <3

var userName = ""; //Austin did this

//prevents no stylesheet from loading
if (localStorage.reloaded == null) {
    clearLibrary(false);
    localStorage.clear();
    localStorage.reloaded = true;
    window.location.reload(); //forcefully reloads
}

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
    setMode();
    setName();
    setColor();
    setImage();

    makeTable();
    remakeList();
});

window.addEventListener('beforeunload', function (e) {
    localStorage.tag_occur = JSON.stringify([...tag_occur]); 
    localStorage.all_songs = JSON.stringify([...all_songs]);
    localStorage.setItem("available_tags",available_tags.toString());
});

$("nav button:first-of-type").addClass("colored");
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
        $("  .library-content table tbody").append("No songs exist.");
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
    turnOff();
    if (this.innerHTML.includes("book")) {
        $('#main').fadeIn(250);
        makeTable();
        remakeList();
    }
    else if (this.innerHTML.includes("search")) {
        $('#search').fadeIn(250);
        $("#confirm-popup").remove();
        makeSearch();
        document.getElementById("search-area").value = ""; //can't seem to clear it any other way, so no JQuery here
        $('#search-area').removeAttr('readonly');
    }
    else {
        $('#name').removeAttr('readonly');
        rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`
        if (localStorage.name != undefined) { //Austin did this
            document.getElementById("name").value = localStorage.name;
        }
        if (localStorage.image != undefined) {
            console.log(localStorage.image.split(" ")[1]);
            $('.'+localStorage.image.split(" ")[1]).addClass("selected");
        }
        if (localStorage.color != undefined) {
            document.getElementById("color-selector").value = localStorage.color;
        }
        else document.getElementById("color-selector").value = rgb2hex($("#user-image").css("color"));
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
        $("#shortcut").attr('href','assets/shortcut-dark.png');
        $('#mode').val("Dark mode");
    }
    else {
        $('#theme').attr('href','styles/light.css');
        $("#shortcut").attr('href','assets/shortcut-default.png');
        $('#mode').val("Default");
    }
}

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
        $("  .search-library-content table tbody").append("No songs exist.");
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
            <td>` + `<button class="link"><a href='` + link + `' target='_blank'>Listen</a></button></td>
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
    console.log(available_tags);
    available_tags.sort();
    tagString = "";
    for (var i = 0; i < available_tags.length; i++) {
        if (available_tags[i] != "") {  //Austin did this
            tagString += "<option>" + available_tags[i] + "</option>";
        }
    }
}

$("#change-name").click(function() {
    localStorage.name = $("#name").val();
    console.log($("#name").val());
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
    console.log(localStorage.name);
    if (localStorage.name != undefined) {
        $("#user-name").text(localStorage.name);
        userName = localStorage.name; //Austin did this
    }
    else {
        $("#user-name").text("Person");
        userName = "";
    }
}
 
function confirmClearLibrary() {  
    
    //Create pop-up confirmation
    document.getElementById("confirm-delete-popup").style.display = "block";
    document.getElementById("confirm-delete").onclick = clearLibrary;
    document.getElementById("delete-confirm-warning").textContent = "WARNING: This will permanently clear your library.";

}

function clearLibrary(displayAlert = true) { //Austin fixed this
    
    document.getElementById("confirm-delete-popup").style.display = "none";

    available_tags = [];
    tag_occur = new Map(); //keeps how many times a tag has been used; if it reaches -1, delete the tag
    tagString = "";
    all_songs = new Map(); //contains all of the user's songs <3
    remakeList();

    //Display alert that library was cleared successfully
    if (displayAlert) {
        console.log("displayAlert is true");
        var div = document.getElementById("top-alert");
        document.getElementById("text-of-alert").textContent = "You successfully cleared your library!";
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

$("#delete-account").click(function () { //Austin fixed this
    
    //Create pop-up confirmation
    document.getElementById("confirm-delete-popup").style.display = "block";
    document.getElementById("confirm-delete").onclick = deleteAccount;
    document.getElementById("delete-confirm-warning").textContent = "WARNING: This will permanently delete your account.";

})

function deleteAccount() {
    
    document.getElementById("confirm-delete-popup").style.display = "none";

    clearLibrary(false);
    localStorage.clear();
    window.location.reload(); //forcefully reloads
}

$("#select-image i").click(function () {
    $("#select-image i").removeClass("selected");
    localStorage.image = $(this).attr("class");
    setImage();
    $(this).addClass("selected");
})

function setImage () {
    console.log("Changing image");
    $("#user-image").removeClass();
    if (localStorage.image != undefined) {
        $("#user-image").removeClass();
        $("#user-image").addClass(localStorage.image);
    }
    else {
        $("#user-image").addClass("fas fa-user",document.getElementById("color-selector").value);
    }
}

function changeColor() {
    localStorage.color = document.getElementById("color-selector").value;
    setColor();
}

function setColor() {
    console.log(localStorage.color);
    if (localStorage.color != undefined) {
        $("#user-image").css("color",localStorage.color);
    }
}