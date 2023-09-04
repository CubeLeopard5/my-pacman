# my-pacman

## Description

This project is about making a "Pacman" game. You can use z, q, s, d keys to move Pacman; avoid touching a ghost and get all candies.
You can edit some configuration variables in the ```config.js``` file.

## Ghost IA

The algorithm used to move ghosts is quite simple: at the start of the game, we choose a direction to go then we check if there is free space in another direction (note that it's not possible for the ghost to choose the opposite direction that he is going on), if yes, we randomly choose one (including the possibility to continue in the same direction).

## Features:

You can choose the number of ghost in the game (between 0 and 4) and also add or remove a ghost directly during the game.
You can use the default map or choose a randomly generated one.

## Project setup
```
yarn install
```

## Compiles and hot-reloads for development
```
yarn serve
```
