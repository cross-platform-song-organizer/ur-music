/* 
When clicking "view more", this stuff happens 
also, please reuse this code for "add" and "edit"
*/
var row;
var tags;
var song = "";

/* Info pop-up when 'see more' is clicked */
function songDialog(element) {
    row = $(element.closest('tr')).find('td');

    var song = all_songs.get(row[1].innerHTML+";"+row[2].innerHTML);
    console.log(song);

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

     <button onclick="save()">Save changes</button>
     <button onclick="closeInfo('#song-info')">Close</button>
  </div>
</article>
)
}`).appendTo('body');
    $('#categories-button-table').hide();
    $('#tag-button-table').hide();

    infoSetUp(); //all the other stuff for things to work

    disable();

    $('#tag-selection').val(tags).trigger('change');

    $('.fa-edit').click(function() {
        console.log("I was clicked!");
        if ($(this).hasClass("active")) {
            disable();
        } else {
            $(this).addClass("active");
            $(".select2-selection").css("pointer-events", "inherit");
            $('input[type="text"], textarea').removeAttr('readonly');
        }
    })

    /*
     * For editing purposes
     */

    function disable () {
      $(".fa-edit").removeClass("active")
      console.log("Deactivating.");
      $(".select2-selection ").css("pointer-events", "none");
      $('input[type="text"], textarea').attr('readonly','readonly');
    }
}

function save() {
   console.log("We went here!");

   /* NEED TO CHECK THIS CODE */
   let songname = $("#song-info table:first-of-type tr:first-of-type td:last-of-type textarea").val();
   let artist = $("#song-info table:first-of-type tr:last-of-type td:last-of-type textarea").val();

   console.log(songname + " " + artist);
   if (song == "" || artist == "") {
       //don't allow them to save!
       alert("Please check song and artist fields before saving.");
   } else {
       let link = $("#song-info #categories-button-table tr:first-of-type td:last-of-type textarea").val();
       let note = $("#song-info #categories-button-table tr:last-of-type td:last-of-type textarea").val();
       let tags_array = $("#tag-selection").select2("data");
       console.log(tags_array);
       var tags = [];
       var tag_table = "";

       var tags_updated = false;

       for (var i = 0; i < tags_array.length; i++) {
           tags.push(tags_array[i].text);
           
           if (!available_tags.includes(tags_array[i].text)) {
             console.log("Updated tags");
               available_tags.push(tags_array[i].text);
               tags_updated = true;
           }

           if (i <= 1) {
               tag_table += "<div class='first-tag'>" + tags_array[i].text + "</div>"
           }
       }
       if (tags_updated == true) remakeList();

       //rename keys: https://stackoverflow.com/questions/4647817/javascript-object-rename-key
       if (song.song != songname || song.artist != artist) {
           all_songs.delete(song);
           console.log(all_songs);
           console.log("Deleted " + song);
           let key = songname + ";" + artist;
            let value = {song: songname, artist: artist, link: link, note: note, tags: tags};

            all_songs.set(key,value);
        }
       else {
          //update stuff
       all_songs.get(song).link = link;
       all_songs.get(song).note = note;
       all_songs.get(song).tags = tags;
       }

       //update in table

       row[1].innerHTML = songname;
       row[2].innerHTML = artist;
       $(row[3]).html(tag_table);
       console.log(all_songs);
   }
}