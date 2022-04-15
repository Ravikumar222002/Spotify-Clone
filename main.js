  //Initilizing the variables

  let songIndex = 0;
  let currentTime;

  let audioElement = new Audio("http://kiwiforum.000webhostapp.com/AUD-20211020-WA0008.mp3");

  let masterPlay = document.getElementById("masterPlay");

  let progressBar = document.getElementById("myprogressbar");

  let gif = document.getElementById("gif");

  let songInner = Array.from(document.getElementsByClassName("songItem"));

  let songItemPlay = Array.from(document.getElementsByClassName("songItemPlay"));

  let songMasterName = document.getElementById("songMasterName");

  let previous = document.getElementById("previous");

  let next = document.getElementById("next");




  //song lists

  let songsArray = [
    {
      songNames: "Wallian.mp3",
      songNum: "0",
      songPath: "http://kiwiforum.000webhostapp.com/AUD-20211020-WA0008.mp3"
              },

    {
      songNames: "Kabhi Maine.mp3 ",
      songNum: "1",
      songPath: "https://isoseismal-dresses.000webhostapp.com/Kabhi%20maine%20chaha%20tujhe%20khud%20se%20jyada.mp3"
              },

    {
      songNames: "Tujhe Dekhe.mp3",
      songNum: "2",
      songPath: "https://isoseismal-dresses.000webhostapp.com/Tujhe%20Dekhe%20Bina%20Nind%20Nahi%20Aati%20Rington.mp3"
              },

    {
      songNames: "Dil ko karar.mp3",
      songNum: "3",
      songPath: "https://isoseismal-dresses.000webhostapp.com/yt1s-com-dil-ko-karaar%20aaya.mp3"
              },

    {
      songNames: "Teri meri gal.mp3",
      songNum: "4",
      songPath: "https://isoseismal-dresses.000webhostapp.com/teri-meri-gal-hogi-mashoor.mp3"
              },

    {
      songNames: "No Competition.mp3",
      songNum: "5",
      songPath: "https://isoseismal-dresses.000webhostapp.com/no-competition.mp3"

             }

             ]


  // Songs name visible   

  songInner.forEach((element, i) => {
    element.getElementsByClassName("songName")[0].innerHTML = songsArray[i].songNames;

  })

  // play/pause songs
  masterPlay.addEventListener("click", function() {

    if (audioElement.paused || audioElement.currentTime <= 0)
    {

      let promise = audioElement.play();

      promise.then(() =>
      {

        timeUpdate();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");

        gif.style.opacity = 1;
        songMasterName.innerHTML = songsArray[songIndex].songNames;


      })
    }

    else
    {
      audioElement.pause();
      masterPlay.classList.add("fa-play-circle");
      gif.style.opacity = 0;

    }

  });


  //update progressBar 
  function timeUpdate()
  {
    audioElement.addEventListener("timeupdate", function()
    {
      //console.log(audioElement.currentTime);
      progressBar = parseInt((audioElement.currentTime / audioElement.duration) * 100);

      myprogressbar.value = progressBar;

    });

  }

  // random seeking on seekbar
  progressBar.addEventListener("change", () => {

    audioElement.currentTime = ((myprogressbar.value * audioElement.duration) /
      100);

  });


  //when one play then all must be pause

  const makeAllPlay = () => {

    songItemPlay.forEach((e) => {

      e.classList.remove("fa-pause-circle");
      e.classList.add("fa-play-circle");
    })

  }

  songItemPlay.forEach((element) => {

    //console.log(element);
    element.addEventListener("click", (element) => {
      makeAllPlay();

      songIndex = parseInt(element.target.id);

      //ilteration of all songs 
      for (var i = 0; i < songsArray.length; i++)
      {


        if (songIndex == songsArray[i].songNum)
        {

          songMasterName.innerHTML = songsArray[i].songNames;

          // console.log(songName);

          if (audioElement.paused)
          {
            audioElement = new Audio(songsArray[i].songPath + "");

            audioElement.play();

            //songMasterName.innerHTML=songName;

            timeUpdate();
            masterPlay.classList.remove("fa-play-circle");
            masterPlay.classList.add("fa-pause-circle");
            element.target.classList.remove("fa-play-circle");
            element.target.classList.add("fa-pause-circle");

            gif.style.opacity = 1;

          }

          else
          {
            audioElement.pause();
            element.target.classList.remove("fa-pause-circle");
            element.target.classList.add("fa-play-circle")
            masterPlay.classList.remove("fa-pause-circle");
            masterPlay.classList.add("fa-play-circle");

            gif.style.opacity = 0;

          }
        }

      }


    })

  });



  //click on Next button    
  next.addEventListener("click", () => {


    if (songIndex >= songsArray.length)
    {
      songIndex = 0;
    }

    // if(songIndex<=songsArray.length)  
    else
    {
      songIndex += 1;
    }

    audioElement = new Audio(songsArray[songIndex].songPath + "");

    audioElement.play();

    songMasterName.innerHTML = songsArray[songIndex].songNames;

    timeUpdate();

    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");

    gif.style.opacity = 1;

  });


  //click on previous button    
  previous.addEventListener("click", () => {


    if (songIndex <= songsArray.length)
    {
      songIndex = 0;
    }

    // if(songIndex<=songsArray.length)  
    else
    {
      songIndex -= 1;
    }

    audioElement = new Audio(songsArray[songIndex].songPath + "");

    audioElement.play();
    songMasterName.innerHTML = songsArray[songIndex].songNames;

    timeUpdate();

    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");

    gif.style.opacity = 0;


  });
