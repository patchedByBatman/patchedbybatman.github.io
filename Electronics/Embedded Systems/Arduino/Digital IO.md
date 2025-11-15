---
title: Digital IO
description: This article covers how to control digital IO on Arduino UNO R3. 
layout: libdoc_page.liquid
permalink: Electronics/Embedded Systems/Arduino/Digital IO/index.html
eleventyNavigation:
    key: Digital IO
    parent: Arduino
    order: 1
tags:
    - Electronics
    - Embedded Systems
    - Arduino
# date: 15-11-2025
---

## Prerequisites
<p>
Though this article deals with a very fundamental topic in embedded systems, it is assumed that the reader already has the knowledge of the following topics.
</p>

1. LED biasing and the use of current limiting resistors.
2. Push buttons and the use of pull-ups or pull-downs.
3. Creating a new sketch on the Arduino IDE and configuring com-port.
4. Basic of C and bit manipulation using bit-wise operators in C.
5. <em>Optional</em>: IO registers and port manipulation theory.

## The Aim:
<p>
This article aims to explain how to manipulate the digital IO ports on Arduino UNO. For this, we will utilise the digital pin 13 on the UNO board. Going forward the digital pin 13 will be refered to as pin 13.
</p>

## The Plan:
<p>
Pin 13 on the Arduino UNO board is connected to the anode of an on-board LED. We can use this LED as a visual indicator when pin 13 is being manipulated.
</p>

<p>
First, we plan to learn to use pin 13 in output mode, and then in input mode. In output mode, we want to turn on/off the on-board LED using a simple C++ program (the program is also called as a sketch in the Arduino environment). We then explore how to utilise the same pin 13 in input mode and read the state of a push button.
</p>

{% alert 'The reader should be aware that the mode of operation and data manipulation of the IO pins on any micro-controller in general are controlled by configuring (setting or clearing bits) architecture specific registers. Don\'t worry, the article should still serve you, if you do not know how this works.', 'success', 'Note:' %}

## Arduino UNO IO mapping
<p>
Though the pin we want to manipulate is referred to as pin 13 in the Arduino environment, on the PCB this pin is wired to Pin 5 of Port-B on the AVR ATMEGA328P micro-controller. We will refer to this as PB5 in short.
</p>

<p>
The reader is encouraged to visit the official <a href="https://docs.arduino.cc/hardware/uno-rev3/">Arduino UNO R3 documentation page</a> and check out the <em>Advanced Section</em> of the <a href="https://docs.arduino.cc/resources/pinouts/A000066-full-pinout.pdf">Pinout pdf</a>.
</p>

## Output mode
<p>
The IO mode of Port-B on ATMEGA328P can be configured by setting bit-5 of the Data Direction Register <code>DDRB</code>. This can be done as,
</p>

<pre>
<code class="cpp">
// You can use any of the following 5 notations and they are equivalent
// Using 8-bit Binary notation
DDRB = ( DDRB | 0b00100000);

// Using 8-bit Hex notation
DDRB = (DDRB | 0x20);

// Short-hand notation using compound assignment operator
DDRB |= (0x20);  // this is equivalent to writing DDRB = (DDRB | 0x20)

// Using bit-wise left shift operator
DDRB |= (1 &lt&lt 5);

// Using DDB5 existing macro
DDRB |= (1 &lt&lt DDB5);  // Preferred
</code>
</pre>

<p>
Going forward, we will prefer the last notations as it is both compact and readable. The macro <code>DDB5</code> can be read as <em>Data Direction register port-B bit 5</em> and it resolves to a literal constant of vale 5.
</p>

<p>
Now, we can set (<code>HIGH</code>) bit 5 of Port-B register (Pin 5 of Port-B) to provide 5V on pin 13 or clear (<code>LOW</code>) to connect pin 13 to Ground (0V or <code>GND</code>). This is done as,
</p>

<pre>
<code class="cpp">
// This turns on the LED
PORTB |= (1 &lt&lt PB5);  // To provide 5V on pin 13

// THis turns off the LED
PORTB &= ~(1 &lt&lt PB5);  // To provide 0V on pin 13
</code>
</pre>

<p>
The complete program to turn on the on-board LED is as follows,
</p>

<pre>
<code class="cpp">
// Do not worry about the void setup and void loop at this stage
// only focus on turning on the LED
void setup()
{
    // Configure pin 5 on Port-B as output
    DDRB |= (1 &lt&lt DDB5);

    // Turn on the LED
    PORTB |= (1 &lt&lt PB5);
}

void loop(){}
</code>
</pre>

<p>
You can copy the above code on to a new Arduino sketch and upload. The on-board LED should now turn on. To turn off the LED, copy the below code and upload.
</p>

<pre>
<code class="cpp">
// Do not worry about the void setup and void loop at this stage
// only focus on turning on the LED
void setup()
{
    // Configure pin 5 on Port-B as output
    DDRB |= (1 &lt&lt DDB5);

    // Turn on the LED
    PORTB &= ~(1 &lt&lt PB5);
}

void loop(){}
</code>
</pre>

<p>
Congratulations, you now know how to use a digital pin on an Arduino in output mode. If you feel like writing two different programs and reuploading each time to turn on or off the LED isn't very useful, don't worry, as we slowly build our knowledge of embedded programming, you will be able write complex programs that can do a lot more than just controlling an LED. With this in mind, let us move on to using pin 13 in input mode.
</p>

