import { Login } from './networking';
import { renderGame, startRendering } from './render';
import { loadAssets } from './assets'
import { startCapturingInput } from './input';

const playMenu = document.getElementById('play_menu');
const playButton = document.getElementById('play_button');
const username = document.getElementById('in_game_name');
const canvas = document.getElementById('game_canvas');

loadAssets();

playButton.onclick = () => {
   Login(username.value);
   startGame();
};

function startGame() {
   playMenu.style.display = "none";
   canvas.style.display = "block";
   document.body.classList.remove('login-background');
   document.body.classList.add('game-background');
   startRendering();
   startCapturingInput();
}