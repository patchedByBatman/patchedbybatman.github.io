---
title: Arduino
description: Embedded programming of AVR micro-controllers using the Arduino platform. 
layout: libdoc_page.liquid
permalink: Electronics/Embedded Systems/Arduino/index.html
eleventyNavigation:
    key: Arduino
    parent: Embedded Systems
    order: 0
tags:
    - Electronics
    - Embedded Systems
    - Arduino
ogImageUrl: https://content.arduino.cc/assets/ArduinoCommunityLogo_SVG.svg
date: 2025-11-15
---

## Aim:
<p>
The articles in this sub-base aim to showcase and explain the implementation details of embedded systems through the programming of Arduino UNO. The code will be mainly written in C++ and we will be using Arduino IDE 2.0.
</p>

<p>
Though, we will be programming an Arduino UNO using the Arduino IDE, each article will cover both bare-metal programming and its equivalent Arduino high-level functions. For demonstration purposes, with the intention to maintain a cleaner look, the results will be showcased using the online platform <a href="https://www.tinkercad.com/">Tinkercad</a> by Autodesk. 
</p>

<p>
It is a really good website to build and test simple circuits, and will help you get started on embedded programming without having to get an actual Arduino. Although, if you can, I would highly recommend getting an Arduino/ Arduino Kit from the official shop at <a href="https://store.arduino.cc/">Arduino.cc</a> or any arduino engineering kits available from stores of your preference. Following along with actual hardware would benefit you a lot and the experience adds up overtime.
</p>

## Topics
1. {% iconCard '[Arduino IDE Basics](/Electronics/Embedded%20Systems/Arduino/Arduino%20IDE%20Basics.md)', 'How to install Arduino IDE, create a new sketch, and configure.', 'code' %}
2. {% iconCard '[Arduino Ports Basics](/Electronics/Embedded%20Systems/Arduino/Arduino%20Ports%20Basics.md)', 'IO maps and register configurations.', 'code' %}
3. {% iconCard '[Digital IO](/Electronics/Embedded%20Systems/Arduino/Digital%20IO.md)', 'How to use digital pins on Arduino as an Input or an Output.', 'code'%}