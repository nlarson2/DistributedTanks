import { Login, Refresh, JoinServer } from './networking';
import { renderGame, startRendering } from './render';
import { loadAssets } from './assets'
import { startCapturingInput } from './input';

const playMenu = document.getElementById('play_menu');
const playButton = document.getElementById('play_button');
///const joinButton = document.getElementById('join_button');
const username = document.getElementById('in_game_name');
const canvas = document.getElementById('game_canvas');
const refreshServerList = document.getElementById('refresh_servers');
const joinRoomForm = document.getElementById("joinForm")

loadAssets();
const playNameForm = document.getElementById('playerNameForm');
const joinSeverForm = document.getElementById('joinServerForm');

playButton.onclick = () => {
   Login(username.value, startGame);
   playNameForm.style.display = "none";
   joinSeverForm.style.display = "block";
};
refreshServerList.onclick = () => {
   Refresh();
};

function UpdateListener(msg) {
   setTimeout(() => {
      for ( var i in msg) {
         var elem = document.getElementById("join"+msg[i])
         console.log(elem.value)
         elem.addEventListener('click', JoinServer)
         //.addEventListener('click', () => JoinServer)
      }
   }, 2000)
}

function JoinAServer() {
   //alert("WORKED")
}
function startGame() {
   playMenu.style.display = "none";
   canvas.style.display = "block";
   document.body.classList.remove('login-background');
   document.body.classList.add('game-background');
   startRendering();
   startCapturingInput();
}

joinRoomForm.addEventListener("submit", (data) => {
   event.preventDefault();
   var buttons = document.getElementsByClassName("join_button");
   for(var i in buttons){
      if(buttons[i].value == 0){
         //alert(buttons[i].id)
         JoinServer(buttons[i].id)
      }
   }
   console.log(data)
   console.log(data.srcElement)
   console.log(data.value)
})