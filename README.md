# Brick Destroyer

![](https://travis-ci.org/momchil-atanasov/brick-destroyer.svg?branch=master)

Brick Destroyer is a 2D game written in JavaScript. Its main purpose is to showcase the benefits of using the Entity Component System design in favor of Object Oriented Programming when Game Development is concerned.

![](https://github.com/momchil-atanasov/brick-destroyer/blob/master/screenshots/brick_destroyer.png)

You can access the game here: **[momchil-atanasov.com/brick-destroyer/](http://momchil-atanasov.com/brick-destroyer/)**

## History

Initially the game was developed in Java and was my attempt at creating an interesting physics-based brick destroyer game using Object Oriented Programming concepts. It was meant to demonstrate good OOP patterns and approaches.

The original game was hosted on `code.google.com` and a while back Google stated that they would be shutting down their service. I wasn't quite ready to give up on the game and I decided I would migrate it to GitHub.

Looking at the old code, however, showed me that my OOP design skills were not at all good back in the days. The large number of static or singleton `Manager` classes was not something I was proud of and hence had no place on GitHub.

My only option was to rewrite the whole game. I would do some improvements along the way.

First, I would write it in JavaScript instead of Java. It turns out that Java isn't that portable and in fact my game would not work on OS X. JavaScript was supposed to fix that.

Now, I am not the biggest fan of JavaScript, but that language had one additional benefit. I would be able to host it directly on GitHub.

Lastly, I have long wanted to try the Entity Component System design. The mechanics of the game made it perfect for a test run.

## Entity Component System

As mentioned already, the design of the game is based on the Entity Component System approach. There are a lot of documents on the internet that explain what it is roughly about. However, not all of them agree on the exact details. I have tried to follow the approach I find to be the purest in form.

**Entities** are plain objects that contain a set of Components. Entities do not hold any data themselves, except for an ID.

**Components** are just data structures. They are assigned to Entities and represent a behavior/feature that an Entity has. Components do not have any methods on them.

**Systems** operate on Entities and Components. They filter out only Entities that have a specific set of Components and act on them.

In my implementation, I have used an **EventBus** type of communication between the Systems in order to maintain loose coupling.

**Note:** Since I have written the ECS framework on my own and this is my first go at it, I cannot guarantee that my implementation is the best example out there. Furthermore, I know for sure that it is not the fastest. Achieving a perfect framework was not my goal. I wanted to see whether ECS does make the design more flexible; whether new Entities can be designed by mixing up Components in an unplanned way; whether all of this would be difficult to apply and develop through TDD.

## Creating Your Own Level

Since I am using ECS and all the entities in the Level are just a collection of components, I decided that it would be interesting to allow the whole level to be described through a JSON file. The game would parse the JSON file and convert the data there into actual components and entities.

It worked out pretty well and in fact allowed me to extract almost all of the logic of the game inside those JSON levels. Furthermore, now levels can actually be loaded from remote location and one can design their own mechanics in the game just by using the components types that are supported by the engine.

You can load your own custom level by using the following URL scheme: `http://momchil-atanasov/brick-destroyer#<url-to-your-level-json=file>`.
