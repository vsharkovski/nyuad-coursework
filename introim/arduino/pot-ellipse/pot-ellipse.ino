void setup() {
  Serial.begin(9600);
  pinMode(LED_BUILTIN, OUTPUT);

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

    int result = Serial.parseInt();
    if (Serial.read() == '\n') {
      int sensor = analogRead(A1);
      delay(5);
      Serial.println(sensor);
    }
  }
  digitalWrite(LED_BUILTIN, LOW);
}