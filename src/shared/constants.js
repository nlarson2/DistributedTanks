// some code snippets received from:
// https://github.com/vzhou842/example-.io-game/blob/master/src/client/assets.js

module.exports = Object.freeze({
    
    MAX_ANGLE: Math.PI,
    MIN_ANGLE: -1*Math.PI,

    PLAYER_SPEED: 3.0,
    PLAYER_TURN_SPEED: 5.0,
    PLAYER_WIDTH: 30,
    PLAYER_HEIGHT: 45,
    PLAYER_FIRECOOLDOWN: 0.2,

    BULLET_SPEED: 10.0,
    BULLET_LIFETIME: 5.0,
    BULLET_CRITICALANGLE: 45,
    BULLET_DAMAGE: 30,

    RENDER_DELAY: 100,
    FPS: 60,

    MAP_SIZE: 2000,

    FREEFORALL: 1,
    TDM: 2,

    MSG_TYPES: {
      JOIN_GAME: 'join_game',
      REM_USER: 'rem_user',
      GAME_UPDATE: 'update',
      KBINPUT: 'kbinput',
      MINPUT: 'minput',
      GAME_OVER: 'dead',
    },
});