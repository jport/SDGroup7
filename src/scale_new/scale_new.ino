#include <LowPower.h>
#include <SoftwareSerial.h>

#include <HX711.h>

#define DOUT 3
#define CLK 2

#define RX 7
#define TX 6

#define FSM_IDLE 0
#define FSM_ON 1

String AP = "Pixel_9798";
String PASS = "SeniorDesign2";
String IP = "192.168.43.248";
String PORT = "2050";

int STATE = FSM_IDLE;

/* Hardware Variables */
HX711 scale(DOUT, CLK);
SoftwareSerial esp8266(RX, TX);

void setup()
{
  Serial.begin(9600);
  esp8266.begin(9600);
  esp8266.listen();
  
  // Connect to wifi
  //at();
  //cwmode();
  //wifi_connect();
}

void loop()
{
  if(STATE == FSM_ON)
  {
    double myData = get_data();
    //delay(1000);
    cipsend(myData);
    if(!cipsend(myData))
      STATE = FSM_IDLE;
    //STATE = 100;

    //Serial.println("DONE");
  }
  else if(STATE == FSM_IDLE)
  {
    cipclose();
    if(cipstart())
    {
      STATE = FSM_ON;
      delay(2000);
    }
    else
    {
      LowPower.powerDown(SLEEP_8S, ADC_OFF, BOD_OFF);
    }
  }
}

bool cipsend(double data)
{
  String str = String(data);
  String len = String(str.length());

  String command = "AT+CIPSEND=" + String(len);
  //Serial.println(command);
  esp8266.println(command);

  while(!esp8266.available());
  while(esp8266.available())
  {
    esp8266.read();
    //Serial.print((char)esp8266.read());
    delay(10);
  }

  //Serial.println(str);
  esp8266.println(str);

  bool ret = false;
  while(!esp8266.available());
  while(esp8266.available())
  {
    char c = esp8266.read();
    //Serial.print(c);

    if(c == 'K')
      ret = true;
      
    delay(10);
  }

  /*while(!esp8266.available());
  while(esp8266.available())
  {
    Serial.print((char)esp8266.read());
    delay(5);
  }*/

  return ret;
}

bool at() {
  Serial.println("AT");  
  delay(300);
  esp8266.println("AT");
  delay(300);
  
  while(esp8266.available())
    Serial.print((char)esp8266.read());

  return true;
}

bool cwmode()
{
  Serial.println("-> AT+CWMODE=3");  
  esp8266.println("AT+CWMODE=3");
  delay(300);

  while(esp8266.available())
    Serial.print((char)esp8266.read());
  return true;
}

bool wifi_connect()
{
  delay(1000);
  Serial.print("AT+CWJAP=\"");
  Serial.print(AP);
  Serial.print("\",\"");
  Serial.print(PASS);
  Serial.print("\"\n");

  
  esp8266.println("AT+CWJAP=\"Pixel_9798\",\"SeniorDesign2\"");

  while(!esp8266.available());
  while(esp8266.available())
  {
    Serial.print((char)esp8266.read());
    delay(5);
  }

  while(!esp8266.available());
  while(esp8266.available())
  {
    Serial.print((char)esp8266.read());
    delay(5);
  }

  while(!esp8266.available());
  while(esp8266.available())
  {
    Serial.print((char)esp8266.read());
    delay(5);
  }

  while(!esp8266.available());
  while(esp8266.available())
  {
    Serial.print((char)esp8266.read());
    delay(5);
  }
    
  return false;
}

bool cipstart()
{
  Serial.print("-> AT+CIPSTART=\"TCP\",\"");
  Serial.print(IP);
  Serial.print("\",");
  Serial.print(PORT);
  Serial.print("\n");

  esp8266.print("AT+CIPSTART=\"TCP\",\"");
  esp8266.print(IP);
  esp8266.print("\",");
  esp8266.print(PORT);
  esp8266.println();

  bool ret = false;
  while(!esp8266.available());
  while(esp8266.available())
  {
    char c = esp8266.read();

    if(c == 'K')
      ret = true;
      
    Serial.print(c);
    delay(10);
  }

  return ret;

  ret = false;

  while(!esp8266.available());
  while(esp8266.available())
  {
    char c = esp8266.read();

    if(c == 'K')
      ret = true;
      
    Serial.print(c);
    delay(5);
  }

  return ret;
}
void cipclose(){
  Serial.println("->AT+CIPCLOSE");  
  delay(300);
  esp8266.println("AT+CIPCLOSE");
  delay(300);
  if(esp8266.find("OK")){
    Serial.println("-> OK");
    //return true;
  }
  else{
    Serial.println("-> ERROR");
    //return false;
  }
}

double get_data()
{
  Serial.print("Reading: ");
  //delay(300);
  long reading = scale.read_average(10); //Get a baseline reading.
  //long mass = round((-0.004877*double(reading)+2486)/10)*10;
  //int mass = round((-0.09*round(double(reading)/10)+5370));
  //int mass =round(-0.00402*double(reading) -1876);
  //int mass =round(-0.00377*double(reading) +1580);
  double mass = -0.00378*double(reading)+1669.1;
  Serial.println(mass);  
  return mass;
}
