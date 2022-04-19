var filter_tags = [];


function addFilter() {
    $(`<article id="filter-popup" class="song-info">
  <div class="song-info-top" style="display: flex; justify-content: space-between;width:90%;padding-top:15px;">
     <div>Filter songs</div>
     <button class="clear" id="clear">Clear</button>
  </div>
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
  </div>
  </div>
  <div style="padding-bottom:15px;">
    
    <button class="save" id="filter-songs">Filter</button>
    <button id="cancel-song" onclick="closeInfo('#filter-popup')">Cancel</button>
    </div>
</article>
)
}`).appendTo('body');

    infoSetUp();

    $('#tag-selection').val(filter_tags).trigger('change');

    $('#filter-popup #clear').click(function() {
        filtered_tags = [];
        $('#tag-selection').val(filter_tags).trigger('change');
    })

    $('#filter-songs').click(function() {
        /* Necessary information */
        let tags_array = $("#tag-selection").select2("data");
        var temp = [];
        for (var i = 0; i < tags_array.length; i++) {
            temp.push(tags_array[i].text);
        }

        //save current filters for later
        filter_tags = temp;
        makeTable(filter_tags);

        $("#main").fadeTo(200, 1);
        $("#main").css("pointer-events", "auto");
        $("nav").fadeTo(200, 1);
        $("nav").css("pointer-events", "auto");
        $("#filter-popup").remove();
    })

}