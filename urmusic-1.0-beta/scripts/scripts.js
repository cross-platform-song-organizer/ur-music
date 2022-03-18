/* Sets up tag selection + resizable textareas */
function infoSetUp () {
    /* Everything to enable Select2 */
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

      /* Sets up textareas to automatically resize as needed */

    $("textarea").each(function () {
        this.setAttribute("style", "height:" + (this.scrollHeight) + "px;overflow-y:hidden;");
    }).on("input", function () {
        this.style.height = "auto";
        this.style.height = (this.scrollHeight) + "px";
    });
}