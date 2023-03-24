---
layout: page
title: News
permalink: /news/
---


# QoL and bugs

The things I mentioned in the previous post were indeed easy to implement, and are now live on the site!
New quality of life improvements are:
  * When browsing for new cars, unaffordable cars of your class and below are also visible
  * Showcase information now includes what track is raced
  * Negative money and unaffordable costs are now red

I've also fixed some bugs:
  * Decimal point for damage now affects repair cost as intended
  * Clicking the racing category again no longer changes what normal events are available
      * Switching between categories still does though!
  * Suggested repaint cost is now 5k on the Rules and Info page
      * Lowered from 10k after playtesting, although it I accidentally put it as 100k...

Next up should be general documentation improvements, but I've also started work in parallel on updating the blueprints!
If everything goes smoothly, the sharecodes will be updated next week, with:
  * Switchable difficulty
  * Improved balancing
  * Torque reduction from damage

Something to look forward to!
<div style="text-align: right">
  <em>
    Anaerobisk / SleePracer, 2023-03-24
  </em>
</div>


# Beta 0.2.1: News page

Introducing the "News" page, where I'll keep you up to date on the progress of Career Mode!
This will serve as a change log and maybe a blog, hopefully adding a bit of transparency to the project.
As I work on this sporadically, posts will also happen sporadically, depending on how much time I feel like spending on this hobby project of mine.

Any time there's a new post, the notification on the game page will be visible, and when you press the "Ok" button it will go away.
Adding this notification technically means a new version of the game, but only because I'm using the game state to keep track of whether it should be shown or hidden.
The game has no other updates with this version.

Next up I'll focus on things that should be easy to implement but will affect the game in a positive way:
  * Show cars of the current class and lower that the players can *not* afford in the buy car menu too
  * The decimal number for damage % on races is currently irrelevant, this is a bug, fix it
  * Make the money display red when player has negative money
  * More detailed documentation in the rules page, I'm imagining a wiki-like structure with some info that's currently only accessible by reading source code

That's all for now, thank you for reading!
<div style="text-align: right">
  <em>
    Anaerobisk / SleePracer, 2023-03-22
  </em>
</div>

