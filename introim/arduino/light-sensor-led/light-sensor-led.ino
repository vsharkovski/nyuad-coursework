const int sensorPin = A3;
const int ledPin = 11;

// int minSensorValue = 1023;
// int maxSensorValue = 0;

int minSensorValue = 280;
int maxSensorValue = 850;

void setup() {
  Serial.begin(9600);
  pinMode(ledPin, OUTPUT);
}

void loop() {
  int sensorValue = analogRead(sensorPin);
  int brightness = map(sensorValue, minSensorValue, maxSensorValue, 0, 255);
  analogWrite(ledPin, brightness);
  Serial.println(sensorValue);
  delay(1);
}
