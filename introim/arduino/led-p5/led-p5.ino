const int ledPin = 5;

void setup() {
  Serial.begin(9600);
  pinMode(LED_BUILTIN, OUTPUT);
  pinMode(ledPin, OUTPUT);

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

    int brightness = Serial.parseInt();
    if (Serial.read() == '\n') {
      delay(5);
      Serial.println("1");
    }

    // Set LED brightness.
    analogWrite(ledPin, brightness);
  }
  digitalWrite(LED_BUILTIN, LOW);
}