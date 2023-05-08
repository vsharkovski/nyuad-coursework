#include <Servo.h>

// Pins.
const int trig1Pin = 4;
const int echo1Pin = 3;
const int trig2Pin = 5;
const int echo2Pin = 6;
const int servoPin = 9;
const int speakerPin = 11;

// Variables.
float X, Y; // X and Y reported from distance sensors.

int speakerFrequency = 0;

const unsigned long speakerTimeoutMillis = 100;
unsigned long lastSpeakerFrequencyChangeMillis = 0;

Servo servo; // Servo object for controlling the motor.
int servoPosition = 0; // Variable for servo position.

const int totalServoIterations = 4;
int servoIteration = totalServoIterations;

const unsigned long servoDelayMillis = 200;
unsigned long lastServoMoveMillis = 0;

// Functions.
void setupP5();
void communicateP5();
void trackPosition();
float getSensorResult(int, int);
float mapFloat(float, float);
void rotateServoIfNeeded();
void updateSpeakerToneIfNeeded();

void setup() {
  Serial.begin(9600);

  pinMode(LED_BUILTIN, OUTPUT);
  pinMode(trig1Pin, OUTPUT);
  pinMode(trig2Pin, OUTPUT);
  pinMode(echo1Pin, INPUT);
  pinMode(echo2Pin, INPUT);
  servo.attach(servoPin);

  setupP5();
}

void loop() {
  communicateP5();
}

void setupP5() {
  // Do handshake.
  while (Serial.available() <= 0) {
    digitalWrite(LED_BUILTIN, HIGH);
    Serial.println("0,0");
    delay(300);
    digitalWrite(LED_BUILTIN, LOW);
    delay(50);
  }  
}

void communicateP5() {
  // Wait for data from p5 before doing something.
  while (Serial.available()) {
    digitalWrite(LED_BUILTIN, HIGH); // Led on while receiving data.

    unsigned long currentMillis = millis();

    bool goodSignal = true;
    int operation = Serial.parseInt();
  
    if (operation == 1) {

    } else if (operation == 2) {
      servoIteration = 0;
    } else if (operation == 3) {
      Serial.read(); // ,
      speakerFrequency = Serial.parseInt();
      lastSpeakerFrequencyChangeMillis = currentMillis;
    } else {
      goodSignal = false;
    }

    Serial.read(); // \n

    if (goodSignal) {
      rotateServoIfNeeded();
      updateSpeakerToneIfNeeded();

      trackPosition();
      Serial.print(X);
      Serial.print(",");
      Serial.print(Y);

      // Debug stuff.
      // Serial.print(",");
      // Serial.print(operation);
      // Serial.print(",");
      // Serial.print(speakerFrequency);
      // Serial.print(",");
      // Serial.print(lastSpeakerFrequencyChangeMillis);
      // Serial.print(",");
      // Serial.print(servoIteration);
      // Serial.print(",");
      // Serial.print(servoPosition);
      // Serial.print(",");
      // Serial.print(lastServoMoveMillis);

      Serial.println();
      delay(100);
    } else {
      servoIteration = totalServoIterations;
      speakerFrequency = 0;
      Serial.println("-1,-1");
    }
  }

  digitalWrite(LED_BUILTIN, LOW);
}

void trackPosition() {
  float d1, d2;

  d1 = getSensorResult(trig1Pin, echo1Pin);
  delay(10);
  d2 = getSensorResult(trig2Pin, echo2Pin);
  
  d1 = constrain(d1, 10, 150);
  d2 = constrain(d2, 10, 150);

  X = mapFloat01((float)d1, 10.0f, 150.0f);
  Y = mapFloat01((float)d2, 10.0f, 150.0f);
}

float getSensorResult(int trigPin, int echoPin) {
  // Send pulse.
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  // Read pulse duration.
  long duration = pulseIn(echoPin, HIGH);
  
  // Calculate distance from duration.
  float distance = (float)duration * 343.0f / 2000.0f;

  return distance;
}

float mapFloat01(float x, float minX, float maxX) {
  return (x - minX) / (maxX - minX);
}

void rotateServoIfNeeded() {
  unsigned long currentMillis = millis();

  if (servoIteration < totalServoIterations && lastServoMoveMillis + servoDelayMillis < currentMillis) {
    // Time to switch the servo motor position.
    if (servoPosition == 60) {
      servoPosition = 120;
      servo.write(120);
    } else {
      servoPosition = 60;
      servo.write(60);
    }
    servoIteration++;
    lastServoMoveMillis = currentMillis;  
  }
}

void updateSpeakerToneIfNeeded() {
  unsigned long currentMillis = millis();

  if (lastSpeakerFrequencyChangeMillis + speakerTimeoutMillis < currentMillis) {
    // Speaker was played long enough ago that we should stop it.
    speakerFrequency = 0;
  }

  if (speakerFrequency <= 0) {
    noTone(speakerPin);
  } else {
    tone(speakerPin, speakerFrequency);
  }
}