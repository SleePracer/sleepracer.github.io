---
layout: page
permalink: /blueprints/
---


<font size="6">Blueprints</font>
<div style="margin-top: 15px"></div>

While the tracks in Career Mode are the base game tracks, the Rules of Play does a lot of things to enable Career Mode and to improve the racing experience.
Damage is calculated based on collisions and both reduce engine torque and requires repair after each race.
The drivatars are rebalanced for better racing, and can be boosted to be faster than normal unbeatable drivatars.


<div style="margin-top: 37px"></div>
# Damage

One of the core ideas of Career Mode is to encourage clean racing by having players pay for the repairs of their cars after each race.
This is done by having the Rules of Play track and sum up the force of all collisions and display it as "Damage" in the players HUD.
Damage is calculated in such a way that it increases fast at first, but never reaches 100% (using an x/(x+1) style function).
The damage also reduces the engine torque by 1% for every 3% damage, for both the player and drivatars.

As there is no way to automatically transfer the damage number from the game to the website, players must do this manually.
An alert near the end of the race will help the players remember to check the damage before the race ends.


<div style="margin-top: 37px"></div>
# Difficulty

Most of the drivatars are usually easy to beat, even on unbeatable, but the drivatar in first seems to always be a lot faster than the rest and is sometimes impossible to catch up with.
So the Rules of Play decreases the torque and grip of the drivatar in first by about 5% (and to a lesser extent, those in second and third) to stop them from running away completely.

To do this, the Rules of Play need to know which driver is the player, and which drivers are drivatars.
The only way to consistently do this is by looking at the player starting position on the grid.
And since the player starting position changes with difficulty, the difficulty needs to be fixed for the events.
Therefore, the Rules of Play also lets the player change the base torque and grip of the drivatars, between 60% and 140%, as a way of changing the difficulty.
When increasing the difficulty, the drivatars will be even faster than normal unbeatable drivatars.

Another aspect of the difficulty is the fact that drivatars are better at some tracks and worse at others.
Generally, the more handling focused a track is (the tracks in the city for example), the worse the drivatars will drive.
The base difficulty is therefore different for each event, to help balance this aspect.


<div style="margin-top: 37px"></div>
# Missing Checkpoints

It's my personal opinion that the punishment for missing a checkpoint in Forza Horizon 5 is too big, especially with rewinds being disabled for the Career Mode events.
The Rules of Play therefore detect whenever the players car is reset, and gives a temporary boost to torque and grip, letting the player catch back up.
This boost is not big enough to get you back to the place you were, as it also needs to be small enough to not be abuseable, but it's better than nothing.


<div style="margin-top: 37px"></div>
# Car Category

When adding any Rules of Play to a track in Forza Horizon 5, you also have to define the car category (and other things like number of laps and weather).
Since "Anything goes" is pretty much unusable due to the drivatars picking some very unsuitable cars, and since I don't want to make one blueprint per category per track, I had to settle for a single category.
Luckily, there's an option for custom car restriction, but unfortunately, it's limited to 50 cars.
This is the real reason that Career Mode uses a [custom roster of 50 cars](/roster), it's an in game restriction.
The roster is synchronized between the in game events and the website, so you should always be able to use the cars the website says you can.
