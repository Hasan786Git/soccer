var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["5c99adbb-6f3e-44c2-9a53-40b093bc4739"],"propsByKey":{"5c99adbb-6f3e-44c2-9a53-40b093bc4739":{"name":"soccer_bw_1","sourceUrl":"assets/api/v1/animation-library/gamelab/KAKckB.0WJDP55kNGzIZIfW5wf7Rk5mG/category_sports/soccer_bw.png","frameSize":{"x":393,"y":394},"frameCount":1,"looping":true,"frameDelay":60,"version":"KAKckB.0WJDP55kNGzIZIfW5wf7Rk5mG","categories":["sports"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":393,"y":394},"rootRelativePath":"assets/api/v1/animation-library/gamelab/KAKckB.0WJDP55kNGzIZIfW5wf7Rk5mG/category_sports/soccer_bw.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

gameState = "serve";
score = 0;
score2 = 0;
var goal1 = createSprite(200, 35, 120, 40);
goal1.shapeColor = "white";
var goal2 = createSprite(200, 365, 120, 40);
goal2.shapeColor = "white";
var centerLine = createSprite(200, 200, 400, 2);
centerLine.shapeColor = "white";
var player1 = createSprite(200, 65, 15, 15);
player1.shapeColor = "blue";
var player2 = createSprite(200, 335, 15, 15);
player2.shapeColor = "red";
var ball = createSprite(200, 200);
ball.setAnimation("soccer_bw_1");
ball.height = 20;
ball.width = 20;
function draw() {
  background("green");
  if (score==5||score2==5) {
    ball.x = 200;
    ball.y = 200;
    player1.x = 200;
    player1.y = 65;
    player2.x = 200;
    player2.y = 335;
    ball.velocityX = 0;
    ball.velocityY = 0;
    player1.velocityX = 0;
    player1.velocityY = 0;
    player2.velocityX = 0;
    player2.velocityY = 0;
    textSize(40);
    fill("blue");
    text("Game Over", 100, 175);
  }
  if (ball.isTouching(goal1)) {
    score2 = score2+1;
    ball.x = 200;
    ball.y = 200;
    player1.x = 200;
    player1.y = 65;
    player2.x = 200;
    player2.y = 335;
  }
  if (ball.isTouching(goal2)) {
    score = score+1;
    ball.x = 200;
    ball.y = 200;
    player1.x = 200;
    player1.y = 65;
    player2.x = 200;
    player2.y = 335;
  }
  //edge
  createEdgeSprites();
  ball.bounceOff(leftEdge);
  ball.bounceOff(rightEdge);
  ball.bounceOff(topEdge);
  ball.bounceOff(bottomEdge);
  player2.bounceOff(leftEdge);
  player2.bounceOff(rightEdge);
  player2.bounceOff(topEdge);
  player2.bounceOff(bottomEdge);
  player1.collide(bottomEdge);
  player1.collide(leftEdge);
  player1.collide(rightEdge);
  player1.collide(topEdge);
  if (ball.isTouching(topEdge)) {
    playSound("assets/category_app/app_button_1.mp3", false);
  }
  if (ball.isTouching(bottomEdge)) {
    playSound("assets/category_app/app_button_1.mp3", false);
  }
  if (ball.isTouching(leftEdge)) {
    playSound("assets/category_app/app_button_1.mp3", false);
  }
  if (ball.isTouching(rightEdge)) {
    playSound("assets/category_app/app_button_1.mp3", false);
  }
  //mid line
  player1.bounceOff(centerLine);
  player2.x = ball.x;
  
  //goal1
  stroke("white");
  line(105, 400, 105, 315);
  stroke("white");
  line(105, 315, 295, 315);
  stroke("white");
  line(295, 315, 295, 400);
  //goal2
  stroke("white");
  line(105, 0, 105, 80);
  stroke("white");
  line(105, 80, 295, 80);
  stroke("white");
  line(295, 0, 295, 80);
  //if key down
  if (keyDown("up")) {
    player1.velocityY = -3;
  }
  if (keyDown("down")) {
    player1.velocityY = +3;
  }
  if (keyDown("left")) {
    player1.velocityX = -3;
  }
  if (keyDown("right")) {
    player1.velocityX = +3;
  }
  //if key up
  if (keyWentUp("up")) {
    player1.velocityY = -2;
  }
  if (keyWentUp("down")) {
    player1.velocityY = +2;
  }
  if (keyWentUp("left")) {
    player1.velocityX = -2;
  }
  if (keyWentUp("right")) {
    player1.velocityX = +2;
  }
  if (gameState=="serve") {
    textFont("comicSans");
    textSize(30);
    text("Press Space To Strike", 75, 180);
    if (keyDown("space")) {
      gameState = "play";
      ball.velocityX = 2;
      ball.velocityY = 2;
    }
  }
  if (gameState=="play") {
    fill("blue");
    textSize(24);
    text(score, 20, 175);
    textSize(24);
    text(score2, 20, 245);
    ball.bounce(player1);
    ball.bounce(player2);
  }
  drawSprites();
}

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
