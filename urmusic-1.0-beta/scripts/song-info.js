var row;
var tags;
var song = "";
remakeList();
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
function remakeList() {
    available_tags.sort();
    tagString = "";
    for (var i = 0; i < available_tags.length; i++) {
        tagString += "<option>" + available_tags[i] + "</option>";
    }
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
  <table style="padding-top: 15px">
     <tbody>
        <tr>
           <td>Song</td>
           <td><textarea placeholder="Enter song title"></textarea></td>
        </tr>
        <tr>
           <td>Artist</td>
           <td><textarea placeholder="Enter artist name"></textarea></td>
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

    infoSetUp();

    $('textarea').change(function() {
        console.log(this);
        console.log("New text: " + $(this).val());
    })

    $('#save-song').click(function() {
        /* Necessary information */
        save("#add-popup");
    })
}

/*
 ************ Viewing a new song ************
 */

/* Info pop-up when 'see more' is clicked */
function songDialog(element) {
    turnOff();
    row = $(element.closest('tr')).find('td');

    var song = all_songs.get(row[1].innerHTML + ";" + row[2].innerHTML);
    //console.log(song);

    tags = song.tags;

    $(`<article id="song-info" class="song-info">
  <div class="song-info-top" style="display: flex; justify-content: space-between;width:90%;padding-top:15px;">
     <div>Song info</div>
     <i class="fa fa-edit" style="cursor: pointer;"></i>
  </div>
  <!-- Basic song info -->
  <table style="padding-top: 15px">
     <tbody>
        <tr>
           <td>Song</td>
           <td><textarea>` + song.song + `</textarea></td>
        </tr>
        <tr>
           <td>Artist</td>
           <td><textarea>` + song.artist + `</textarea></td>
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

     <button class="save" onclick="save('#song-info')">Save changes</button>
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

    $('#tag-selection').val(tags).trigger('change');

    /*
     ********* EDIT STUFF *********
     */
    $('.fa-edit').click(function() {
        //console.log("I was clicked!");
        if ($(this).hasClass("active")) {
            disable();
        } else {
            $(this).addClass("active");
            $("textarea").removeClass("disabled");
            $(".select2-selection").css("pointer-events", "inherit");
            $('input[type="text"], textarea').removeAttr('readonly');
            $("button:contains('Save changes')").show();
        }
    })

    function disable() {
        $(".fa-edit").removeClass("active")
        //console.log("Deactivating.");
        $(".select2-selection ").css("pointer-events", "none");
        $('input[type="text"], textarea').attr('readonly', 'readonly');
        $("button:contains('Save changes')").hide();
        $("textarea").addClass("disabled");
    }
}

// Used for both adding + editing
function save(table) {
    //console.log("We went here!");

    /* NEED TO CHECK THIS CODE */
    let songname = $(table + " table:first-of-type tr:first-of-type td:last-of-type textarea").val();
    let artist = $(table + " table:first-of-type tr:last-of-type td:last-of-type textarea").val();

    console.log(songname + " " + artist);
    if (songname == "" || artist == "") {
        //don't allow them to save!
        alert("Please check song and artist fields before saving."); //replace with another module or something (change away from alert)
    } else {
        let link = $(table + " #categories-button-table tr:first-of-type td:last-of-type textarea").val();
        let note = $(table + " #categories-button-table tr:last-of-type td:last-of-type textarea").val();
        let tags_array = $("#tag-selection").select2("data");
        var tags = [];
        var tag_table = "";

        var tags_updated = false;

        for (var i = 0; i < tags_array.length; i++) {
            tags.push(tags_array[i].text);

            if (!available_tags.includes(tags_array[i].text)) {
                //console.log("Updated tags");
                available_tags.push(tags_array[i].text);
                tags_updated = true;
            }

            if (i <= 1) {
                tag_table += "<div class='first-tag'>" + tags_array[i].text + "</div>"
            }
        }
        if (tags_updated == true) {
            remakeList();
        }

        let value = {
            song: songname,
            artist: artist,
            link: link,
            note: note,
            tags: tags
        };
        let key = songname + ";" + artist;

        if (table == "#add-popup") {
            all_songs.set(key, value);
            closeInfo(table);
        } else {
            if (song.song != songname || song.artist != artist) {
                all_songs.delete(song);
                all_songs.set(key, value);
            } else {
                //update stuff
                all_songs.get(song).link = link;
                all_songs.get(song).note = note;
                all_songs.get(song).tags = tags;
            }
            //update in table
            row[1].innerHTML = songname;
            row[2].innerHTML = artist;
            $(row[3]).html(tag_table);
        }
    }
}