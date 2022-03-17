var row;
var tags;

$('.edit').click(function() {
  console.log("Fading main");
  $("#main").fadeTo(200,0.5); 
  $("#main").css("pointer-events", "none");

  $("nav").fadeTo(200,0.5); 
  $("nav").css("pointer-events", "none");

  row = $(this.closest('tr')).find('td');

  console.log(row);
  
  for (i = 1; i < row.length - 2;i++) {
    console.log(row[i].innerHTML);
  }

  tags = $(row[3]).find('div');
  console.log(tags[0].innerText + " " + tags[1].innerText);

  songDialog();

  $("#song-info").fadeIn(200);
})

function songDialog() {
  $(`<article id="song-info">
  <div class="song-info-top" style="display: flex; justify-content: space-between;width:90%;padding-top:15px;">
     <div>Song info</div>
     <i class="fa fa-edit"></i>
  </div>
  <!-- Basic song info -->
  <table style="padding-top: 15px">
     <tbody>
        <tr>
           <td>Song</td>
           <td><textarea>`+ row[1].innerHTML + `</textarea></td>
        </tr>
        <tr>
           <td>Artist</td>
           <td><textarea>`+ row[2].innerHTML + `</textarea></td>
        </tr>
     </tbody>
  </table>
  <!-- Extra info; not needed -->
  <table>
     <tbody>
        <tr>
           <td>Link</td>
           <td><textarea></textarea></td>
        </tr>
        <tr>
           <td>Notes</td>
           <td><textarea></textarea></td>
        </tr>
     </tbody>
  </table>
  <button> - Dismiss Extra info </button>
  <!-- Tags -->
  <table id="tags-table">
     <tbody>
        <tr>
           <td>Tags</td>
           <td>
              <div>
                 <select id="tag-selection" multiple="multiple">
                    <option>Lecture #1</option>
                    <option>Comfort listening</option>
                    <option>Actually the worst song ever</option>
                    <option>Avant garde</option>
                 </select>
                 </div>
           </td>
        </tr>
     </tbody>
  </table>
  <div style="padding-bottom: 15px">
  <button> - Dismiss tags </button>
  <button style="display: none;">Update</button>
  </div>
  </div>
  <div style="padding-bottom:15px">
     <button id="close-song-info">Close</button>
  </div>
</article>
)
}`).appendTo('body');

$("#tag-selection").each(function(index, element) {
  $(this).select2({
    tags: true,
    width: "100%" // just for stack-snippet to show properly
  });
});
var selected = [];
console.log(tags[0].innerText);
console.log(tags[1].innerText);

$('#tag-selection').val([tags[0].innerText, tags[1].innerText]).trigger('change');

$(".js-programmatic-disable").on("click", function() {
  $("#tag-selection").prop("disabled", false);
  $("#tag-selection").prop("disabled", false);
});

$(".js-programmatic-enable").on("click", function() {
  $("#tag-selection").prop("disabled", true);
  $("#tag-selection").prop("disabled", true);
});

$("textarea").each(function () {
  this.setAttribute("style", "height:" + (this.scrollHeight) + "px;overflow-y:hidden;");
}).on("input", function () {
  this.style.height = "auto";
  this.style.height = (this.scrollHeight) + "px";
});

$("#close-song-info").click(function () {
  console.log("Going back");
  $("#main").fadeTo(200,1);
  $("#main").css("pointer-events", "auto");

  $("nav").fadeTo(200,1); 
  $("nav").css("pointer-events", "auto");

  $('#song-info').remove();
})
}