console.log('projekat 3');

const video = document.querySelector('#video');
const play = document.querySelector('.playIco');
const stopp = document.querySelector('.stopIco');
const progress = document.querySelector('#progress');
const time = document.querySelector('.timestamp');

// play and pause video
function toggleVideoStatus(){
   if(video.paused){
       video.play();
   }
   else{
       video.pause();
   }
}
// update play/pause icon
function updatePlayIcon(){
    if(video.paused){
        play.setAttribute('name','play-outline');
    }
    else{
        play.setAttribute('name','pause-outline');
    }
}
// update progress and timestamp
function updateProgress(){
    // console.log(video.currentTime);
    // console.log(video.duration);
    progress.value = (video.currentTime / video.duration) * 100;

    // get minutes
    let minutes = Math.floor(video.currentTime / 60);
    if(minutes < 10){
        minutes = '0' + minutes;
    }
    //get seconds
    let seconds = Math.floor(video.currentTime - minutes *60);
    if(seconds <10){
        seconds = '0' + seconds
    }

    timestamp.innerHTML = `${minutes}:${seconds}`;
}
// stop video
function stopVideo(){
    video.currentTime = 0;
    video.pause();
}

// set video time to progress 
function setVideoProgress(){
    video.currentTime = (progress.value * video.duration) / 100;
}
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);

play.addEventListener('click', toggleVideoStatus);
stopp.addEventListener('click', stopVideo);
progress.addEventListener('change', setVideoProgress);
