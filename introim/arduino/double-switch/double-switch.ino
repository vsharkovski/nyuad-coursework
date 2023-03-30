/*
Author: Vladimir Sharkovski
Date: March 30, 2023

Description:
Homework assignment for the course Introduction to Interactive Media.

This project is a simulation of human thirst. We have two LED lights:
- A blue light, which indicates how 'full' of water we are. In the code,
  our 'fullness' is represented by the variable 'capacity'. The lower the
  capacity, the thirstier we are.
  The blue light's brightness indicates our capacity.
- A red light, which is a warning light. When our capacity goes below
  a threshold, the red light blinks, as a warning that we're thirsty.

Moreover, we have two inputs:
- A push button. Clicking it refills our capacity to maximum.
- A photosensor. When we cover the photosensor with our hand, the capacity
  goes down faster, which is similar to how physical activity (e.g.
  exercise) makes us thirstier faster.
*/

// Pins.
const int buttonPin = A0;
const int sensorPin = A1;
const int ledCapacityPin = 9;
const int ledWarningPin = 10;

// Input values from the photosensor. They will usually vary between locations
// due to different lighting conditions.
// In the IM lab, good values are 250 and 800.
// In my dorm, good values are 70 and 600.
const int minSensorValue = 70;
const int maxSensorValue = 600;

// Parameters for capacity of the water cup.
const int maxCapacity = 10000;
const int minCapacityChange = 0;
const int maxCapacityChange = 30;
const int capacityWarningThreshold = 3000;

// How many iterations between blinking of warning light.
const long warningInterval = 20;

// The current capacity.
int capacity = 0;

// The iteration increments by 1 every call to draw().
long currentIteration = 0;

// The iteration when the warning light last changed state. 
// -1 means it has not blinked yet since water cup was refilled.
long lastWarningIteration = -1;

// The current state of the warning light.
int warningState = LOW;

void setup() {
  Serial.begin(9600);
  pinMode(buttonPin, INPUT);
  pinMode(sensorPin, INPUT);
  pinMode(ledCapacityPin, OUTPUT);
  pinMode(ledWarningPin, OUTPUT);
}

void loop() {
  int buttonValue = digitalRead(buttonPin);

  if (buttonValue == HIGH) {
    // When button is pressed, capacity should be set to max.
    capacity = maxCapacity;
    // Reset warning.
    lastWarningIteration = -1;
    warningState = LOW;
  }

  int sensorValue = analogRead(sensorPin);

  // Smaller sensor value means higher capacity change.
  int change = map(sensorValue, minSensorValue, maxSensorValue, maxCapacityChange, minCapacityChange);

  // Decrease the capacity.
  capacity -= change;
  if (capacity < 0) capacity = 0;

  // Map capacity to brightness.
  int brightness = map(capacity, 0, maxCapacity, 0, 255);
  analogWrite(ledCapacityPin, brightness);

  // Blink warning light if capacity is low enough.
  if (0 < capacity && capacity < capacityWarningThreshold) {
    if (lastWarningIteration == -1 || lastWarningIteration + warningInterval < currentIteration) {
      // First condition: Blinking for first time since water cup refill.
      // Second condition: It is time to blink again, because enough time passed.
      warningState = warningState == LOW ? HIGH : LOW;
      lastWarningIteration = currentIteration;
    } else {
      // Wait. Do not swap blink state.
    }
  } else if (capacity == 0) {
    // When capacity is 0, keep warning light on.
    warningState = HIGH;
  }

  digitalWrite(ledWarningPin, warningState);

  // Debug info.
  Serial.print(buttonValue);
  Serial.print(" ");
  Serial.print(sensorValue);
  Serial.print(" ");
  Serial.print(change);
  Serial.print(" ");
  Serial.print(capacity);
  Serial.print(" ");
  Serial.print(brightness);
  Serial.print(" ");
  Serial.print(warningState);
  Serial.println();

  // Increment iteration count.
  currentIteration++;

  // Delay for stability.
  delay(1);
}
