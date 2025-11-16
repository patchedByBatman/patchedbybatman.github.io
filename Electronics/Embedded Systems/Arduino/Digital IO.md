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
2. The use of pull-ups or pull-downs.
3. Creating a new sketch on the Arduino IDE and configuring com-port.
4. Basic of C and bit manipulation using bit-wise operators in C.
5. <em>Optional</em>: IO registers and port manipulation theory.

## The Aim:
<p>
This article aims to explain how to manipulate the digital IO ports on Arduino UNO. For this, we will utilise the digital pins 12 and 13 on the UNO board. Going forward these digital pins will be referred to as pin 12 and pin 13 respectively.
</p>

## The Plan:
<p>
Pin 13 on the Arduino UNO board is connected to the anode of an on-board LED. We can use this LED as a visual indicator when pin 13 is being manipulated.
</p>

<p>
First, we plan to learn to use pin 13 in output mode, and then pin 12 in input mode. In output mode, we want to turn ON/OFF the on-board LED using a simple C++ program (the program is also called as a sketch in the Arduino environment). We then explore how to utilise the pin 12 in input mode and read the state of input on the pin. The reason for selecting pin 12 for input and pin 13 for output is because we can write logic to visually indicate changes on pin 12 by controlling the LED on pin 13 accordingly.
</p>

{% alert 'The reader should be aware that the mode of operation and data manipulation of the IO pins on any micro-controller in general are controlled by configuring (setting or clearing bits) architecture specific registers. Don\'t worry, the article should still serve you, if you do not know how this works.', 'success', 'Note:' %}

## Arduino UNO IO Mapping
<p>
Though the pin we want to manipulate is referred to as pin 13 in the Arduino environment, on the PCB this pin is wired to pin 5 of Port-B on the AVR ATMEGA328P micro-controller. We will refer to this as PB5 in short. So, pin 13 is the alias given to pin 5 of Port-B in the Arduino environment.
</p>

<p>
The reader is encouraged to visit the official <a href="https://docs.arduino.cc/hardware/uno-rev3/">Arduino UNO R3 documentation page</a> and check out the <em>Advanced Section</em> of the <a href="https://docs.arduino.cc/resources/pinouts/A000066-full-pinout.pdf">Pinout pdf</a>.
</p>

## Output Mode
<p>
The IO mode of pin 5 of Port-B on ATMEGA328P can be configured by setting bit-5 of the corresponding Data Direction Register for Port-B (<code>DDRB</code>). This can be done as,
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
Now, we can set (<code>HIGH</code>) bit 5 of Port-B register (pin 5 of Port-B) to provide 5V on pin 13 or clear (<code>LOW</code>) to connect pin 13 to Ground (0V or <code>GND</code>). This is done as,
</p>

<pre>
<code class="cpp">
// This turns ON the LED
PORTB |= (1 &lt&lt PB5);  // To provide 5V on pin 13

// THis turns OFF the LED
PORTB &= ~(1 &lt&lt PB5);  // To provide 0V on pin 13
</code>
</pre>

<p>
The complete program to turn ON the on-board LED is as follows,
</p>

<pre>
<code class="cpp">
// Do not worry about the void setup and void loop at this stage
// only focus on turning ON the LED
void setup()
{
    // Configure pin 5 on Port-B as output
    DDRB |= (1 &lt&lt DDB5);

    // Turn ON the LED
    PORTB |= (1 &lt&lt PB5);
}

void loop(){}
</code>
</pre>

<p>
You can copy the above code on to a new Arduino sketch and upload. The on-board LED should now turn ON. To turn OFF the LED, copy the below code and upload.
</p>

<pre>
<code class="cpp">
// Do not worry about the void setup and void loop at this stage
// only focus on turning OFF the LED
void setup()
{
    // Configure pin 5 on Port-B as output
    DDRB |= (1 &lt&lt DDB5);

    // Turn OFF the LED
    PORTB &= ~(1 &lt&lt PB5);
}

void loop(){}
</code>
</pre>

<p>
Congratulations, you now know how to use a digital pin on an Arduino in output mode. If you feel like writing two different programs and reuploading each time to turn ON or OFF the LED isn't very useful, don't worry, as we slowly build our knowledge of embedded programming, you will be able write complex programs that can do a lot more than just controlling an LED. With this in mind, let us move on to using pin 12 in input mode.
</p>

## Input Mode

<p>
We can configure pin 12 by clearing bit-4 of <code>DDRB</code> register. When a particular pin is in input mode, the corresponding bit in <code>PORTB</code> register can be used to enable an on-chip internal pull-up for that pin. Setting the bit enables the pull-up, clearing the bit disables it. For now, we want to use the internal pull-up for pin 12, so we will set bit-4 of <code>PORTB</code>. Below piece of code shows how to configure pin 12 on the Arduino UNO R3 as a digital input pin with internal pull-up enabled. 
</p>

<pre>
<code class='cpp'>
DDRB &= ~(1 &lt&lt DDB4);  // Set pin 12 in input mode
PORTB |= (1 &lt&lt PB4);  // Enable internal pull-up for pin 12
</code>
</pre>

<p>
Now the input status on pin 12 can be read through bit-4 of the <code>PINB</code> register as follows.
</p>

<pre>
<code class='cpp'>
bool pin12_input_status = false;
pin12_input_status = (PINB & (1 &lt&lt PINB4)); 
</code>
</pre>

We can combine everything in to a single sketch and control the LED on pin 13 using input on pin 12 as follows,

<pre>
<code class='cpp'>
void setup()
{
    // Configure pin 12 as input.
    DDRB &= ~(1 &lt&lt DDB4);  // Set pin 12 in input mode
    PORTB |= (1 &lt&lt PB4);  // Enable internal pull-up for pin 12

    // Configure pin 13 as output.
    DDRB |= (1 &lt&lt DDB5);  // Set pin 14 in output mode
    PORTB &= ~(1 &lt&lt PB5);  // Turn OFF the LED
}

void loop()
{
    // Declaring bool here is wasteful.
    // But understandability is important for now.
    bool pin12_input_status = false;  
    pin12_input_status = (PINB & (1 &lt&lt PINB4));

    // if the input on pin 12 is HIGH.
    // HIGH, true, 1, and 5V are equivalent.
    if(pin12_input_status)
    {
        PORTB |= (1 &lt&lt PB5);  // Turn ON the LED
    }
    else
    {
        PORTB &= ~(1 &lt&lt PB5);  // Turn OFF the LED
    }
}
</code>
</pre>

<p>
After uploading the code to Arduino UNO R3, by default, the LED should turn ON. Now, if you take wire and short circuit pin 12 to the <code>GND</code> pin on the board, you will see the on-board LED turn OFF. Disconnecting pin 12 from <code>GND</code> should bring back the LED to ON state.
</p>

<p>
This code can be further simplified to,
</p>


<pre>
<code class='cpp'>
void setup()
{
    // Configure pin 12 as input and pin 13 as output.
    DDRB = (DDRB & ~(1 &lt&lt DDB4)) | (1 &lt&lt DDB5);
    PORTB = (PORTB | (1 &lt&lt PB4)) & (~(1 &lt&lt PB5));
}

void loop()
{
    // if the input on pin 12 is HIGH.
    if((PINB & (1 &lt&lt PINB4)))
    {
        PORTB |= (1 &lt&lt PB5);  // Turn on the LED
    }
    else
    {
        PORTB &= ~(1 &lt&lt PB5);  // Turn off the LED
    }
}
</code>
</pre>
