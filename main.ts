namespace SpriteKind {
    export const Coin = SpriteKind.create()
}
function playerSpawn () {
    bagelBoy = sprites.create(img`
        . . . . . . b b b b e e . . . . 
        . . . . b b e e e d d d e e . . 
        . . . b e e e d d d d d d e e . 
        . . b e e d d d d d d d d d e . 
        . b d e d d d d d b d d d d e b 
        . b d d d d d e e d d d d d e b 
        b d d d d d e e d d d d e e 4 b 
        b d d d d b e d d d d d e e 4 b 
        b d d d d d d d d d d e e 4 4 e 
        e d d d d d d d d d e e 4 4 4 e 
        e d d d d d d d e e e 4 4 4 e . 
        e e d d d e e e e e 4 4 4 e e . 
        . e e e e e e e 4 4 4 4 e e . . 
        . . e e b b 4 4 4 4 b e e . . . 
        . . . e e e e e e e e . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Player)
    bagelBoy.setPosition(74, 3)
    controller.moveSprite(bagelBoy)
    scene.cameraFollowSprite(bagelBoy)
    bagelBoy.ay = 30 * 90
    info.setScore(0)
    info.setLife(3)
}
function generateCoin () {
    for (let index = 0; index < 4; index++) {
        coin = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . 1 1 1 1 1 1 1 . . . . . 
            . . . 1 1 1 1 1 1 1 1 1 . . . . 
            . . 1 1 1 1 1 1 1 1 1 1 1 . . . 
            . 1 1 1 1 1 1 1 1 1 1 1 1 1 . . 
            . 1 1 1 1 1 1 1 1 1 1 1 1 1 . . 
            . 1 1 1 1 1 1 1 1 1 1 1 1 1 . . 
            . 1 1 1 1 1 1 1 1 1 1 1 1 1 . . 
            . 1 1 1 1 1 1 1 1 1 1 1 1 1 . . 
            . 1 1 1 1 1 1 1 1 5 5 5 1 1 . . 
            . 1 1 1 1 1 1 1 5 5 5 5 1 1 . . 
            . . 1 1 1 1 1 1 1 5 5 5 1 . . . 
            . . . 1 1 1 1 1 1 1 1 1 . . . . 
            . . . . 1 1 1 1 1 1 1 . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Coin)
        coin.setPosition(randint(0, 100), randint(0, 100))
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Coin, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.spray, 500)
    info.changeScoreBy(5)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    bagelBoy.setVelocity(0, -400)
})
function resetForNextLevel () {
    for (let value2 of sprites.allOfKind(SpriteKind.Coin)) {
        sprites.destroy(value2)
    }
}
function tileMaps () {
    scene.setTileMap(img`
        . . . . . . . . . . 
        . . . . . . . . . . 
        . 1 . . 1 . . . . . 
        . 3 3 3 . . . . . . 
        . . . . . . 1 . . . 
        . . . . . 3 . . . . 
        . . . . . . . 1 . 5 
        . . . . . . . 3 3 3 
        `)
    scene.setTileMap(img`
        . . . . . . . . . . 
        . . . . . . . . . . 
        . 1 . . 1 . . 5 . . 
        . . . . . . . 3 . . 
        . 3 . . 3 . 1 . . . 
        . . . . . . . . . . 
        . 3 3 . . 3 . 1 . . 
        . . . . . . . . . . 
        `)
    scene.setTileMap(img`
        . . . . . . . . . . 
        . . . . . . . . . . 
        . 1 . . 1 . . . . . 
        . . . 3 3 3 . . . . 
        . . 3 1 1 1 3 . . . 
        . . 3 1 1 1 3 . . . 
        . 5 3 1 1 1 1 1 . . 
        . . . . . . . . . . 
        `)
}
function nextLevel () {
    scene.setTileMap(levels[currentLevel])
    scene.placeOnRandomTile(bagelBoy, 15)
    generateCoin()
}
scene.onHitTile(SpriteKind.Player, 5, function (sprite) {
    currentLevel += 1
    nextLevel()
})
info.onLifeZero(function () {
    game.gameOver(false)
})
scene.onHitTile(SpriteKind.Player, 1, function (sprite) {
    info.changeLifeBy(-1)
    bagelBoy.x = 10
})
function animateLoader () {
    animation.runImageAnimation(
    mySprite,
    [img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . 3 . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . 3 . . . . . 
        . . . . . . . . . 3 . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . 3 . . . . . . 
        . . . . . . . . . . 3 . . . . . 
        . . . . . . . . . . 3 . . . . . 
        . . . . . . . . . 3 . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . 3 3 . . . . . . 
        . . . . . . . 3 . . 3 . . . . . 
        . . . . . . . . . . 3 . . . . . 
        . . . . . . . . . 3 . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . 3 3 . . . . . . 
        . . . . . . . 3 . . 3 . . . . . 
        . . . . . . . 3 . . 3 . . . . . 
        . . . . . . . . 3 3 . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . 3 3 . . . . . . 
        . . . . . . . 3 . . . . . . . . 
        . . . . . . . 3 . . . . . . . . 
        . . . . . . . . 3 3 . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 3 . . . . . . . . 
        . . . . . . . 3 . . . . . . . . 
        . . . . . . . . 3 3 . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . 3 3 . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `],
    100,
    false
    )
    pause(500)
    animation.runImageAnimation(
    mySprite,
    [img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . 5 . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 5 . . . . . . . . . 
        . . . . . 5 . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 5 . . . . . . . . 
        . . . . . . 5 . . . . . . . . . 
        . . . . . 5 . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 5 . . . . . . . . 
        . . . . . . 5 . 5 . . . . . . . 
        . . . . . 5 . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 5 . . . . . . . . 
        . . . . . . 5 . 5 . . . . . . . 
        . . . . . 5 . . . 5 . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 5 . . . . . . . . 
        . . . . . . 5 . 5 . . . . . . . 
        . . . . . 5 . . . 5 . . . . . . 
        . . . . . . . . 5 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 5 . . . . . . . . 
        . . . . . . 5 . 5 . . . . . . . 
        . . . . . 5 . . . 5 . . . . . . 
        . . . . . . . . 5 . . . . . . . 
        . . . . . . . 5 . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 5 . . . . . . . . 
        . . . . . . 5 . 5 . . . . . . . 
        . . . . . 5 . . . 5 . . . . . . 
        . . . . . . 5 . 5 . . . . . . . 
        . . . . . . . 5 . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 5 . . . . . . . . 
        . . . . . . . . 5 . . . . . . . 
        . . . . . 5 . . . 5 . . . . . . 
        . . . . . . 5 . 5 . . . . . . . 
        . . . . . . . 5 . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . 5 . . . . . . . 
        . . . . . 5 . . . 5 . . . . . . 
        . . . . . . 5 . 5 . . . . . . . 
        . . . . . . . 5 . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . 5 . . . 5 . . . . . . 
        . . . . . . 5 . 5 . . . . . . . 
        . . . . . . . 5 . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . 5 . . . . . . . . . . 
        . . . . . . 5 . 5 . . . . . . . 
        . . . . . . . 5 . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . 5 . . . . . . . . . . 
        . . . . . . 5 . . . . . . . . . 
        . . . . . . . 5 . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . 5 . . . . . . . . . . 
        . . . . . . 5 . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . 5 . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `],
    100,
    false
    )
}
let coin: Sprite = null
let bagelBoy: Sprite = null
let mySprite: Sprite = null
let currentLevel = 0
let levels: Image[] = []
playerSpawn()
scene.setTile(3, img`
    d 1 d d d d d d d 1 d d d d d d 
    d 1 d d d d d d d 1 d d d d d d 
    d 1 d d d d d d d 1 d d d d d d 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    d d d d d 1 d d d d d d d 1 d d 
    d d d d d 1 d d d d d d d 1 d d 
    d d d d d 1 d d d d d d d 1 d d 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    d 1 d d d d d d d 1 d d d d d d 
    d 1 d d d d d d d 1 d d d d d d 
    d 1 d d d d d d d 1 d d d d d d 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    d d d d d 1 d d d d d d d 1 d d 
    d d d d d 1 d d d d d d d 1 d d 
    d d d d d 1 d d d d d d d 1 d d 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    `, true)
scene.setTile(5, img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . 1 . . . . . . . . 
    . . . . . . . 1 1 1 . . . . . . 
    . . . . . . 1 d 1 1 1 d . . . . 
    . . . . . . 1 1 d d 1 1 . . . . 
    . . . . . 1 1 1 1 1 1 1 . . . . 
    . . . . 1 d 1 1 1 1 d 1 . . . . 
    . . . 1 1 1 d d d 1 1 1 1 d . . 
    . . 1 d 1 1 1 1 1 d d 1 1 1 1 . 
    . . 1 1 d 1 1 1 1 1 1 1 1 1 d . 
    . 1 1 1 1 d d 1 1 1 1 1 d 1 1 . 
    1 1 d 1 1 1 1 d d 1 d d 1 1 1 1 
    1 1 d d 1 d 1 1 1 1 1 1 1 1 d 1 
    `, true)
scene.setTile(1, img`
    . . . . . . 2 2 2 2 2 2 2 . . . 
    . . . . . 2 2 f 2 2 2 f 2 1 . . 
    . . . . 2 2 f 2 2 2 f 2 2 1 . . 
    . . . 2 2 f 2 2 2 f 2 2 1 . . . 
    . . 2 2 f 2 2 2 f 2 2 1 2 . . . 
    . 2 2 f 2 2 2 f 2 2 1 2 2 . . . 
    . 2 2 2 2 2 2 2 2 1 2 2 2 . . . 
    . 1 1 1 1 1 1 1 1 2 2 2 2 . . . 
    . 2 2 2 f 2 2 2 1 2 2 2 2 . . . 
    . 2 2 2 f 2 2 2 1 2 2 2 2 . . . 
    . 2 2 2 f 2 2 2 1 2 2 2 2 . . . 
    . 2 2 2 f 2 2 2 1 2 2 2 . . . . 
    . 2 2 f f f 2 2 1 2 2 . . . . . 
    . 2 2 2 2 2 2 2 1 2 . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, true)
levels = [
img`
    . f . . . . . . . . 
    . . . . . . . . . . 
    . 3 . . 1 . . 5 . . 
    . . . . . . . 3 . . 
    . 3 . . 3 . 1 . . . 
    . . . . . . . . . . 
    . 3 3 . . 3 . 1 . . 
    . . . . . . . . . . 
    `,
img`
    . . . . . . . . . . 
    . . . . . . . . . . 
    . 1 . . 1 f . . . . 
    . 3 3 3 . . . . . . 
    . . . . . . . . . . 
    . . . . . 3 . . . . 
    . . . . . . . 1 . 5 
    . . . . . . . 3 3 3 
    `,
img`
    . . . . . . . . . . 
    . . . . . . . . . . 
    . 1 . . 1 . . . . . 
    . . . 3 3 3 . . . . 
    . . 3 1 1 1 3 . . . 
    . . 3 1 1 1 3 . . . 
    . 5 3 f 1 1 1 1 . . 
    . . . . . . . . . . 
    `,
img`
    . . . . . . . . . . 
    . . . . . . . . . . 
    . . . . . . . . . . 
    . . . . . . . . . . 
    . . . . . . . . . . 
    . . . . . . . . . . 
    . . . . . . . . . . 
    . . . . . . . . . . 
    `
]
currentLevel = 0
nextLevel()
mySprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
animateLoader()
game.onUpdate(function () {
    if (currentLevel >= 3) {
        game.gameOver(true)
    }
})
