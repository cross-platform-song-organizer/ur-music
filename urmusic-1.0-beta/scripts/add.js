// TODO: When a song is added here, it will also be added on our server

//Function to display the add song popup
function openAddPopup() {
    document.getElementById("add-popup").style.display = "inline-block";
}

//Function to clear input fields
function clearInputFields() {
    document.getElementById("song-title-input").value = "";
    document.getElementById("artist-input").value = "";
    document.getElementById("album-input").value = "";
    document.getElementById("link-input").value = "";
    document.getElementById("tag-input").value = "";
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
    var tagsInput = document.getElementById("tag-input").value;
    
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
        console.log("Link: " + linkInput);
        console.log("Tags: " + tagsInput);

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