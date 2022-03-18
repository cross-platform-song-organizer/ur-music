function addDialog() {
    $(`<article id="add-popup" class="popup" style="display:none"> <!-- Reminder to assign default classes! -->
    <div class="center">
      <div>What song would you like to add?</div>

      <!-- Basic song info -->
  <table style="padding-top: 15px">
     <tbody>
        <tr>
           <td>Song</td>
           <td><textarea>Song</textarea></td>
        </tr>
        <tr>
           <td>Artist</td>
           <td><textarea>Artist</textarea></td>
        </tr>
     </tbody>
  </table>
      <div id="more-categories" style="display:none">
        
        <div>
          <label for="album">Album</label>
          <input type="text" placeholder="Enter album name" name="album" id="album-input">
        </div>

        <div>
          <label for="link">Link</label>
          <input type="text" placeholder="Enter link to song" name="link" id="link-input">
        </div>

      </div>

      <div>
        <button id="more-categories-button" onclick="moreCategoriesToggle()">+ View more categories</button>
      </div>

      <div id="tags-within-add" style="display:none">
        <label for="tag-input">Tags</label>

        <!--Referenced https://www.w3schools.com/howto/howto_js_filter_dropdown.asp-->
        <div class="dropdown">
          <div id="tag-dropdown">
            <input type="text" placeholder="Search for a tag" id="tag-dropdown-input" 
            onkeyup="filterTagSearch()" style="min-width: 230px;"
            onfocus="showDropdownOptions()" onblur="hideDropdownOptions()">
            <div id="tag-dropdown-options" style="display: none;">
              <p class="dropdown-tag" onclick="addExistingTag(this.textContent)">Tag 1</p>
              <p class="dropdown-tag" onclick="addExistingTag(this.textContent)">Tag 2</p>
              <p class="dropdown-tag" onclick="addExistingTag(this.textContent)">Tag 3</p>
            </div>
          </div>
        </div>

        <p>Tags to be added:</p>
        <p id="tags-to-add" style="font-size:small;">(no tags have been added)</p>
      </div>

      <div>
        <button id="tags-button" onclick="tagsToggle()">+ View tags</button>
      </div>

      <div>
        <button onclick="cancelAdd()">Cancel</button>
        <button onclick="saveAdd()">Save</button>
      </div>
    </div>

  </article>`).appendTo('body');
}