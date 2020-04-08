import tank from '../../public/assets/tank.svg'
import bullet from '../../public/assets/bullet.svg'
import tile from '../../public/assets/images/tile.jpg'
import wall from '../../public/assets/images/wall.jpg'
const ASSET_NAMES = ['tank.svg', 'bullet.svg', 'tile.jpg', 'wall.jpg'];
const assets = [];

export function loadAssets() {
  //load tank.svg
  var img1 = new Image();
  img1.onload = () => {
    console.log(`Downloading ${tank}`);
    assets[ASSET_NAMES[0]] = img1;
  }
  img1.src = `/${tank}`;

  //load bullet.svg
  var img2 = new Image();
  img2.onload = () => {
    console.log(`Downloading ${bullet}`);
    assets[ASSET_NAMES[1]] = img2;
  }
  img2.src = `/${bullet}`;

  //load tile.jpg
  var img3 = new Image();
  img3.onload = () => {
    console.log(`Downloading ${tile}`);
    assets[ASSET_NAMES[2]] = img3;
  }
  img3.src = `/${tile}`;

  //load wall.jpg
  var img4 = new Image();
  img4.onload = () => {
    console.log(`Downloading ${wall}`);
    assets[ASSET_NAMES[3]] = img4;
  }
  img4.src = `/${wall}`;
}

export const getAsset = assetName => assets[assetName];