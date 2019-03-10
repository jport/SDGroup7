#include <HX711.h>
#include <SoftwareSerial.h>

#define DOUT  3
#define CLK  2

#define RX 7  //for arduino not esp!!
#define TX 6

#define PACKET_SIZE 4

void redundancy (bool command(), int num_tries);
String AP = "Pixel_9798";       // CHANGE ME
String PASS = "SeniorDesign2"; // CHANGE ME
String IP = "192.168.43.248";   // CHANGE ME
String PORT= "2050";
int max_len = 100;
int count = 0;

HX711 scale(DOUT, CLK);
SoftwareSerial esp8266(RX,TX); 

void setup() {
  Serial.begin(9600);
  Serial.println("HX711 configured");

  esp8266.begin(9600);
  Serial.println("Configuring wifi module...");
  redundancy(at,5);
  redundancy(wifi_connect,2);
  redundancy(cipstart,10);

  Serial.println("-> Setup complete.");
  
  // put your setup code here, to run once:

}


void loop() {
  int my_data = get_data();
  cipsend(my_data);
  count++;
  //delay(100);

}

bool at() {
  Serial.println("-> AT");  
  delay(300);
  esp8266.println("AT");
  //delay(300);
  if(esp8266.find("OK")){
    //Serial.println("-> OK");
    return true;
  }
  else{
    //Serial.println("-> ERROR");
    return false;
  }
}

bool wifi_connect(){
  delay(1000);
  Serial.println("-> AT+CWJAP=\"Pixel_9798\",\"SeniorDesign2\"");  
  esp8266.println("AT+CWJAP=\"Pixel_9798\",\"SeniorDesign2\"");
  delay(4000);
  if(esp8266.find("OK")){
    //Serial.println("-> OK");
    return true;
  }
  else{
    //Serial.println("-> ERROR");
    return false;
  }
  //int my_count=1;
  //while(my_count<max_len){
  //  Serial.print(char(esp8266.read()));
  //  delay(100);
  //  my_count++;
  //}
  //Serial.println();  
}
bool cipstart(){
  Serial.println("-> AT+CIPSTART=\"TCP\",\"192.168.43.248\",2050");  
  cipclose();
  delay(500);
  esp8266.println("AT+CIPSTART=\"TCP\",\"192.168.43.248\",2050");
  delay(1000);
  if(esp8266.find("OK")){
    //Serial.println("-> OK");
    return true;
  }
  else{
    //Serial.println("-> ERROR");
    return false;
  }
}

bool cwmode(){
  Serial.println("-> AT+CWMODE=3");  
  delay(300);
  esp8266.println("AT+CWMODE=3");
  delay(300);
  if(esp8266.find("OK")){
    //Serial.println("-> OK");
    return true;
  }
  else{
    //Serial.println("-> ERROR");
    return false;
  }
}

bool cipsta(){
  Serial.println("-> AT+CIPSTA?");  
  delay(300);
  esp8266.println("AT+CIPSTA?");
  delay(1000);
  if(esp8266.find("OK")){
    Serial.println("-> OK");
    return true;
  }
  else{
    //Serial.println("-> ERROR");
    return false;
  }
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

int get_data(){
  Serial.print("Reading: ");
  //delay(300);
  long reading = scale.read_average(4); //Get a baseline reading.
  //long mass = round((-0.004877*double(reading)+2486)/10)*10;
  //int mass = round((-0.09*round(double(reading)/10)+5370));
  int mass =round(-0.00402*double(reading) -1876);
  Serial.println(mass);  
  return mass;
}

void cipsend(int data){
  
  Serial.println("-> AT+CIPSEND=8");
  Serial.println("-> Data: "+String(data));
  //delay(100);
  esp8266.println("AT+CIPSEND=4");
  delay(100);
  if (data<10 & data>=0){
    esp8266.print("0");
  }
  esp8266.println(String(data));
  delay(100);
  if(esp8266.find("OK")){
    Serial.println("-> OK");
    //return true;
  }
  else{
    Serial.println("-> ERROR");
    //return false;
  }
}


void redundancy (bool command(), int num_tries){
  bool success=false;
  int num=0;
  while(num<num_tries){
    if (command()){
      success=true;
      break;
    }
  }
  if (success){
    Serial.println("OK");
    
  }
  else{
    Serial.println("FAIL");
  }
}
