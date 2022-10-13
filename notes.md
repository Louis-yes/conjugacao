# notes


## Log
Not sure if this is how I want to do this, idk.

### 2022-10-13
- I'm deleting all the old stuff, I need to get this repo up into github. 
- I've got new designs too. Same styling, but different layout and some new components. 
- I'm planning to
  - remove the superfluous verb data
  - combine the full list of verbs into one file and load that always
  - make a ts type for verbs
  - use a text parsing interface for displaying verbs, like 'cantar:indicative/subjunctive:pinned' or something, divided by commas and formated with newlines. That way one could copy / paste verb setups, and all the interactions just push a line into this array.
- I'd like a local storage db interface

### 2022-09-28
- Stop using conjugacao.com.br, we don't need it anymore
  - I thought the 'quiz dizer' function would be useful, but I always know the exact verb I want
  - I could probably build my own 'quis dizer' function anyway
  - Start using the verb json data - [https://github.com/ian-hamlin/verb-data](https://github.com/ian-hamlin/verb-data)
- For now verb card can just be per-tense, with a select box used to change tense that's on display
- Cutting it down to the most basic possible functionality