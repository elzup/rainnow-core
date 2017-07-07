load('api_config.js');
load('api_gpio.js');
load('api_http.js');
load('api_sys.js');
load('api_timer.js');

// Helper C function get_led_gpio_pin() in src/main.c returns built-in LED GPIO
let led = 4;
let isLain = false;

let getInfo = function() {
  return JSON.stringify({total_ram: Sys.total_ram(), free_ram: Sys.free_ram()});
};

GPIO.write(led, GPIO.INT_LEVEL_LO);


// Blink built-in LED every second
GPIO.set_mode(led, GPIO.MODE_OUTPUT);
Timer.set(1000 * 5 * 60 /* 1 sec */, true /* repeat */, function() {
  HTTP.query({
    url: 'https://map.yahooapis.jp/weather/V1/place?coordinates=139.8066112,35.7482911&output=json&appid=dj00aiZpPWxFTFlCMWJETjlMTyZzPWNvbnN1bWVyc2VjcmV0Jng9NjY-',
    success: function(body, full_http_msg) {
      // print(body);
      let b = JSON.parse(body);
      let v = b.Feature[0].Property.WeatherList.Weather[1].Rainfall;
      // v = 4;
      isLain = v >= 1;
      if (isLain) {
        GPIO.write(led, GPIO.INT_LEVEL_LO);
      }
    },
    error: function(err) { print(err); }  // Optional
  });
}, null);

Timer.set(500, true, function() {
  if (isLain) {
    GPIO.toggle(led);
  }
}, null);
