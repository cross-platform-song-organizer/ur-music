/* When clicking "view more", this stuff happens*/
var row;
var tags;

$('.view-more').click(function() {
  console.log("Fading main");
  $("#main").fadeTo(200,0.5); 
  $("#main").css("pointer-events", "none");

  $("nav").fadeTo(200,0.5); 
  $("nav").css("pointer-events", "none");

  /* Gather info from this row to use */
  row = $(this.closest('tr')).find('td');

  console.log(row);
  
  for (i = 1; i < row.length - 2;i++) {
    console.log(row[i].innerHTML);
  }

  tags = $(row[3]).find('div');
  console.log(tags[0].innerText + " " + tags[1].innerText);

  songDialog(); /* Open dialogue window w/ info gathered*/

  $("#song-info").fadeIn(200); /* Show window*/
})


/* Info pop-up when 'see more' is clicked */
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
  <table id="categories-button-table">
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
  <button class="more-button" id="categories-button"> View extra info </button>
  <!-- Tags -->
  <table id="tag-button-table">
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
  <button class="more-button" id="tag-button"> View tags </button>
  <button style="display: none;">Update</button>
  </div>
  </div>
  <div style="padding-bottom:15px">
     <button id="close-song-info">Close</button>
  </div>
</article>
)
}`).appendTo('body');
$('input[type="text"], textarea').attr('readonly','readonly'); //set to read-only
$('#categories-button-table').hide();
$('#tag-button-table').hide();

infoSetUp(); //all the other stuff for things to work

$("#close-song-info").click(function () {
  console.log("Going back");
  $("#main").fadeTo(200,1);
  $("#main").css("pointer-events", "auto");

  $("nav").fadeTo(200,1); 
  $("nav").css("pointer-events", "auto");

  $("#song-info").remove();
})
}

/* Sets up tag selection + resizable textareas */
function infoSetUp () {
   /* Everything to enable Select2 */
   $("#tag-selection").each(function(index, element) {
       $(this).select2({
         tags: true,
         disabled: true, //disable until the 'edit' button is pressed
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

     /* Sets up textareas to automatically resize as needed */

   $("textarea").each(function () {
       this.setAttribute("style", "height:" + (this.scrollHeight) + "px;overflow-y:hidden;");
   }).on("input", function () {
       this.style.height = "auto";
       this.style.height = (this.scrollHeight) + "px";
   });

//functionalities for viewing more stuff
$(".more-button").click(function () {
   console.log("Clicked the 'tags' button");
   var button_id = "#" + $(this).attr('id');
   var table_id = "#" + $(this).attr('id') + "-table";
   console.log(table_id);
   if (!$(this).hasClass("active")) {
      $(this).addClass("active");
      $(table_id).show();
      $(button_id).html("Hide " + ($(button_id).html()).substr($(button_id).html().indexOf("View") + 4));
      console.log(("#" + $(this).attr('id')));
   }
   else {
      $(this).removeClass("active");
      $(table_id).hide();
      $(button_id).html("View " + ($(button_id).html()).substr($(button_id).html().indexOf("Hide") + 4));
   }
})
}