$(document).ready(function(){

  /**
  *
  *
  *
  * Définition des variables
  *
  *
  *
  */
  var $game = $('#game');
  var $allGameComponents = $('#game-background, #game-zone, #game-header, #game-helper');
  var $gameNotice = $('#game-notice');
  var $gameStartBtn = $('#game-notice .btn-start');
  var $gameContainer = $('#game-container');
  var $gameHeader = $('#game-header');
  var $gameHelper = $('#game-helper');
  var gameHeaderHeight = $gameHeader.height();
  var $lifeBar = $('#life-bar');
  var $gameBackground = $('#game-background');
  var backgroundNormalSpeed = 50;
  var highSpeedDeplacementValue = 900;
  var $btnPlayPause = $('#btn-play-pause');
  var $btnMute = $('#btn-mute');
  var $gameZone = $('#game-zone');
  var gameZoneHeight = $gameZone.height();
  var $goku = $('#goku');
  var $gokuFrontBlock = $('#goku-front-block');
  var $gokuImg = $('#goku img');
  var gokuWidth = $goku.width();
  var gokuHeight = $goku.height();
  var amplitudeMovement = 60;
  var limitTop = $game.offset().top + gameHeaderHeight + amplitudeMovement/2;
  var limitBottom = $game.offset().top + gameHeaderHeight + gameZoneHeight - amplitudeMovement/2;
  var $negativeEnergyBall = $('.negative-energy-ball');
  var negativeEnergyBallsSpeed = 2500;
  var negativeEnergyBallsHighSpeed = 1500;
  var negativeEnergyBallsHeight = $negativeEnergyBall.height();
  var negativeEnergyBallsWidth = $negativeEnergyBall.width();
  var negativeEnergyBallAppearanceInterval = 2000;
  var $crystalBall = $('.crystal-ball');
  var crystalBallAppearanceInterval = 10000;
  var crystalBallSpeed = 5000;
  var crystalBallHighSpeed = 1500;
  var $freiza = $('.freiza');
  var freizaAppearanceInterval = 5000;
  var freizaSpeed = 5000
  var $btnPlayPauseHelper = $('.help-play-pause-btn');



  setTimeout(function(){$btnPlayPause.trigger('click')}, 100);


  $gameStartBtn.on('click', function(){
    $gameNotice.fadeOut(800, function(){ 
      $allGameComponents.fadeIn(800);
      $btnPlayPause.trigger('click');
    })
  })

  $('.dragon_ball_logo').fadeIn(800, function(){
    $('.kid_goku').fadeIn(800, function(){
      $('#btn-wrapper').fadeIn(800, function(){
        levitate($('.kid_goku'), 20);
      })
    })
  })



  /**
  *
  *
  *
  * Gestion actions de sangoku via keydown on keyboard
  *
  *
  *
  */
  $(document).on('keydown', function(e){

    if(!$gameZone.hasClass('inPaused')){

      /**
      *
      * Déplacements verticaux de sangoku
      *
      */
      if(!$goku.hasClass('is_attacking')){
        var gokuLeftLocation = $goku.offset().left;
        var gokuTopLocation = $goku.offset().top;
        var gokuRightLocation = gokuLeftLocation + gokuWidth;
        var gokuBottomLocation = gokuTopLocation + gokuHeight;

        controlCharacterMovement(e, 38, 'top', gokuTopLocation > limitTop, '-='+amplitudeMovement+'px');
        controlCharacterMovement(e, 40, 'top', gokuBottomLocation < limitBottom, '+='+amplitudeMovement+'px');
      }


      /**
      *
      * Activer le déplacement à grande vitesse de sangoku (effet défilement background)
      *
      */
      if(e.which === 39){
        if(!$gameBackground.hasClass('is_moving')){
          clearInterval(backgroundMovement);
          highSpeedMovingBackground($gameBackground, highSpeedDeplacementValue);
          clearInterval(negativeEnergyBallAppearance);
          negativeEnergyBallAppearance = setInterval(generateInMap, negativeEnergyBallAppearanceInterval, $negativeEnergyBall, negativeEnergyBallsHighSpeed, 'swing');
          clearInterval(crystalBallAppearance);
          crystalBallAppearance = setInterval(generateInMap, crystalBallAppearanceInterval, $crystalBall, crystalBallHighSpeed, 'linear');
          $gameBackground.addClass('is_moving');
        }
      }
      /**
      *
      * Arrêter le déplacement à grande vitesse de sangoku (stop effet défilement background)
      *
      */
      if(e.which === 37){
        if($gameBackground.hasClass('is_moving')){
          $gameBackground.hasClass('askedForStop') && $gameBackground.removeClass('askedForStop').closest('#game-container').find('.help-play-pause-btn').text('');
          $gameBackground.stop();
          backgroundMovement = setInterval(movingBackground, backgroundNormalSpeed, backgroundNormalSpeed);
          clearInterval(negativeEnergyBallAppearance);
          negativeEnergyBallAppearance = setInterval(generateInMap, negativeEnergyBallAppearanceInterval, $negativeEnergyBall, negativeEnergyBallsSpeed, 'swing');
          clearInterval(crystalBallAppearance);
          crystalBallAppearance = setInterval(generateInMap, crystalBallAppearanceInterval, $crystalBall, crystalBallSpeed, 'linear');
          $gameBackground.removeClass('is_moving');
        }
      }


      /**
      *
      * Attaques de sangoku
      *
      */
      e.which == 65 && !$goku.hasClass('is_attacking') && characterAttack('baton', $('.baton'));
      e.which == 90 && !$goku.hasClass('is_attacking') && characterAttack('boule', $('.kikoho'));
      e.which == 69 && !$goku.hasClass('is_attacking') && characterAttack('rayon', $('.kamehameha'));
      e.which == 82 && !$goku.hasClass('is_attacking') && characterAttack('combo', $('.yellow_kikoho'));

    }

  });










  /**
  *
  *
  *
  * Gestion animation du background
  *
  *
  *
  */

  /**
  *
  * Lancement du défilement normal du background au chargement de la page
  *
  */
  var backgroundMovement = setInterval(movingBackground, backgroundNormalSpeed, backgroundNormalSpeed);

  /**
  *
  * Fonction pour animation du background (mode normal)
  *
  */
  function movingBackground(backgroundNormalSpeed){
    $gameBackground.animate({'marginLeft' : '-=12'}, backgroundNormalSpeed, 'linear');
    $gameBackground.css('width', '+=1200px');
  }

  /**
  *
  * Fonction pour animation du background lors du déplacement de Sangoku (mode grande vitesse)
  *
  */
  function highSpeedMovingBackground($element, fast){
    $element.animate({'marginLeft' : '-=1200'}, fast, 'linear', function(){
      $gameBackground.css('width', '+=1200px');
      highSpeedMovingBackground($element, fast);
    })
  }










  /**
  *
  *
  *
  * Fonction permettant l'exécution des actions de Sangoku
  *
  *
  *
  */

  /**
  *
  * Fonction pour exécuter les déplacements verticaux de Sangoku
  *
  */
  function controlCharacterMovement(eve, keyCode, position, positionLimit, amplitude){
    if(eve.which == keyCode){
      if(positionLimit){
        $goku.css(position, amplitude);
      }
    }
  }

  /**
  *
  * Fonction pour exécuter l'attaque de Sangoku en fonction de la touche préssée
  *
  */
  function characterAttack(attackType, $attackElement){
    var gokuRightLocation = $goku.offset().left + gokuWidth;
    var gokuTopLocation = $goku.offset().top;

    /**
    * On créer une class indiquer qu'une attaque est en cours
    */
    $goku.addClass('is_attacking');

    /**
    * On génère un "élement d'attaque" près de sangoku
    */
    var attack = cloneElement($attackElement, $gokuFrontBlock);


    /**
    * On position "l'élement d'attaque à l'endroit précis désiré"
    */
    switch(attackType) {
      case 'rayon':
        atkLocation = {};
        document.querySelector('#ost-kamehameha').play();
        setTimeout(function(){ document.querySelector('#ost-kamehameha').pause(); document.querySelector('#ost-kamehameha').currentTime = 0}, 1200);
        break;
      case 'boule':
        atkLocation = {'top' : 30, 'left' : - 15};
        document.querySelector('#ost-kamehameha').play();
        setTimeout(function(){ document.querySelector('#ost-kamehameha').pause(); document.querySelector('#ost-kamehameha').currentTime = 0}, 1200);
        break;
      case 'combo':
        atkLocation = {'top' : 35, 'left' : + 5};
        break;
      case 'baton':
        atkLocation = {'top' : 36, 'left' : - 55};
        break;
    }
    attack.css(atkLocation);


    /**
    * On exécute l'animation pour produire l'effet visuel de l'attaque
    */
    attackType == 'rayon' && animateGokuAttack('sizeAndPositionAdultGoku', 'ssjgoku.gif', attack, {'width' : '1600'}, 1000, false);
    attackType == 'combo' && animateGokuAttack('sizeAndPositionAdultGokuCombo', 'goku_punches.gif', attack, {'width' : '75', 'height' : '75', 'top' : '-=35px', 'left':'-=35px'}, 900, 400);
    attackType == 'boule' && animateGokuAttack('sizeAndPositionAdultGokuKick', 'goku_kick.gif', attack, {'width' : '60', 'height' : '60', 'top' : '-=5px', 'left':'-=5px'}, 300, false);
    attackType == 'baton' &&  animateGokuBasicAttack(attack, {'width' : '1600'}, 800);
  }

  /**
  *
  * Fonction pour animation d'une attaque basique
  *
  */
  function animateGokuBasicAttack(elemAttack, animationParams, animationSpeed){
    elemAttack.animate(animationParams, animationSpeed, 'swing', function(){
      $(this).remove();
      $goku.removeClass('is_attacking');
    });
  }

  /**
  *
  * Fonction pour animation d'une attaque spéciale
  *
  */
  function animateGokuAttack(classParamPerso, imgPersoPath, elemAttack, animationParams, animationSpeed, delay){
    $gokuImg.replaceClass('sizeAndPositionKidGoku', classParamPerso).attr('src', 'www/assets/pictures/' + imgPersoPath);
    elemAttack[!delay ? 'none' : 'delay'](delay).animate(animationParams, animationSpeed, 'swing', function(){
      if(classParamPerso === 'sizeAndPositionAdultGokuKick'){
        elemAttack.animate({'left' : '1600'}, 850, 'swing', function(){
          $(this).remove();
          $goku.removeClass('is_attacking');
          $gokuImg.replaceClass(classParamPerso, 'sizeAndPositionKidGoku').attr('src', 'www/assets/pictures/goku_cloud.gif');
        });
      } else {
        $(this).remove();
        $goku.removeClass('is_attacking');
        $gokuImg.replaceClass(classParamPerso, 'sizeAndPositionKidGoku').attr('src', 'www/assets/pictures/goku_cloud.gif');
      }
    })
  }










  /**
  *
  *
  *
  * Gestion apparitions et comportements des "obstacles" (attaques ennemies, murs...etc)
  *
  *
  *
  */

  /**
  *
  * Déclenchement de la rafale de boule d'energie négative
  *
  */
  var freizaAppearance = setInterval(generateInMap, freizaAppearanceInterval, $freiza, freizaSpeed, 'linear');
  var crystalBallAppearance = setInterval(generateInMap, crystalBallAppearanceInterval, $crystalBall, crystalBallSpeed, 'linear');
  var negativeEnergyBallAppearance = setInterval(generateInMap, negativeEnergyBallAppearanceInterval, $negativeEnergyBall, negativeEnergyBallsSpeed, 'swing');
  /**
  *
  * Fonction permettant de cloner puis générer un élement, de le positionner aléatoirement sur la map, et de l'animer
  *
  */
  function generateInMap($element, speed, typeEasing){
    var element = cloneElement($element.last(), $gameZone);
    var elementPosTop = Math.floor(Math.random() * (gameZoneHeight - element.height()));

    element.css({'top' : elementPosTop, 'left' : '100%'});

    element.animate({'left' : '-400px'}, speed, typeEasing, function(){
      $(this).remove();
    });
  }

  /**
  *
  * Déclenchement de la détection des collisions
  *
  */
  setInterval(collision, 10, 'ball', 'goku');
  setInterval(collision, 10, 'crystalBall', 'goku');
  setInterval(collision, 10, 'freiza', 'kamehameha');

  /**
  *
  * Fonction permettant de détecter une collision
  *
  */
  function collision(element, collider){

    switch(element) {
      case 'ball':
        collideElement = $('#game-zone .negative-energy-ball');
        break;
      case 'crystalBall':
        collideElement = $('#game-zone .crystal-ball');
        break;
      case 'freiza':
        collideElement = $('#game-zone .freiza');
        break;
    }

    switch(collider) {
      case 'kamehameha':
        colliderElement = $('#game-zone .kamehameha');
        break;

      case 'goku':
        colliderElement = $('#game-zone #goku');
        break;

      case 'boule':
        colliderElement = $('#game-zone .kikoho');
        break;
    }

    var remRight = collider === "goku" ? 15 : 0;

    $.each(collideElement, function(){
      var colliderElementLeftLocation = colliderElement.length ? colliderElement.offset().left : false;
      var colliderElementTopLocation = colliderElement.length ? colliderElement.offset().top : false;
      var colliderElementRightLocation = colliderElement.length ? colliderElementLeftLocation + colliderElement.width() - remRight : false;
      var colliderElementBottomLocation = colliderElement.length ? colliderElementTopLocation + colliderElement.height() : false;

      var elementLeftLocation = $(this).offset().left;
      var elementTopLocation = $(this).offset().top;
      var elementHeight = $(this).height();
      var elementBottomLocation = elementTopLocation + elementHeight;
      
      if(collider === "goku"){
        if(colliderElementRightLocation > elementLeftLocation 
        && colliderElementRightLocation < elementLeftLocation + 50
        && colliderElementTopLocation < elementBottomLocation 
        && colliderElementBottomLocation > elementTopLocation){
          $(this).addClass('touched');
          collisionEffect($(this), element);
        }
      } else {
        if(colliderElementRightLocation > elementLeftLocation && colliderElementTopLocation < elementBottomLocation && colliderElementBottomLocation > elementTopLocation){
          $(this).addClass('touched');
          collisionEffect($(this), element);
        }
      }
      
    });
  }

  /**
  *
  * Fonction gérant les comportements visuels lorsqu'une collision est détectée
  *
  */
  function collisionEffect(element, elementType){
    
    if(element.hasClass('touched')){
      element.removeClass('touched');
      if(elementType === 'freiza'){

        document.querySelector('#ost-punched').play();
        element.stop().toggle('explode').remove();
      }

      if(elementType === 'ball'){
        $goku.toggle('explode', function(){ $(this).show(); });
        element.remove();
        $lifeBar.animate({'width' : '-=50px'}, 300);

        document.querySelector('#ost-hit').play();
      }


      if(elementType === 'crystalBall'){
        element.remove();
        $ball = cloneElement($crystalBall, $gokuFrontBlock);
        $ball.css({'top': 15});
        $ball.toggle('puff', function(){ $(this).remove(); });
        document.querySelector('#ost-coin').play();
      }


      if($lifeBar.width() < 1){
        $lifeBar.animate({'width' : '800px'}, 600);
      }
    }
  }

  


  





  /**
  *
  *
  *
  * Gestion Play / Pause du jeu
  *
  *
  *
  */

  /**
  *
  * Mise en mute de la piste audio
  *
  */
  $btnMute.on('click', function(){
    if(!$('audio').prop('muted')){
      $('audio').prop('muted', true);
      $(this).find('i').replaceClass('glyphicon-volume-up', 'glyphicon-volume-off');
    } else {
      $('audio').prop('muted', false);
      $(this).find('i').replaceClass('glyphicon-volume-off', 'glyphicon-volume-up');
    }
  });

  /**
  *
  * Mise en Pause / Play du jeu
  *
  */
  $btnPlayPause.on('click', function(){
    if(!$gameBackground.hasClass('is_moving')){
      var icon = $(this).find('i');
      icon.hasClass('glyphicon glyphicon-pause') ? actionPause(icon) : actionPlay(icon);
    } else{
      $btnPlayPauseHelper.text('Stop High Speed Deplacement!!');
      $gameBackground.addClass('askedForStop');
    }
  });

  /**
  *
  * Fonction permettant d'arrêter la lecture de la piste audio
  *
  */
  function actionPause(icon){
    $gokuImg.replaceClass('sizeAndPositionKidGoku', 'goku_cloud_static').attr('src', 'www/assets/pictures/goku.png');
    $btnPlayPauseHelper.text('');
    icon.replaceClass('glyphicon glyphicon-pause', 'glyphicon glyphicon-play');
    document.querySelector('#ost-dbz').pause();
    $gameZone.addClass('inPaused');

    clearInterval(negativeEnergyBallAppearance);
    clearInterval(backgroundMovement);
    clearInterval(crystalBallAppearance);
    clearInterval(freizaAppearance);

    $('.negative-energy-ball').stop().fadeOut();
    $('.crystal-ball').stop().fadeOut();
    $('.freiza').stop().fadeOut();
  }

  /**
  *
  * Fonction permettant de continuer la lecture de la piste audio
  *
  */
  function actionPlay(icon){
    $gokuImg.replaceClass('goku_cloud_static', 'sizeAndPositionKidGoku').attr('src', 'www/assets/pictures/goku_cloud.gif');
    icon.replaceClass('glyphicon glyphicon-play', 'glyphicon glyphicon-pause');
    document.querySelector('#ost-dbz').play();
    $gameZone.removeClass('inPaused');

    negativeEnergyBallAppearance = setInterval(generateInMap, negativeEnergyBallAppearanceInterval, $negativeEnergyBall, negativeEnergyBallsSpeed, 'swing');
    backgroundMovement = setInterval(movingBackground, backgroundNormalSpeed, backgroundNormalSpeed);
    crystalBallAppearance = setInterval(generateInMap, crystalBallAppearanceInterval, $crystalBall, crystalBallSpeed, 'linear');
    freizaAppearance = setInterval(generateInMap, freizaAppearanceInterval, $freiza, freizaSpeed, 'linear');
  }










  /**
  *
  *
  *
  * Fonctions utiles
  *
  *
  *
  */

  /**
  *
  * Extension Jquery permettant de remplacer une class
  *
  */
  $.fn.replaceClass = function(oldClass, newClass){
    return this.each(function(){
      $(this).removeClass(oldClass).addClass(newClass);
    })
  }

  /**
  *
  * Extension Jquery permettant de donner un effet de levitation à un objet
  *
  */
  $.fn.levitate = function(extend){
    return this.each(function(){
      $(this).animate({'top':'+='+extend+'px'}, 800);
      $(this).animate({'top':'-='+extend+'px'}, 800, function(){
        $(this).levitate(extend);
      });
    })
  }

  function levitate($element, extend){
    $element.animate({'top':'+='+extend+'px'}, 800);
    $element.animate({'top':'-='+extend+'px'}, 800, function(){
      levitate($element, extend);
    });
  }

  /**
  *
  * Fonction permettant de cloner, puis génerer un élément dans une place définie
  *
  */
  function cloneElement($element, area){
    return $element.clone().show().appendTo(area);
  }

  /**
  *
  * Fonction vide permettant d'insérer une methode dans un chainage de method en fonction d'une condition
  *
  */
  $.fn.none = function () {
    return this;
  };
});
