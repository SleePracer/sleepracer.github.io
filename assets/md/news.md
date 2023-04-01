---
layout: page
title: News
permalink: /news/
---


<div style="margin-top: 37px"></div>
# QoL: Paint button!

There's now a "Paint" button in the garage, that essentially does a 5 000 credit upgrade of your car to the same PI!
Just as for upgrades, the value is increased by half of that amount.

Also, the "Get in" button only shows for the cars you're not already in.

That's all!
<div style="text-align: right">
  <em>
    Anaerobisk / SleePracer, 2023-04-01
  </em>
</div>


<div style="margin-top: 37px"></div>
# Beta 0.2.2: Updated blueprints!

As I worked on adding switchable difficulty (and other things) to the Rules of Play, I realized that these updates were a massive improvement.
So I spent the weekend on getting the new rules finished, blueprints re-shared and sharecodes updated!
They are now live!
Here's a list of improvements:
  * Switchable difficulties (this is the big one!)
      * At the start of a race, you will have 10 seconds to press Activate or Rewind to increase or decrease the difficulty of the event!
  * Improved balancing
      * Difficulty now affects drivatar grip in addition to torque, and some light balancing between tracks has been applied!
  * Taking damage reduces your torque
      * In almost all events, your damage is divided by three and subtracted from your engine torque. Stay out of trouble!
  * Boost mode after checkpoint miss and car reset
      * A little extra help to get back in the race! Not big enough to be abuseable, but enough to soften the blow of a missed checkpoint!

Let me stress once again, that the game is balanced for you to place somewhere in the top 6 on average!
Winning every now and then is all good of course, but winning twice in a row probably means that the difficulty is set too low.
On the other end of the spectrum, if you just barely manage to finish in 6th and sometimes place even worse, the difficulty is set too high!
The steps should be granular enough to let you find a sweet spot.
Also note that when changing builds, cars or categories, your sweet spot difficulty might change!

In addition to this (in my opinion) massive improvement, I'm also going to remove the requirement to finish class advancement races in podium.
I failed several times and it was annoying, frustrating and not fun.
I'll replace it with some extra reward for podium instead, in the future, but this is a necessary hotfix for now.

Happy racing!
<div style="text-align: right">
  <em>
    Anaerobisk / SleePracer, 2023-03-26
  </em>
</div>


<div style="margin-top: 37px"></div>
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


<div style="margin-top: 37px"></div>
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

