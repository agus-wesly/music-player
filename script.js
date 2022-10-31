const startBtn = document.querySelector(".start");
const disk = document.querySelector(".music-disk");
const wave = document.querySelector(".wave-container");
const audio = document.getElementById("audio");
const heading = document.querySelector(".music-header h1");
const artist = document.querySelector(".music-header p");
const startDuration = document.querySelector(".start-duration");
const totalDuration = document.querySelector(".total-duration");
const seekBar = document.querySelector("#duration");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

let currentSong = 0;
let song;
let started = false;

startBtn.addEventListener("click", () => {
  started = true;
  startBtn.classList.toggle("play");
  disk.classList.toggle("play");
  wave.classList.toggle("play");
  if (!audio.src) playMusic(currentSong);
  if (startBtn.classList.contains("play")) {
    audio.play();
  } else {
    pauseMusic();
  }
});

const prevFunc = () => {
  if (!started) {
    startBtn.classList.add("play");
    disk.classList.add("play");
    wave.classList.add("play");
    started = true;
  }
  if (audio.src) pauseMusic();
  if (currentSong > 0) {
    currentSong -= 1;
  } else {
    currentSong = songs.length - 1;
  }
  playMusic(currentSong);
  audio.play();
};

const nextFunc = () => {
  if (!started) {
    startBtn.classList.add("play");
    disk.classList.add("play");
    wave.classList.add("play");
    started = true;
  }
  if (audio.src) pauseMusic();
  if (currentSong < songs.length - 1) {
    currentSong += 1;
  } else {
    currentSong = 0;
  }
  playMusic(currentSong);
  audio.play();
};

prev.addEventListener("click", prevFunc);

next.addEventListener("click", nextFunc);

seekBar.addEventListener("change", () => {
  audio.currentTime = seekBar.value;
});

const playMusic = (i) => {
  currentSong = i;
  song = songs[i];
  disk.style.backgroundImage = `url("./${song.cover}")`;
  heading.innerHTML = song.name;
  artist.innerHTML = song.artist;
  audio.src = song.path;
  setTimeout(() => {
    startDuration.innerHTML = formatDuration(audio.duration);
    seekBar.max = Math.floor(audio.duration);
  }, 500);
};

const formatDuration = (duration) => {
  let minutes = Math.floor(duration / 60);
  if (minutes < 10) minutes = `0${minutes}`;
  let second = Math.floor(duration % 60);
  if (second < 10) second = `0${second}`;
  return `${minutes}:${second}`;
};

const pauseMusic = () => {
  audio.pause();
};

setInterval(() => {
  seekBar.value = audio.currentTime;
  totalDuration.innerHTML = formatDuration(audio.currentTime);
}, 500);

setInterval(() => {
  if (seekBar.max == Math.floor(audio.currentTime) && Math.floor(audio.currentTime) !== 0) {
    nextFunc();
  }
}, 10000);
