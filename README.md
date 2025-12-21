# Bunny Jump

A fun platformer game built with Phaser.js where you control a bunny jumping on platforms and collecting carrots.

## Description

Bunny Jump is an endless platformer game where the player controls a bunny character that jumps between platforms. The goal is to collect as many carrots as possible while avoiding falling off the platforms. The game features multiple scenes including a start menu, gameplay, game over screen, high score tracking, and a shop.

## Features

- **Platformer Gameplay**: Jump between platforms using arrow keys
- **Carrot Collection**: Collect carrots to increase your score
- **Endless Scrolling**: Platforms continuously generate as you progress upward
- **Physics-Based Movement**: Realistic jumping and collision detection
- **Sound Effects**: Jump sound effects for enhanced gameplay
- **Multiple Scenes**:
  - Start Menu: Game title and instructions
  - Game: Main gameplay scene
  - Game Over: Display final score and restart option
  - High Score: View and track high scores
  - Shop: In-game shop (future feature)
- **Responsive Controls**: Use arrow keys for movement and jumping

## How to Run

1. Clone or download the project files
2. Open `index.html` in a modern web browser
3. The game will load automatically and display the start menu

## Controls

- **Left Arrow**: Move bunny left (only while jumping)
- **Right Arrow**: Move bunny right (only while jumping)
- **Space**: Start game from start menu
- **Automatic Jumping**: Bunny jumps automatically when landing on platforms

## Game Mechanics

- The bunny automatically jumps when touching a platform from above
- Use left/right arrows while in the air to control horizontal movement
- Collect carrots by touching them - they increase your score
- Avoid falling below the bottom platform or you'll game over
- Platforms scroll upward as you progress, creating an endless climbing experience
- Carrots are recycled and repositioned to maintain game performance

## Project Structure

```
bunny-jump/
├── index.html          # Main HTML file
├── jsconfig.json       # JavaScript configuration
├── src/
│   ├── main.js         # Game initialization and configuration
│   ├── lib/
│   │   └── phaser.js   # Phaser.js library
│   ├── types/
│   │   └── phaser.d.ts # TypeScript definitions
│   ├── scenes/
│   │   ├── StartMenu.js    # Start menu scene
│   │   ├── Game.js         # Main game scene
│   │   ├── GameOver.js     # Game over scene
│   │   ├── HighScore.js    # High score scene
│   │   └── Shop.js         # Shop scene
│   └── game/
│       └── Carrot.js       # Carrot game object
├── assets/
│   ├── bg_layer1.png           # Background image
│   ├── bunny1_stand.png        # Bunny standing sprite
│   ├── bunny1_jump.png         # Bunny jumping sprite
│   ├── carrot.png              # Carrot sprite
│   ├── ground_grass_broken.png # Platform sprite
│   └── sfx/
│       └── phaseJump1.ogg      # Jump sound effect
```

## Technologies Used

- **Phaser.js 3.55.2**: Game framework for HTML5 games
- **JavaScript ES6 Modules**: Modern JavaScript with module imports
- **Arcade Physics**: Phaser's built-in physics system
- **Web Audio API**: For sound effects

## Development

The game is built using Phaser.js with a scene-based architecture. Each scene handles different aspects of the game:

- **Game Scene**: Contains the main gameplay logic, physics, and rendering
- **Scene Management**: Phaser's scene system for managing different game states
- **Asset Loading**: Preloads all images and audio before starting scenes

## Future Enhancements

- Complete shop functionality for purchasing upgrades
- Additional power-ups and collectibles
- More detailed high score system with persistence
- Mobile touch controls
- Additional bunny skins and themes

## License

This project is open source and available under the MIT License.
