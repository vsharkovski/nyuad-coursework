const int ledPin = 2;
const int sensorPin = A0;

void setup() {
  Serial.begin(9600);
  pinMode(LED_BUILTIN, OUTPUT);
  pinMode(ledPin, OUTPUT);
  pinMode(sensorPin, INPUT);

  // Do handshake
  while (Serial.available() <= 0) {
    digitalWrite(LED_BUILTIN, HIGH);
    Serial.println("0");
    delay(300);
    digitalWrite(LED_BUILTIN, LOW);
    delay(50);
  }
}

void loop() {
  // Wait for data from p5 before doing something.
  while (Serial.available()) {
    digitalWrite(LED_BUILTIN, HIGH); // Led on while receiving data.

    int isBouncing = Serial.parseInt();

    if (Serial.read() == '\n') {
      // Read potentiometer position and send it.
      int potPosition = analogRead(sensorPin);
      delay(5);
      Serial.println(potPosition);
    }

    // Set LED brightness based on whether bouncing.
    if (isBouncing) {
      digitalWrite(ledPin, HIGH);
    } else {
      digitalWrite(ledPin, LOW);
    }
  }

  digitalWrite(LED_BUILTIN, LOW);
}