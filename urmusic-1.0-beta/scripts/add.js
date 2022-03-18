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
                 <select id="tag-selection" multiple="multiple">`+tagString+
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
     <button id="save-song">Save</button>
     <button id="cancel-song" onclick="closeInfo('#add-popup')">Cancel</button>
  </div>
</article>
)
}`).appendTo('body');

    $('#categories-button-table').hide();
    $('#tag-button-table').hide();

    infoSetUp();

    $('textarea').change(function () {
        console.log(this);
        console.log("New text: " + $(this).val());
    })

    $('#save-song').click(function () {
        /* Necessary information */
        let song = $("#add-popup table:first-of-type tr:first-of-type td:last-of-type textarea").val();
        let artist = $("#add-popup table:first-of-type tr:last-of-type td:last-of-type textarea").val();

        if (song == "" || artist == "") {
            //don't allow them to save!
        }
        else {
            let link = $("#add-popup #categories-button-table tr:first-of-type td:last-of-type textarea").val();
            let note = $("#add-popup #categories-button-table tr:last-of-type td:last-of-type textarea").val();
            let tags_array = $("#tag-selection").select2("data");
            console.log(tags_array);
            var tags = [];
            var tag_table = "";

            var tags_updated = false;

            for (var i = 0; i < tags_array.length; i++) {
                tags.push(tags_array[i].text); 
                if (!available_tags.includes(tags_array[i].text)) {
                    available_tags.push(tags_array[i].text);
                    tags_updated = true; 
                }

                if (i <= 1) {
                    tag_table += "<div class='first-tag'>" + tags_array[i].text + "</div>"
                }
            }

            //update song tags to show all available tags
            if (tags_updated == true) remakeList();

            let key = {song: song, artist: artist};
            let value = {link: link, note: note, tags: tags};

            all_songs.set(key,value);
            console.log(all_songs);
            closeInfo("#add-popup");

            addCell (song,artist,tag_table);
        }
    })
}

    /* Gather info from this row to use */