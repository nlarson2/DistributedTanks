import { sendMouseInput } from './networking';

export var movements = {
    forward: false,
    backward: false,
    left: false,
    right: false,
    mouseAngle: 0,
}

export function startCapturingInput() {
  document.addEventListener('keydown', function(event) {
    switch (event.keyCode) {
      case 65: // A
        movements.left = true;
        break;
      case 87: // W
        movements.forward = true;
        break;
      case 68: // D
        movements.right = true;
        break;
      case 83: // S
        movements.backward = true;
        break;
    }
  });
  document.addEventListener('keyup', function(event) {
    switch (event.keyCode) {
      case 65: // A
        movements.left = false;
        break;
      case 87: // W
        movements.forward = false;
        break;
      case 68: // D
        movements.right = false;
        break;
      case 83: // S
        movements.backward = false;
        break;
    }
  });
  document.addEventListener('mousemove', function(event) {
    movements.mouseAngle = Math.atan2(event.clientX - window.innerWidth / 2, window.innerHeight / 2 - event.clientY);
  });
  document.addEventListener('click', function(event) {
    sendMouseInput(event);
  });
}