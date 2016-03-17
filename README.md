# Goku-Adventures (project in process)

A 2D game based on Dragon Ball, developed using JQUERY and JQUERY-UI

### Lien demo

http://vacherot.etudiant-eemi.com/perso/dossier/malcolm0810/private/s2705/js_games/goku_adventures/

=======

### Description

#### Keyboard commands:

- `a`: attack with the magic baton
- `z`: attack with a kicked energy ball
- `e`: attack with one-hand kamehameha
- `e`: attack based on a ki-combo
- `top-arrow`: moving upward
- `bottom-arrow`: moving downward
- `left-arrow`: accelarate with high-speed background effect
- `right-arrow`: stop the accelarating movement
- `play-pause-button`: pause/play both music and game
- `mute-button`: mute the music


#### Goal:

You are Sangoku, and for the moment, you have to 
- Avoid "negativeEnergyBalls" (the red ones)
- Kill the "freezers" (ennemies) with the "one-hand-kamehameha" using key `e`
- Catch all the "Crystal ball" (the orange ones)

=======

### Location of files

```
goku_adventures/
  |
  |- views/
  |  |- pages/
  |  |  |- game/
  |  |  |  |- <game.twig> // html
  |  |  |
  |  |- <layout_game> // layout avec les links
  |
  |- www/
  |  |- assets/
  |  |  |- bootstrap/
  |  |  |- css/
  |  |  |  |- <game.css> // fichier css issue de la compilation de <game.less>
  |  |  |- fonts/
  |  |  |- js/
  |  |  |  |- <game.js> // fichier js pour le développement du jeu et l'animation de l'interface graphique
  |  |  |- less/
  |  |  |  |- <game.less> // fichier less pour le design de l'interface graphique
  |  |  |- pictures/
  |  |  |  |- <images> // images
  |  |  |
  |  |
  |
  |- index
```

=======

