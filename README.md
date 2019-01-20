# Heads Up v2.0

This React web app is inspired by the native iOS and Android game, _"Heads Up!"_

I find this game to be really fun to play in group settings. There's just a couple of things about the original that I don't like:

1. Ability to get repeat cards from a deck per playing session
2. $1.00 for paid decks
3. The "Build-your-own-deck" mode isn't easy to set up on mobile

## Solutions

1. No more repeats per playing session
2. It's free. Use the existing decks or make your own
3. Building your own deck is as simple as adding words to a google (excel) sheet

## Setup
1. Create a public or unlisted (recommended) google sheet
2. Each column is a deck, the name of the deck must be in the top row
3. [Request an API key][1]
4. Replace your new API key with `API_KEY` in `componentDidMount`

## How to Play

Almost exactly like the original:

* Choose a deck
* Put phone on forehead and wait for game to start
* Tilt phone down for correct, up for skip
* __Shake the phone back-and-forth to exit the game or pre-game countdown at any time__

[1]: https://developers.google.com/sheets/api/guides/authorizing#APIKey
