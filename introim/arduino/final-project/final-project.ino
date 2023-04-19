// Pins.
const int trig1Pin = 4;
const int echo1Pin = 3;
const int trig2Pin = 5;
const int echo2Pin = 6;

// Other constants.
const float minDistance = 500.0f;
const float maxDistance = 1000.0f;

void setupP5();
void communicateP5();
void trackPosition();
float getSensorResult(int, int);

float X, Y;

void setup() {
  Serial.begin(9600);

  pinMode(LED_BUILTIN, OUTPUT);
  pinMode(trig1Pin, OUTPUT);
  pinMode(trig2Pin, OUTPUT);
  pinMode(echo1Pin, INPUT);
  pinMode(echo2Pin, INPUT);

  // setupP5();
}

void loop() {
  trackPosition();
  Serial.print(X);
  Serial.print("\t");
  Serial.println(Y);
  communicateP5();
}

void setupP5() {
  // Do handshake.
  while (Serial.available() <= 0) {
    digitalWrite(LED_BUILTIN, HIGH);
    Serial.println("0");
    delay(300);
    digitalWrite(LED_BUILTIN, LOW);
    delay(50);
  }  
}

void communicateP5() {
  // Wait for data from p5 before doing something.
  while (Serial.available()) {
    digitalWrite(LED_BUILTIN, HIGH); // Led on while receiving data.

    int x = Serial.parseInt();

    if (Serial.read() == '\n') {
      delay(500);
      Serial.println("hello,from,arduino");
    }
  }

  digitalWrite(LED_BUILTIN, LOW);
}

void trackPosition() {
  float d1, d2;

  d1 = getSensorResult(trig1Pin, echo1Pin);
  delay(10);
  d2 = getSensorResult(trig2Pin, echo2Pin);
  
  d1 = constrain(d1, 0, 500);
  d2 = constrain(d2, 0, 500);

  // Serial.print(d1);
  // Serial.print("\t");
  // Serial.println(d2);

  X = d1;
  Y = d2;

  delay(200);
}

void trackPosition2() {
  float d1, d2, theta;

  float dist = 70.0f; // Between sensors

  d1 = getSensorResult(trig1Pin, echo1Pin);
  delay(10);
  d2 = getSensorResult(trig2Pin, echo2Pin);

  theta = acos((((d1*d1)+(dist*dist)-(d2*d2)))/(2.0f*d1*dist));
  if (theta > 0.0f && theta < 3.0f) {
    X = d1 * cos(theta) + dist * 0.5f;
    Y = d1 * sin(theta);

    
    X = constrain(X, -1000, 1000);
    Y = constrain(Y, 0, 1000);

    Serial.print(X);
    Serial.print("\t");
    Serial.println(Y);
  } else {

  }

  // Serial.print(d1);
  // Serial.print("\t");
  // Serial.println(d2);

  delay(200);
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