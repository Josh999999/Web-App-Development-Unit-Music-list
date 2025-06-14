/**
* Assignment - Application of Programming Principles
* @author Joshua Morgan
*/

document.getElementById("btnDeleteEntry").addEventListener("click", deleteSong);

document.getElementById("btnAddEntry").addEventListener("click", addsong);

document.getElementById("songList").addEventListener('click', songPopulate);

document.getElementById("btnUploadSongs").addEventListener('click', uploadSongList);

document.getElementById("btnUpdate").addEventListener('click', updateSelected);

document.getElementById("btnUpdateEntry2").addEventListener('click', update);

document.getElementById("btnInitiateAddEntry").addEventListener('click', initiateAdd);

document.getElementById("btnCancelUpdateEntry2").addEventListener('click', cancelUpdate);

document.getElementById("btnCancelAddEntry").addEventListener('click', cancelAdd);


document.addEventListener("DOMContentLoaded", function(){
  console.log("Content loaded")
  getSongList();
  console.log("Content loaded")
});



function generateNewKey(){
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
};

const currentSelectedId = "";
const currentSelectedSong = "";
const currentSelectedArtist = "";


function updateSelected(){
  var updateID = document.getElementById("idEntry").value;
  var updateArtist = document.getElementById("artistEntry").value;
  var updateSong = document.getElementById("songTitle").value;
  window.currentSelectedId = updateID;
  window.currentSelectedSong = updateSong;
  window.currentSelectedArtist = updateArtist;
  
  if (updateID != ""){
    document.getElementById("UpdateSong").removeAttribute('hidden');
    document.getElementById("idUpdate").value = updateID;
    document.getElementById("artistUpdate").value = updateArtist;
    document.getElementById("songUpdate").value = updateSong;
  }
  else{
    alert("Please select a valid song");
  }
}



function update(){
  let idToUpdate1 = document.getElementById("idUpdate").value;
  let idToUpdate2 = document.getElementById(idToUpdate1);
  let artistToUpdate = document.getElementById("artistUpdate").value;
  let songToUpdate = document.getElementById("songUpdate").value;
  idToUpdate2.setAttribute('artist', artistToUpdate);
  idToUpdate2.setAttribute('song', songToUpdate);
  idToUpdate2.innerText = songToUpdate;
  document.getElementById("UpdateSong").setAttribute('hidden', true);
  alert("|" + window.currentSelectedSong + 
        "| by |" + window.currentSelectedArtist + 
        "| updated to -----> |" + songToUpdate + 
        "| by |" + artistToUpdate + "|")
  clearUpdate();
  clearSongSection();
}



function clearUpdate(){
  document.getElementById("idUpdate").value = "";
  document.getElementById("artistUpdate").value = "";
  document.getElementById("songUpdate").value = "";
}



function initiateAdd(){
  document.getElementById("addSong").removeAttribute('hidden');
  //removes the hidden attribute (shows the hidden HTML)
}



function clearAddedSong(){
  document.getElementById("artistAdd").value = "";
  document.getElementById("songAdd").value = "";
  document.getElementById("addSong").setAttribute('hidden', true);
  //Adds the hidden attribute to the HTML element
}



function cancelUpdate(){
  document.getElementById("UpdateSong").setAttribute('hidden', true);
  document.getElementById("idUpdate").value = "";
  document.getElementById("artistUpdate").value = "";
  document.getElementById("songUpdate").value = "";
}



function cancelAdd(){
  document.getElementById("artistAdd").value = "";
  document.getElementById("songAdd").value = "";
  document.getElementById("addSong").setAttribute('hidden', true);
}



function clearSongSection(){
  document.getElementById("idEntry").value = "";
  //Gets the element by its id 'idEntry' and sets it value to "" a.k.a nothing
  document.getElementById("artistEntry").value = "";
  document.getElementById("songTitle").value = "";
}



function deleteSong(){
  let deletedId = document.getElementById("idEntry").value;
  //Gets the value from the 'idEntry' box in the 'Selected song' section of the pgae
  let UpdateId = document.getElementById("idUpdate").value;
  //Gets the value from the 'idUpdate' box in the 'Update song' section of the pgae
  let delSong = document.getElementById(deletedId).getAttribute('song');
  let delArtist = document.getElementById(deletedId).getAttribute('artist');
  //These are used for the alert message
  if(deletedId != ""){//Removes the element with the selected ID
    document.getElementById(deletedId).remove();
    clearSongSection();
    alert("|" + delSong + "| by |" + delArtist + "| deleted");
  }
  else{
    alert("Please select a valid entry to delete");
  }
  if(deletedId == UpdateId){
    cancelUpdate()
    //Cancels the update if the Id in the Update Box is the same as the one deleted
  }
}



function addsong(){
  let newArtistName = document.getElementById("artistAdd").value;
  //Takes the current values out of these text boxes from the 'Add Item' section
  if(newArtistName != "" || newSongName != ""){ //Checks if these are empty
    let newID = generateNewKey();
    let newSongName = document.getElementById("songAdd").value;
    let newElement = document.createElement('li');
    //create new li item
    newElement.id = newID;
    //Sets the unique key to the id for the list element
    newElement.setAttribute("song", newSongName);
    newElement.setAttribute("artist", newArtistName);
    //Sets new attribute to the ones in the add song section
    newElement.innerText = newSongName;
    //Sets the innerText of the newEntry to 'newSongName'
    document.getElementById("songList").appendChild(newElement);
    //appends the 'songList' list element to the overall list
    clearAddedSong();
    alert("|" + newSongName + "| by |" + newArtistName + "| added to song list");
  }
  else if(newArtistName == ""){
    alert("Please enter an Artist");
  }
  else{
    alert("Please enter a song")
  }
}



function songPopulate(event){
  //e is the short var reference for event, Every event handling function receives an event object, this object has a bunch of variables and methods surrounding the event that created it.
  clearSongSection();
  //Funtion that clears the 'Selected Entry' section of the site
  let idEntry = event.target.id;
  //gets the id of the element on which the event originally occurred
  let artistEntry = event.target.getAttribute("artist")
  let songNameEntry = event.target.getAttribute("song")
  document.getElementById("idEntry").value = idEntry;
  //Sets the value of the 'idEntry' box in the 'Selected Entry' to the id of the item where the event occured
  document.getElementById("artistEntry").value = artistEntry;
  document.getElementById("songTitle").value = songNameEntry;
}



function getSongList(){
  let XML = new XMLHttpRequest();
  //The XMLHttpRequest object can be used to request data from a web server
  XML.onload = function(){
  //The onload property specifices the funtion to be executed once the request has fully loaded (ready):
    if (this.readyState == 4 && this.status == 200){//Check readyState of the request = 4 and the status = 200 (a.k.a OK)
      let songResult = JSON.parse(this.responseText);
      //Converting the responseText from the request from JSON to a js object
      let songList = "";
      for(let item of songResult.songs){//for each item in the js objects .songs attribute
        songList = songList + 
          "<li song='" + String(item.song) + 
          "' artist='" + String(item.artist) + 
          "' id='" + String(generateNewKey()) + 
          "''>" + String(item.song) + 
          "</li>";}
        //Creates A HTML list element with all the attributes from the current song object (repeates for every song object)
      
    document.getElementById("songList").innerHTML = songList;
    //Adds the new list elements to the "songList" ul
    }
    else{
      console.log("Upload didn't work")
    }
  }
  XML.open("GET", "/api/songList", true);
  //open(method, url, async) to configure the URL
  XML.send();
  //Send the XML object to the Server
}



function uploadSongList(){
  let listupload = document.getElementById("songList");
  let songEntriesList = listupload.getElementsByTagName("li");
  //Gets all li elements in an array that are in element 'songList'
  var uploadSongList= {}; //Creates and object
  uploadSongList.songs = []; //Add attribute .songs

  for (let index = 0; index < songEntriesList.length ; index++){//Repeat for length of songEntriesList
    let songsObject = {}
    songsObject.song = songEntriesList[index].getAttribute("song");
    songsObject.artist = songEntriesList[index].getAttribute("artist");
    uploadSongList.songs.push(songsObject);
    //Creates and object containing the Artsit and song attributes for the lit element and pushes them into the uploadSongList Object (object within and object)
  }

  let XML = new XMLHttpRequest();
  let path = "/api/songList";
  //New XML request and URL / path

  XML.onreadystatechange = function(){//Coverd in the GET funtion
    let strResponse = "Error: Didn't respond";
    if (this.readyState == 4 && this.status == 200){
      responseText = JSON.parse(this.responseText);
      console.log(strResponse.message);
    }
  };
  XML.open("PUT", path, true);
  //open(method, url, async) to configure the URL
  XML.setRequestHeader("Content-type", "application/json");//setting the header of the request
  let songs = JSON.stringify(uploadSongList);
  //.stringingy converts a js object into a JSON string
  XML.send(songs);
  //Send the XML object to the Server with the songs object
}