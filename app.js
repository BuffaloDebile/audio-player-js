const musicData = [
  { title: 'Solar', artist: 'Betical', id: 1 },
  { title: 'Electric-Feel', artist: 'TEEMID', id: 2 },
  { title: 'Aurora', artist: 'SLUMB', id: 3 },
  { title: 'Lost-Colours', artist: 'Fakear', id: 4 },
];

const musicPlayer = document.querySelector('audio');
const musicTitle = document.querySelector('.music-title');
const artistName = document.querySelector('.artist-name');
const thumbnail = document.querySelector('.thumbnail');
const indexTxt = document.querySelector('.current-index');

let currentMusicIndex = 1;

function populateUI({ title, artist }) {
  musicTitle.textContent = title;
  artistName.textContent = artist;
  thumbnail.src = `./ressources/thumbs/${title}.png`;
  musicPlayer.src = `./ressources/music/${title}.mp3`;
  indexTxt.textContent = `${currentMusicIndex}/${musicData.length}`;
}

populateUI(musicData);

populateUI(musicData[currentMusicIndex - 1]);

const playBtn = document.querySelector('.play-btn');

playBtn.addEventListener('click', handlePlayPause);

function handlePlayPause() {
  if (musicPlayer.paused) play();
  else {
    pause();
  }
}

function play() {
  playBtn.querySelector('img').src = './ressources/icons/pause-icon.svg';
  musicPlayer.play();
}

function pause() {
  playBtn.querySelector('img').src = './ressources/icons/play-icon.svg';
  musicPlayer.pause();
}

const displayCurrentTime = document.querySelector('.current-time');
const durationTime = document.querySelector('.duration-time');
const progressBar = document.querySelector('.progress-bar');

musicPlayer.addEventListener('loadeddata', fillDurationVariables);

let current;
let totalDuration;

function fillDurationVariables() {
  current = musicPlayer.currentTime;
  totalDuration = musicPlayer.duration;

  formatValue(current, displayCurrentTime);
  formatValue(totalDuration, durationTime);
}

function formatValue(val, element) {
  const currentMin = Math.trunc(val / 60);
  let currentSec = Math.trunc(val % 60);

  if (currentSec < 10) {
    currentSec = `0${currentSec}`;
  }

  element.textContent = `${currentMin}:${currentSec}`;
}

musicPlayer.addEventListener('timeupdate', updateProgress);

function updateProgress(e) {
  current = e.srcElement.currentTime;
  formatValue(current, displayCurrentTime);

  const progressValue = current / totalDuration;
  progressBar.style.transform = `scaleX(${progressValue})`;
}
