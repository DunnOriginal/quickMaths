import Phaser from 'phaser';
import BootScene from './BootScene';
import StoryScene from './StoryText';
import PlayScene from './PlayScene';
import MenuScene from './MenuScene';
import EndScene from './EndScene';

export default {
  type: Phaser.CANVAS,
  width: 800,
  height: 600,
  title: 'Quick Math',
  url: 'https://github.com/DunnOriginal/quickMaths',
  banner: { text: 'white', background: ['#FD7400', '#FFE11A', '#BEDB39', '#1F8A70', '#004358'] },
  scene: [BootScene, StoryScene, MenuScene, PlayScene, EndScene]
};
