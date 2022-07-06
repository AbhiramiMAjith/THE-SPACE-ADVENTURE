var bg, bgImg
var story, storyImg
var instructions, instrucImg

var startBtn, instrucBtn

var player, playerImg
var shoot, shootAnime, shootGroup

var asteroids, asteroidsImg, astGroup
var planet1Img, planet1Grp
var planet2Img, planet2Grp

var coinAnime, coinGrp
var powerupImg, powerupGrp

var ufo, ufoGrp, ufoImage
var fire, fireGrp, ufoShootAnime
var captain, captainImg, feedB
var speed = 0

var coinCollect, hitObstacle, lostGame, powerupCollect, winGame, click, bgMusic

var gamestate = 0
var score = 0
var life = 3
var heart, heartImg, heartGrp
var isPowerUp = false, isScoreUp = false, ufoDodge = false

function preload()
{
    bgImg = loadImage ("./assets/image/background.jpg")
    spaceImg = loadImage ("./assets/image/space_adv.png")
    playerImg = loadAnimation (
        "./assets/animations/rocket.png",
        "./assets/animations/rocket2.png",
        "./assets/animations/rocket3.png",
        "./assets/animations/rocket4.png"
        )
    shootAnime = loadAnimation (
        "./assets/animations/shoot1.png",
        "./assets/animations/shoot2.png",
        "./assets/animations/shoot3.png",
        "./assets/animations/shoot4.png"
        )
    asteroidsImg = loadImage ("./assets/image/asteroid.png")
    planet1Img = loadImage ("./assets/image/planet1.png")
    planet2Img = loadImage ("./assets/image/planet2.png")
    coinAnime = loadAnimation (
        "./assets/animations/coin_1.png",
        "./assets/animations/coin_2.png",
        "./assets/animations/coin_3.png",
        "./assets/animations/coin_4.png"
    )
    powerupImg = loadImage ("./assets/image/powerup.png")
    ufoImage = loadImage ("./assets/image/ufo.png")
    ufoShootAnime = loadAnimation (
        "./assets/animations/ufo_shoot1.png",
        "./assets/animations/ufo_shoot2.png",
        "./assets/animations/ufo_shoot3.png",
        "./assets/animations/ufo_shoot4.png"
    )
    storyImg = loadImage ("./assets/image/story.png")
    instrucImg = loadImage ("./assets/image/instrucImg.png")
    heartImg = loadImage ("./assets/image/heart.png")
    captainImg = loadImage ("./assets/image/captain.png")

    coinCollect = loadSound ("./assets/sound/coin_collect.wav")
    hitObstacle = loadSound ("./assets/sound/hit_obstacle.wav")
    lostGame = loadSound ("./assets/sound/lost_game.wav")
    powerupCollect = loadSound ("./assets/sound/powerup.wav")
    winGame = loadSound ("./assets/sound/win_game.wav")
    click = loadSound ("./assets/sound/click_sound.wav")
    bgMusic = loadSound ("./assets/sound/space_bg_music.mp3")
}

function setup ()
{
    createCanvas (windowWidth, windowHeight)

    bg = createSprite (width/2, height - 1600)
    bg.addImage (bgImg)
    bg.scale = 1.7

    player = createSprite (width/2, height - 150)
    player.addAnimation ("playerMoving", playerImg)
    player.scale = 1.3
    player.visible = false
    //player.debug = true
    player.setCollider ("rectangle", 0, 0, 125, player.height - 125)

    space = createSprite (width/2, 200)
    space.addImage (spaceImg)
    space.scale = 1.2

    story = createSprite (380, 230)
    story.addImage (storyImg)
    story.scale = 0.5

    startBtn = createImg ("./assets/image/start_btn.png")
    startBtn.position(width/2 - 400, 700)
    startBtn.size (200, 100)
    startBtn.mouseClicked (start)

    instrucBtn = createImg ("./assets/image/instructions.png")
    instrucBtn.position (width/2 + 50, 700)
    instrucBtn.size (350, 100)
    instrucBtn.mouseClicked (instruc)

    instructions = createSprite (width/2, 100)
    instructions.addImage (instrucImg)
    instructions.scale = 0.7
    instructions.visible = false

    captain = createSprite (70, 80)
    captain.addImage (captainImg)
    captain.scale = 0.2
    captain.visible = false

    feedB = createElement ("h2")
    feedB.html ("Be Careful!")
    feedB.position (120, 80)
    feedB.class ("feedBack")
    feedB.hide ()

    shootGroup = new Group ()
    astGroup = new Group ()
    planet1Grp = new Group ()
    planet2Grp = new Group ()
    coinGrp = new Group ()
    powerupGrp = new Group ()
    ufoGrp = new Group ()
    fireGrp = new Group ()
    heartGrp = new Group ()
}

function draw()
{
    background (0)
    drawSprites ()
    bgMusic.play ()
    bgMusic.setVolume (0.02)

    if (gamestate == 0)
    {
        space.visible = true

        fill ('white')
        textSize (30)
        text (
            "THE SPACESHIP IN WHICH YOU ARE TRAVELLING HAS SOME GLITCH! \n \nYOU HAVE LANDED FAR AWAY FROM WHERE YOU WERE SUPPOSED TO GO! \n \nNOW YOU MUST GET PAST ALL THE OBSTACLES AHEAD OF YOU TO GET BACK HOME!! \n \nYOU ALSO HAVE TO DESTROY THE ENEMIES ( UFO’S) IN YOUR WAY.. \n \nAND DON’T FORGET TO LISTEN TO THE CAPTAIN’S FEEDBACKS!",
            300 ,
            350
            )
    }
    else if (gamestate == 1)
    {
        space.visible = false
        story.visible = false
        instructions.visible = true
        instrucBtn.remove ()

        startBtn.position (width/2 + 400, 700)

        fill ("white")
        textSize (25)
        text ("USE THE LEFT AND RIGHT ARROW KEYS TO MOVE TOWARDS \nLEFT AND RIGHT RESPECTIVELY! \n \nUSE SPACE TO SHOOT! \n \nSHOOT THE UFO's OR COLLECT 5 COINS EACH TO GET \nEXTRA LIFES !! \n \nYOU WILL FIND SPEED POWERUPS ON YOUR WAY! \n \nTHE CAPTAIN WILL GIVE YOU FEEDBACKS SO THAT YOU \nCAN KNOW HOW YOU ARE PERFOMING!! \n \nMAKE THE CAPTAIN AS HAPPY AS POSSIBLE!! ", 150, 230)
        text ("LIFE WILL GET REDUCED IF YOU HIT THE OBSTACLES! \n \nYOU LOSE IF THE UFO SHOOTS YOU!", 150, 700)
    }
    else if (gamestate == 2)
    {
        speed = speed + Math.round (frameCount/500)

        fill ("white")
        rect (width - 260, 60, 200, 20)
        textSize (20)
        text ("SCORE", width - 200, 40)
        if (isScoreUp)
        {
            fill ("yellow")
            rect (width - 260, 60, score, 20)
            noStroke ()
        }

        if (score == 200 && life < 3)
        {
            feedback ("EXTRA LIFE!")
            life += 1
            isScoreUp = false
            score = 0
        }

        if (isPowerUp == false)
        {
            bg.velocityY = 8 + speed/500
        }

        player.visible = true
        space.visible = false
        story.visible = false
        instructions.visible = false

        captain.visible = true
        textSize (25)
        fill ("yellow")
        text ("Captain's feedback :-",120, 80)
        if (ufoDodge)
        {
            feedback ("Super Impressive!")
        }
        feedB.show ()

        startBtn.remove ()
        instrucBtn.remove ()

        playerControls ()
        //console.log (bg.y)

        addSprites (astGroup, 0.2, asteroidsImg, random (5, 9), 190, false)
        addSprites (planet1Grp, 0.3, planet1Img, random (5, 9), 130, false)
        addSprites (planet2Grp, 0.4, planet2Img, random (5, 9), 170, false)
        addSprites (coinGrp, 0.5, coinAnime, random (5, 9),150, true)
        addSprites (powerupGrp, 1, powerupImg, random (5, 9), 350, false)
        createUFO ()

        //console.log (life)
        if (isPowerUp == false)
        {
            collideSprite (astGroup, true)
            collideSprite (planet1Grp, true)
            collideSprite (planet2Grp, true)
            collideSprite (coinGrp, false)

            if (shootGroup.isTouching (ufoGrp))
            {
                shootGroup.destroyEach ()
                ufoGrp.destroyEach ()
                isScoreUp = true
                score += 80
                ufoDodge = true
            }
            if (player.isTouching (fireGrp))
            {
                fireGrp.destroyEach ()
                ufoGrp.destroyEach ()
                gamestate = 4
                lostGame.play ()
                var e = Math.round (random(1,3))
            }
            if (life == 0)
            {
                gamestate = 4
            }
            if (player.isTouching (powerupGrp))
            {
                powerupCollect.play ()
                powerupGrp.destroyEach ()
                bg.velocityY = 30 + speed/500

                astGroup.setVelocityEach (0, 30 + speed/500)
                planet1Grp.setVelocityEach (0, 30 + speed/500)
                planet2Grp.setVelocityEach (0, 30 + speed/500)
                coinGrp.setVelocityEach (0, 30 + speed/500)
                powerupGrp.setVelocityEach (0, 30 + speed/500)
                ufoGrp.setVelocityEach (0, 30 + speed/500)
                fireGrp.setVelocityEach (0, 30 + speed/500)

                isPowerUp = true
                setTimeout(() => 
                {
                    isPowerUp = false
                }, 3000);
            }
            switch (life)
            {
                case 3 : showLife (3)
                break
                case 2 : showLife (2)
                break
                case 1 : showLife (1)
                break
                default : heartGrp.destroyEach ()                               
            }
        }
    }
    else if (gamestate == 3)
    {
        winGame.play ()
        destroy (astGroup)
        destroy (planet1Grp)
        destroy (planet2Grp)
        destroy (coinGrp)
        destroy (powerupGrp)
        destroy (fireGrp)
        destroy (ufoGrp)
        player.destroy ()
        captain.visible = false

        bg.velocityY = 0
    }
    else
    {       
        destroy (astGroup)
        destroy (planet1Grp)
        destroy (planet2Grp)
        destroy (coinGrp)
        destroy (powerupGrp)
        destroy (fireGrp)
        destroy (ufoGrp)
        player.destroy ()

        captain.x = width/2 - 300
        captain.y = height/2 + 100
        captain.scale = 0.8

        fill ("white")
        textSize (40)
        text ("Captain's feedback :-", width/2 - 50, height/2 + 100)
        if (e == 3)
        {
            feedback ("Oh no!!")
        }
        else if (e == 2)
        {
            feedback ("Its Over!")
        }
        else
        {
            feedback ("We have LOST!!")
        }
        feedB.position (width/2 - 50, height/2 + 100)
        feedB.class ("lostSty")

        bg.velocityY = 0

        lost = createElement ("h1")
        lost.html ("GAMEOVER!")
        lost.position (width/2 - 50, height/2 - 250)
        lost.class ("lostSty")
    }

    if (bg.y > height + 800)
    {
        bg.y = height - 1600
    }
}

function playerControls ()
{
    if (isPowerUp == false)
    {
        if (keyIsDown (LEFT_ARROW) && player.x > 74)
        {
            player.x -= 10
        }

        if (keyIsDown (RIGHT_ARROW) && player.x < width-74)
        {
            player.x += 10
        }

        if (keyWentUp ("space"))
        {
            shootFire ()
        }
    }
}

function shootFire ()
{
    shoot = createSprite (player.x, player.y )
    shoot.addAnimation ("shooting", shootAnime)
    shoot.scale = 0.5
    shoot.velocityY = -(10 + speed/500)
    shootGroup.add (shoot)
}

function addSprites (group, scale, img, vel, count, anime)
{
    if (frameCount % count == 0)
    {
        sprite = createSprite (random (100, width - 100), -50)
        if (anime)
        {
            sprite.addAnimation ("sprites",img)
        }
        else
        {
            sprite.addImage (img)
        }
        sprite.scale = scale
        sprite.velocityY = vel + speed/500
        sprite.lifetime = 140
        group.add (sprite)
    }
}

function createUFO ()
{
    if (frameCount % 400 == 0)
    {
        ufo = createSprite (width/2, -100)
        ufo.addImage (ufoImage)
        ufo.scale = 0.5
        ufo.velocityY = random (5, 7) + speed/500
        //ufo.debug = true
        ufo.setCollider ("rectangle", 0, 0, 400, 200)
        ufoGrp.add (ufo)

        velocity = 5
        for (i = 0; i < 3; i ++)
        {
            fire = createSprite (ufo.x, ufo.y)
            fire.addAnimation ("ufoShooting", ufoShootAnime)
            fire.scale = 1
            fire.velocityX = velocity
            velocity -= 5
            fire.velocityY = 12 + speed/500
            //fire.debug = true
            fire.setCollider ("rectangle", 0, 0, 80, 80)
            fireGrp.add (fire)
        }
    }
}

function start ()
{
    gamestate = 2
    click.play ()
}
function instruc ()
{
    gamestate = 1
    click.play ()
}

function collideSprite (group, obstacle)
{
    if (player.isTouching (group))
    {
        group.destroyEach ()
        if (obstacle)
        {
            life -= 1
            var i = Math.round (random (1,3))
            if (i == 1)
            {
                feedback ("Careful now!")
            }
            else if (i == 2)
            {
                feedback ("Oops!")
            }
            else
            {
                feedback ("OMG!")
            }
            hitObstacle.play ()
        }
        else
        {
            score += 40
            var r = Math.round (random (1,3))
            if (r == 1)
            {
                feedback ('Superb!')
            }
            else if (r == 2)
            {
                feedback ("Great!")
            }
            else
            {
                feedback ("Awesome!")
            }
            isScoreUp = true
            coinCollect.play ()
        }
    }
}

function destroy (group)
{
    group.destroyEach ()
}

function feedback (fb)
{ 
    textSize (25)
    r = Math.round (random (1, 255))
    g = Math.round (random (1, 255))
    b = Math.round (random (1, 255))
    fill (rgb(r, g, b))
    feedB.html (fb)
}

function showLife (life)
{
    heartGrp.destroyEach ()
    for (var i = 1; i <= life; i ++)
    {
        heart = createSprite (width - i*80, 130)
        heart.addImage (heartImg)
        heart.scale = 0.8
        heartGrp.add (heart)
    }
}
