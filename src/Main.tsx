import React from 'react';
import ReactDOM from 'react-dom';
import * as Phaser from 'phaser';
import Scenes from './scenes';
import App from './ui/App';

const gameConfig: Phaser.Types.Core.GameConfig = {
    title: 'Sample',
    parent: 'game-content',
    type: Phaser.AUTO,
    scale: {
        width: window.innerWidth,
        height: window.innerHeight,
    },
    scene: Scenes,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
        },
    },
    backgroundColor: '#000000',
};

const game = new Phaser.Game(gameConfig);

window.addEventListener('resize', () => {
    game.scale.refresh();
});

ReactDOM.render(<App />, document.getElementById('react-content'));
