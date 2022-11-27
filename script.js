console.log("Welcome to Aqquilin's Spotify");

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById("masterPlay");
gif = document.getElementById("gif");
let watchAssistant =0;
console.log(masterPlay);
let myProgressBar = document.getElementById("myProgressBar");
// let timeSlider = document.getElementsByClassName(`timestamp${songIndex}`)
let songItems = Array.from(document.getElementsByClassName("songItem"));

let song = [
    {songName: "Sea Shanty Medley - Home Free", filePath: "songs/1.mp3" , coverPath: "images/song1.jfif", time:"03.52"},
    {songName: "Ae Watan - Sunidhi Chauhan", filePath: "songs/2.mp3" , coverPath: "images/song2.jfif", time:"02.36"},
    {songName: "Parinda - Amaal Malik", filePath: "songs/3.mp3" , coverPath: "images/song3.jfif", time:"05.23"},
    {songName: "Jai Bhavani Jai Shivaji - Memento Mori", filePath: "songs/4.mp3" , coverPath: "images/song4.jfif", time:"02.14"},
    {songName: "Khalaouni N3inch - Najwa Farouk ", filePath: "songs/5.mp3" , coverPath: "images/song5.jfif", time:"03.10"},
    {songName: "Aarambh - Piyush Mishra", filePath: "songs/6.mp3" , coverPath: "images/song6.jfif", time:"04.36"},
    {songName: "Kar Har Maidan Fateh - Sukhwindar Singh ", filePath: "songs/7.mp3" , coverPath: "images/song7.jfif", time:"03.31"},
    {songName: "Cradles - Sub Urban ", filePath: "songs/8.mp3" , coverPath: "images/song8.jfif", time:"03.38"}
]

//give name of songs at front end from javascript
songItems.forEach((element, i)=>{                        //adding name, cover and time in songlist
    //console.log(element, i);
     element.getElementsByTagName("img")[0].src = song[i].coverPath;
     element.getElementsByClassName("songNameInfo")[0].innerText = song[i].songName;
     element.getElementsByClassName(`timestamp${i+1}`)[0].innerText = song[i].time;
})

//Handle play pause click
masterPlay.addEventListener('click', ()=>{                //event to main play pause button
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        finishTime.innerText = song[songIndex].time;        //update finishtime with respective song
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;

        //to update the play pause button in songlist simultaneously
        let text = songIndex.toString();
        var shraddha = document.getElementById(text);
        shraddha.classList.remove("fa-play-circle");
        shraddha.classList.add("fa-pause-circle");

        console.log("Playing");
    }else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;

        //to update the play pause button in songlist simultaneously
        let text = songIndex.toString();
        var shraddha = document.getElementById(text);
        shraddha.classList.remove('fa-pause-circle');
        shraddha.classList.add("fa-play-circle");

    }
})

audioElement.addEventListener("timeupdate", ()=>{
    //console.log("Timeupdate");
    //update seek bar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    //console.log(progress);
    myProgressBar.value = progress;
    timing  = audioElement.currentTime;

    timing = runTime.offsetWidth - finishTime.offsetWidth;
    runTime.innerText = Math.round(Math.round(audioElement.currentTime)/60) +((Math.round(audioElement.currentTime))%60)*0.01;
    // runTime.innerText = (0.1*parseInt(timing/60)*0.01*parseInt( timing%60)).toPrecision(2);
})

//to update audio time whenever we click anywhere on progressbar..
myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value*audioElement.duration/100;
})



/*
audioElement.addEventListener("timeupdate", ()=>{
    if(runTime.innerText==finishTime.innerText){
        let text = songIndex.toString();
        var shraddha = document.getElementById(text);
        console.log(shraddha);
        shraddha.classList.remove('fa-pause-circle');
        shraddha.classList.add("fa-play-circle");


        songIndex+=1;


        if(songIndex>=7){
            songIndex=0;
        }else{
            songIndex +=1;
        }
        audioElement.src = `songs/${songIndex+1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterSongInfo.innerText = song[songIndex].songName;
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");

        text = songIndex.toString();
        shraddha = document.getElementById(text);
        shraddha.classList.remove('fa-play-circle');
        shraddha.classList.add("fa-pause-circle");
    }
})
*/



const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
       // console.log("updating play-pause of others..1")
        element.classList.remove("fa-pause-circle");
       // console.log("updating play-pause of others..2")
        element.classList.add("fa-play-circle");

      //  console.log("updating play-pause of others..3")
    })
}

//here we can do something with currentTime, in order handle the click on button other than that of playing song
Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.addEventListener("click", (e)=>{
      // console.log(e);
      let x = e.target.classList.contains("fa-play-circle");
        if( x===true || audioElement.paused || audioElement.currentTime<=0){
            makeAllPlays();

            songIndex = parseInt(e.target.id);
            console.log(songIndex);
            e.target.classList.remove("fa-play-circle");
            e.target.classList.add("fa-pause-circle");
            audioElement.src = `songs/${songIndex+1}.mp3`;
            finishTime.innerText = song[songIndex].time;
            //audioElement.currentTime = 0;
            audioElement.currentTime = 0;
            audioElement.play();
            console.log("Playing...");
            gif.style.opacity = 1;
            masterSongInfo.innerText = song[songIndex].songName;
            masterPlay.classList.remove("fa-play-circle");
            masterPlay.classList.add("fa-pause-circle");
        }else{
            // watchAssistant = audioElement.currentTime;
            audioElement.pause();
            songIndex = parseInt(e.target.id);
            console.log(songIndex);
            e.target.classList.remove("fa-pause-circle");
            e.target.classList.add("fa-play-circle");
            audioElement.src = `songs/${songIndex+1}.mp3`;
            finishTime.innerText = song[songIndex].time;
            console.log("Paused...");
            gif.style.opacity = 0;
            masterSongInfo.innerText = song[songIndex].songName;
            masterPlay.classList.remove("fa-pause-circle");
            masterPlay.classList.add("fa-play-circle");
        }

    })
})


document.getElementById('next').addEventListener('click', ()=>{

        let text = songIndex.toString();
        var shraddha = document.getElementById(text);
        console.log(shraddha);
        shraddha.classList.remove('fa-pause-circle');
        shraddha.classList.add("fa-play-circle");
    if(songIndex>=7){
        songIndex=0;
    }else{
        songIndex +=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterSongInfo.innerText = song[songIndex].songName;
    finishTime.innerText = song[songIndex].time;
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");

    text = songIndex.toString();
    shraddha = document.getElementById(text);
    shraddha.classList.remove('fa-play-circle');
    shraddha.classList.add("fa-pause-circle");
})



document.getElementById('previous').addEventListener('click', ()=>{
    let text = songIndex.toString();
        var shraddha = document.getElementById(text);
        console.log(shraddha);
        shraddha.classList.remove('fa-pause-circle');
        shraddha.classList.add("fa-play-circle");


    if(songIndex<=0){
        songIndex=7;
    }else{
        songIndex -=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterSongInfo.innerText = song[songIndex].songName;
    finishTime.innerText = song[songIndex].time;
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");

    text = songIndex.toString();
    shraddha = document.getElementById(text);
    shraddha.classList.remove('fa-play-circle');
    shraddha.classList.add("fa-pause-circle");
})
