var row;
var tags;
var song;
/*
 ***************** SONG STUFF *****************
 */

/* Sets up stuff for adding + editing + viewing song info */
function infoSetUp() {
    turnOff();
    /* Everything to enable Select2 */
    $("#tag-selection").each(function(index, element) {
        $(this).select2({
            tags: true,
            width: "100%" // just for stack-snippet to show properly
        });
    });

    $(".js-programmatic-disable").on("click", function() {
        $("#tag-selection").prop("disabled", false);
        $("#tag-selection").prop("disabled", false);
    });

    $(".js-programmatic-enable").on("click", function() {
        $("#tag-selection").prop("disabled", true);
        $("#tag-selection").prop("disabled", true);
    });

    /* Sets up textareas to automatically resize as needed; funciton is needed for creating new instances */

    $("textarea").each(function() {
        this.setAttribute("style", "height:" + (this.scrollHeight) + "px;", "overflow-y", "scroll");
        this.style.height = "auto";
    }).on("input", function() {
        this.style.height = "auto";
        this.style.height = (this.scrollHeight) + "px";
    });

    //functionalities for viewing more stuff for adding, editing, and viewing songs
    $(".more-button").click(function() {
        var button_id = "#" + $(this).attr('id');
        var table_id = "#" + $(this).attr('id') + "-table";
        if (!$(this).hasClass("active")) {
            $(this).addClass("active");
            $(table_id).show();
            $(button_id).html("Hide " + ($(button_id).html()).substr($(button_id).html().indexOf("View") + 4));
        } else {
            $(this).removeClass("active");
            $(table_id).hide();
            $(button_id).html("View " + ($(button_id).html()).substr($(button_id).html().indexOf("Hide") + 4));
        }
    });
}

/*
 ************ Adding a new song ************
 */

function addDialog() {
    $(`<article id="add-popup" class="song-info">
  <div class="song-info-top" style="display: flex; justify-content: space-between;width:90%;padding-top:15px;">
     <div>Add a song</div>
  </div>
  <!-- Basic song info -->
  <div id="missing">Please fill in all required fields.</div>
  <div id="invalid" style="width:80%; text-align: center;">Please provide a valid Spotify, Apple Music, or Youtube Music link.</div>
  <table style="padding-top: 15px">
     <tbody>
        <tr>
           <td>Song*</td>
           <td><textarea placeholder="Enter song title" title="Required."></textarea></td>
        </tr>
        <tr>
           <td>Artist*</td>
           <td><textarea placeholder="Enter artist name" title="Required."></textarea></td>
        </tr>
     </tbody>
  </table>
  <!-- Extra info; not needed -->
  <table id="categories-button-table">
     <tbody>
        <tr>
           <td>Link</td>
           <td><textarea placeholder="Enter song link"></textarea></td>
        </tr>
        <tr>
           <td>Notes</td>
           <td><textarea placeholder="Enter notes"></textarea></td>
        </tr>
     </tbody>
  </table>
  <button class="more-button" id="categories-button"> View extra info </button>
  <!-- Tags -->
  <table id="tag-button-table">
     <tbody>
        <tr>
           <td>Tags</td>
           <td>
              <div>
                 <select id="tag-selection" multiple="multiple">` + tagString +
        `</select>
                 </div>
           </td>
        </tr>
     </tbody>
  </table>
  <div style="padding-bottom: 15px">
  <button class="more-button" id="tag-button"> View tags </button>
  <button style="display: none;">Update</button>
  </div>
  </div>
  <div style="padding-bottom:15px">
     <button class="save" id="save-song">Save</button>
     <button class="cancel" id="cancel-song" onclick="closeInfo('#add-popup')">Cancel</button>
  </div>
</article>
)
}`).appendTo('body');

    $('#categories-button-table').hide();
    $('#tag-button-table').hide();
    $('#missing').hide();
    $('#invalid').hide();

    infoSetUp();

    $('#save-song').click(function() {

        $('#invalid').hide(); //in case it was being shown before
        let link = $("#categories-button-table tr:first-of-type td:last-of-type textarea").val();

        if (link != "" && urlExists(link) == false) {
            $('#invalid').show();
            return;
        }
        if (save('#add-popup') != false ) {
            closeInfo("#add-popup");

            //Display alert that song was added or edited successfully
            var div = document.getElementById("top-alert");
            document.getElementById("text-of-alert").textContent = "Your song was successfully added!";
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
}

/*
 ************ Viewing a new song ************
 */

/* Info pop-up when 'see more' is clicked */
function songDialog(element) {
    turnOff();
    row = $(element.closest('tr')).find('td');

    song = all_songs.get(row[1].innerHTML + ";" + row[2].innerHTML);

    tags = song.tags;

    var previous = song;

    $(`<article id="song-info" class="song-info">
  <div class="song-info-top" style="display: flex; justify-content: space-between;width:90%;padding-top:15px;">
     <div>Song info</div>
        <div>
        <i class="fa fa-edit" style="cursor: pointer;"></i>
        <i class="fa fa-trash" style="cursor: pointer;"></i>
        </div>
  </div>
  <div id="missing">Please fill in all required fields.</div>
  <div id="invalid">Please provide a valid Spotify, Apple Music, or Youtube Music link.</div>
  <!-- Basic song info -->
  <table style="padding-top: 15px">
     <tbody>
        <tr>
           <td>Song*</td>
           <td><textarea title="Required.">` + song.song + `</textarea></td>
        </tr>
        <tr>
           <td>Artist*</td>
           <td><textarea title="Required.">` + song.artist + `</textarea></td>
        </tr>
     </tbody>
  </table>
  <!-- Extra info; not needed -->
  <table id="categories-button-table">
     <tbody>
        <tr>
           <td>Link</td>
           <td><textarea placeholder="Not provided.">` + song.link + `</textarea></td>
        </tr>
        <tr>
           <td>Notes</td>
           <td><textarea placeholder="Not provided.">` + song.note + `</textarea></td>
        </tr>
     </tbody>
  </table>
  <button class="more-button" id="categories-button"> View extra info </button>
  <!-- Tags -->
  <table id="tag-button-table">
     <tbody>
        <tr>
           <td>Tags</td>
           <td>
              <div>
              <select id="tag-selection" multiple="multiple">` + tagString +
        `</select>
                 </div>
           </td>
        </tr>
     </tbody>
  </table>
  <div style="padding-bottom: 15px">
  <button class="more-button" id="tag-button"> View tags </button>
  <button style="display: none;">Update</button>
  </div>
  </div>
  <div style="padding-bottom:15px">

     <button class="save">Save changes</button>
     <button onclick="closeInfo('#song-info')">Close</button>
  </div>
</article>
)
}`).appendTo('body');
    $('#categories-button-table').hide();
    $('#tag-button-table').hide();
    $("button:contains('Save changes')").hide();

    infoSetUp(); //all the other stuff for things to work
    disable(); //don't automatically enable edit mode

    $('#missing').hide();
    $('#invalid').hide();

    $('#tag-selection').val(tags).trigger('change');

    /*
     ********* EDIT STUFF *********
     */
    $('.fa-edit').click(function() {
        if ($(this).hasClass("active")) {
            disable();
        } else {
            $(this).addClass("active");
            $("textarea").removeClass("disabled");
            $(".select2-selection").css("pointer-events", "inherit");
            $('input[type="text"], textarea').removeAttr('readonly');
            $("button:contains('Save changes')").show();
        }
    });

    $('.fa-trash').click(function() {
        document.getElementById("confirm-delete-popup").style.display = "block";
        document.getElementById("confirm-delete").onclick = deleteFromSongView;
        let songTitle = $("table:first-of-type tr:first-of-type td:last-of-type textarea").val();
        let artist = $("table:first-of-type tr:last-of-type td:last-of-type textarea").val();
        document.getElementById("delete-confirm-warning").textContent = `WARNING: This will permanently delete the song ${songTitle} by ${artist}.`;
    });

    $('.save').click(function() {

        $('#missing').hide();
        $('#invalid').hide();
       
        let songname = $("table:first-of-type tr:first-of-type td:last-of-type textarea").val();
        let artist = $("table:first-of-type tr:last-of-type td:last-of-type textarea").val();
        let link = $("#categories-button-table tr:first-of-type td:last-of-type textarea").val();

        if (songname == "" || artist == "") {
            //don't allow them to save!
            $('#missing').show();
        }
        else if (link != "" && urlExists(link) == false) {
            $('#invalid').show();
        }
        else {
            disable();
            all_songs.delete(previous.song + ";" + previous.artist);
            let tags_array = $("#tag-selection").select2("data");
            var tags = [];
            let note = $(" #categories-button-table tr:last-of-type td:last-of-type textarea").val();
    
            for (var i = 0; i < tags_array.length; i++) {
                tags.push(tags_array[i].text);
            }

            let value = {
                song: songname,
                artist: artist,
                link: link,
                note: note,
                tags: tags
            };

            let key = songname + ";" + artist;

            all_songs.set(key, value);


            if (previous.tags == undefined) previous.tags = [];
            if (tags == undefined) tags = [];
            
            updateOccurences(tags,previous.tags);

            previous = all_songs.get(songname + ";" + artist);
            makeTable();

            //Display alert that song was added or edited successfully
            var div = document.getElementById("top-alert");
            document.getElementById("text-of-alert").textContent = "Your song was successfully updated!";
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
}

function deleteFromSongView() {
    document.getElementById("confirm-delete-popup").style.display = "none";
    all_songs.delete(song.song + ";" + song.artist); //delete this song
    closeInfo('#song-info');
}

function disable() {
    $(".fa-edit").removeClass("active");
    $(".select2-selection ").css("pointer-events", "none");
    $('input[type="text"], textarea').attr('readonly', 'readonly');
    $("button:contains('Save changes')").hide();
    $("textarea").addClass("disabled");
}
// Used for both adding + editing
function save(table) {
    $('#missing').hide();
    $('#invalid').hide();

    /* NEED TO CHECK THIS CODE */
    let songname = $(table + " table:first-of-type tr:first-of-type td:last-of-type textarea").val();
    let artist = $(table + " table:first-of-type tr:last-of-type td:last-of-type textarea").val();
    let link = $(table + " #categories-button-table tr:first-of-type td:last-of-type textarea").val();

    if (songname == "" || artist == "") {
        //don't allow them to save!
        $('#missing').show();
        return false;
    } else if (link != "" && urlExists(link) == false) {
        $('#invalid').show();
    } else {
        let note = $(table + " #categories-button-table tr:last-of-type td:last-of-type textarea").val();
        let tags_array = $("#tag-selection").select2("data");
        var tags = [];

        for (var i = 0; i < tags_array.length; i++) {
            tags.push(tags_array[i].text);
        }

        console.log(tags);

        let value = {
            song: songname,
            artist: artist,
            link: link,
            note: note,
            tags: tags
        };
        let key = songname + ";" + artist;
        all_songs.set(key, value);

        if (table == "#add-popup") updateOccurences(tags, []);
    }
}

function updateOccurences (new_tags, old_tags) {

    console.log(new_tags);
    console.log(old_tags);

    console.log("Our available tags: " + available_tags);
    var updated = false;

    if (old_tags == undefined) { //no tags are in the old list
        console.log("No available tags before");
        for (var i = 0; i < new_tags.length; i++) {
            if (!tag_occur.has(new_tags[i])) {
                tag_occur.set(new_tags[i],1);
                available_tags.push(new_tags[i]);
                updated = true;
            }
            else tag_occur.set(new_tags[i],tag_occur.get(new_tags[i])+1);
        }
    }
    else { 
        const temp1 = new_tags.filter(val => !old_tags.includes(val)); //all our new tags to add
        const temp2 = $.grep(old_tags, function(value) {
            return $.inArray(value, new_tags) < 0;
        });

        for (var k = 0; k < temp1.length; k++) { //add to available tags
            if (!tag_occur.has(temp1[k])) {
                tag_occur.set(temp1[k],1);
                available_tags.push(temp1[k]);
                updated = true;
            }
            else tag_occur.set(temp1[k],tag_occur.get(temp1[k])+1);
        }
        for (var j = 0; j < temp2.length; j++) { //delete from available tags if neccessary
            if (tag_occur.get(temp2[j])==1) {
                tag_occur.delete(temp2[j]);
                available_tags = available_tags.filter(e => e !== temp2[j]); //delete tag from being available
                updated = true;
            }
            else tag_occur.set(temp2[j],tag_occur.get(temp1[j])-1);
        }
    }

    console.log("Our available tags: " + available_tags);
    if (updated == true) remakeList();
}

function urlExists(str) {
    var regex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/; //must be a link
    if (regex.test(str)) {
        if ((str.includes("open.spotify") && str.includes("track")) || (str.includes("music.apple") && str.includes("album")) || (str.includes("youtube") && str.includes("watch"))) {
            return true;
        }
    }
    return false;
}