/* 
When clicking "view more", this stuff happens 
also, please reuse this code for "add" and "edit"
*/
var row;
var tags;

/* Info pop-up when 'see more' is clicked */
function songDialog(element) {
    row = $(element.closest('tr')).find('td');

    var song = "";

    let iterator = all_songs.keys();
    
    for (const item of iterator) {
       //found song
       if (item.song == row[1].innerHTML && item.artist == row[2].innerHTML) {
          song = item;
          console.log("Found song");
          break;
       }
      }

    tags = all_songs.get(song).tags;

    $(`<article id="song-info" class="song-info">
  <div class="song-info-top" style="display: flex; justify-content: space-between;width:90%;padding-top:15px;">
     <div>Song info</div>
     <i class="fa fa-edit"></i>
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
           <td><textarea placeholder="Not provided."></textarea></td>
        </tr>
        <tr>
           <td>Notes</td>
           <td><textarea placeholder="Not provided."></textarea></td>
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
     <button onclick="closeInfo('#song-info')">Close</button>
  </div>
</article>
)
}`).appendTo('body');

    $('input[type="text"], textarea').attr('readonly', 'readonly'); //set to read-only
    $('#categories-button-table').hide();
    $('#tag-button-table').hide();

    infoSetUp(); //all the other stuff for things to work

    $('#tag-selection').val(tags).trigger('change');
    $('#tag-selection').select2({
      disabled: true, //disable until the 'edit' button is pressed
  });
}
