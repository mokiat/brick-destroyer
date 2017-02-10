# Brick Destroyer

[![Build Status](https://travis-ci.org/mokiat/brick-destroyer.svg?branch=master)](https://travis-ci.org/mokiat/brick-destroyer)

Brick Destroyer is a 2D game written in JavaScript. Its main purpose is to showcase the benefits of using the Entity Component System (ECS for short) design in favor of the OOP inheritance model when describing game entities in the scope of game development.

[![Screenshot](https://github.com/mokiat/brick-destroyer/blob/master/screenshot.png)](http://mokiat.com/brick-destroyer/)

You can access the game here: **[http://mokiat.com/brick-destroyer/index.html](http://mokiat.com/brick-destroyer/index.html)**


## History

Initially developed in Java, this game employed OOP principles to model the various entity types (bricks, slider, ball) in the game and their various behaviors (disappear on hit, destroy neighbours on hit, etc.).

This game and others, however, had shown me that inheritance was not at all an ideal way to model entities that share parts of their behavior, as you would often hit [the diamond problem](https://en.wikipedia.org/wiki/Multiple_inheritance#The_diamond_problem).

I had heard of the Entity Component System design and had read a few articles on the internet about it. All of them made the design sound promising but most failed to provide a real-life example of its usage.

Seeing how the Brick Destroyer game is simple in its design, yet contains various entities that share behavior, it seemed like the ideal candidate to try the apporach for myself. I wanted to see how flexible it would be and whether new game ideas could emerge following this design.


## Entity Component System

There are various approaches to ECS described online. I decided to follow the approach that I find to be the purest in form. It boils down to the following types.

**Entities** are plain holder objects that contain an ID and a set of Components. They do not have any game logic implemented in them.

**Components** are just data structures. They are assigned to Entities and represent a behavior/feature that an Entity has. Components do not implement any game logic in them, similar to Entities.

**Systems** operate on Entities and Components. Each System implementation operates on Entities that have a given set of Components and performs some game logic on them.

In my implementation, I have used an **EventBus** type of communication between the Systems in order to maintain loose coupling.

It is important to note that I have done a very basic implementation of the ECS design. I was going for simplicity and ease of use, not performance.


## Flexible Levels

To make use of the full potential of ECS, I made use of the fact that objects in the game are just entities with components attached to them, and extracted that mapping into the JSON level file. In theory, this should allow for some very strange game logic to be implemented just by editing the level file.

To make it even easier, I made it possible for external levels to be loaded, by passing them to the URL. You can load your own custom level by using the following URL scheme: `http://mokiat.com/brick-destroyer/index.html#<url-to-your-level-json=file>`.
