const int buttonPin = A0;
const int ledPin = 8;

void setup() {
  pinMode(buttonPin, INPUT);
  pinMode(ledPin, OUTPUT);
}

void loop() {
  int switchPosition = digitalRead(buttonPin);

  if (switchPosition == HIGH) {
    digitalWrite(ledPin, HIGH);
    digitalWrite(LED_BUILTIN, LOW);
  } else {
    digitalWrite(ledPin, LOW);
    digitalWrite(LED_BUILTIN, HIGH);
  }

  delay(1);
}
