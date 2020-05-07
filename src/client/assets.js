import tank from '../../public/assets/tank.svg'
import bullet from '../../public/assets/bullet.svg'
import tile from '../../public/assets/images/tile.jpg'
import wall from '../../public/assets/images/wall.jpg'
import brick from '../../public/assets/images/brick.png'
import icy from '../../public/assets/images/icy.png'
import lava from '../../public/assets/images/lava.png' 
const ASSET_NAMES = ['tank.svg', 'bullet.svg', 'tile.jpg', 'wall.jpg', 'brick.png', 'icy.png', 'lava.png'];
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

   //load wall.jpg
   var img5 = new Image();
   img5.onload = () => {
     console.log(`Downloading ${brick}`);
     assets[ASSET_NAMES[4]] = img5;
   }
   img5.src = `/${brick}`;

   //load icy.jpg
   var img6 = new Image();
   img6.onload = () => {
     console.log(`Downloading ${icy}`);
     assets[ASSET_NAMES[5]] = img6;
   }
   img6.src = `/${icy}`;
     //load lava.jpg
     var img7 = new Image();
     img7.onload = () => {
       console.log(`Downloading ${lava}`);
       assets[ASSET_NAMES[6]] = img7;
     }
     img7.src = `/${lava}`;
}

export const getAsset = assetName => assets[assetName];