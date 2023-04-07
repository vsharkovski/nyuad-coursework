// Pin positions.
const int potPin = A0;
const int buttonPin = 5;
const int trigPin = 6;
const int echoPin = 7;
const int speakerPin = 8;

// Other constants.
const int minDistance = 0;
const int maxDistance = 20;

const int toneDurationMin = 30;
const int toneDurationMax = 500;

const float toneDelayFactor = 1.3f;

void setup() {
  pinMode(potPin, INPUT);
  pinMode(buttonPin, INPUT);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(speakerPin, OUTPUT);
}

long getSensorDistance() {
  // Send pulse.
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  // Read pulse duration.
  long duration = pulseIn(echoPin, HIGH);
  // Calculate distance from duration.
  long distance = (double)duration * 0.034 / 2.0;

  return distance;
}

void loop() {
  // Get distance and constrain it.
  long distance = getSensorDistance();
  distance = constrain(distance, minDistance, maxDistance);
  
  // Map distance to tone frequency.
  int toneFreqMin, toneFreqMax;
  int buttonState = digitalRead(buttonPin);

  if (buttonState == LOW) {
    toneFreqMin = 20;
    toneFreqMax = 400;
  } else {
    toneFreqMin = 300;
    toneFreqMax = 1500;
  }

  int toneFrequency = map(distance, minDistance, maxDistance, toneFreqMin, toneFreqMax);

  // Calculate time to play the tone based on the potentiometer position.
  int potPosition = analogRead(potPin);
  int toneDuration = map(potPosition, 0, 1023, toneDurationMin, toneDurationMax);

  // Play the tone, then wait some time.
  int waitTime = toneDuration * toneDelayFactor;
  tone(speakerPin, toneFrequency, toneDuration);
  delay(waitTime);
}