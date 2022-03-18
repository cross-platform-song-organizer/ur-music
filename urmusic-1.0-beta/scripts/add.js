// TODO: When a song is added here, it will also be added on our server

var tagsToAdd = [];

//Function to display the add song popup
function openAddPopup() {
    document.getElementById("add-popup").style.display = "inline-block";
}

//Function to clear tags information
function clearTagInput() {
    document.getElementById("tag-dropdown-input").value = "";
    document.getElementById("tags-to-add").textContent = "(no tags have been added)";
    this.tagsToAdd = [];
}

//Function to clear input fields
function clearInputFields() {
    document.getElementById("song-title-input").value = "";
    document.getElementById("artist-input").value = "";
    document.getElementById("album-input").value = "";
    document.getElementById("link-input").value = "";
    clearTagInput();
}

//Function to cancel adding a song
function cancelAdd() {
    document.getElementById("add-popup").style.display = "none";
    
    clearInputFields();
    
    //Collapse more categories and tags
    dismissSection(document.getElementById("more-categories-button"), document.getElementById("more-categories"), "+ View more categories");
    dismissSection(document.getElementById("tags-button"), document.getElementById("tags-within-add"), "+ View tags");   
}

//Function to save after adding a song
function saveAdd() {
    document.getElementById("add-popup").style.display = "none";

    var songTitleInput = document.getElementById("song-title-input").value;
    var artistInput = document.getElementById("artist-input").value;
    var albumInput = document.getElementById("album-input").value;
    var linkInput = document.getElementById("link-input").value;

    //Ensure required fields are filled out
    
    //TODO: Display error message to the user
    //TODO: figure out why the add popup closes even if there is an error
    if (songTitleInput == "" || artistInput == "") {
        if (songTitleInput == "") {
            console.log("Error: Please enter the title of the song.")
        }
        if (artistInput == "") {
            console.log("Error: Please enter the artist.")
        }

    } else {
        //TODO: save information from fields in server
        console.log("Saving song: " + songTitleInput);
        console.log("Artist: " + artistInput);
        console.log("Album: " + albumInput);

        //TODO: confirm that link is valid?
        console.log("Link: " + linkInput);
        console.log("Tags: " + tagsToAdd);

        clearInputFields();

        //Collapse more categories and tags
        dismissSection(document.getElementById("more-categories-button"), document.getElementById("more-categories"), "+ View more categories");
        dismissSection(document.getElementById("tags-button"), document.getElementById("tags-within-add"), "+ View tags");

        //TODO: Display confirmation message that song was added
    }
}

//General function to expand a section
function expandSection(button, div, dismissText) {
    div.style.display = "inline-block";
    button.innerText = dismissText;
}
//General function to dismiss a section
function dismissSection(button, div, viewMoreText) {
    div.style.display = "none";
    button.innerText = viewMoreText;
}

//General function to open and close a view when a button is clicked
function toggleView(buttonId, divId, viewMoreText, dismissText) {
    var button = document.getElementById(buttonId);
    var div = document.getElementById(divId);
    
    if (div.style.display === "none") {
        expandSection(button, div, dismissText);
    } else {
        dismissSection(button, div, viewMoreText)
    }
}
//Function to toggle the view of additional input fields when adding a song
function moreCategoriesToggle() {
    buttonId = "more-categories-button";
    divId = "more-categories";
    viewMoreText = "+ View more categories";
    dismissText = "- Dismiss categories";
    toggleView(buttonId, divId, viewMoreText, dismissText);
}
//Function to toggle the view of tags when adding a song
function tagsToggle() {
    buttonId = "tags-button";
    divId = "tags-within-add";
    viewMoreText = "+ View tags";
    dismissText = "- Dismiss tags";
    toggleView(buttonId, divId, viewMoreText, dismissText);
}

//Function to show dropdown menu options when adding tags
function showDropdownOptions() {
    var dropdownOptions = document.getElementById("tag-dropdown-options");
    dropdownOptions.style.display = "block";
    dropdownOptions.addEventListener("mousedown",
    function(event) {
        event.preventDefault();
    });

}
//Function to hide dropdown menu options when adding tags
function hideDropdownOptions() {
    document.getElementById("tag-dropdown-options").style.display = "none";
}

//Function to search for tags in the dropdown menu
//Referenced https://www.w3schools.com/howto/howto_js_filter_dropdown.asp
function filterTagSearch() {
    var input = document.getElementById("tag-dropdown-input");
    var uppercaseInput = input.value.toUpperCase();
    var div = document.getElementById("tag-dropdown");
    p = div.getElementsByTagName("p");

    for (i = 0; i < p.length; i++) {
        textValue = p[i].textContent || p[i].innerText;
        if (textValue.toUpperCase().indexOf(uppercaseInput) > -1) {
            p[i].style.display = "";
        } else {
            p[i].style.display = "none"
        }
    }
}

//Function to add a tag from the dropdown menu to the list
function addExistingTag(tagText) {

    //Check if tag has already been added
    if (tagsToAdd.includes(tagText)) {

        //TODO: Only display tags that haven't already been added
        //Also should prevent the user from typing in a tag they have already added
        console.log("Error: this tag has already been added");
    } else {

        //Add tag to list
        tagsToAdd.push(tagText);

        //Display updated list of tags
        var tagList = tagsToAdd.toString();
        tagList = tagList.replaceAll(",", ", ");
        document.getElementById("tags-to-add").textContent = tagList;

        //Hide dropdown options and clear input field
        document.getElementById("tag-dropdown-options").value = "";
        document.getElementById("tag-dropdown-input").blur();
        hideDropdownOptions();
    }
}