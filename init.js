load('api_config.js');
load('api_gpio.js');
load('api_http.js');
load('api_sys.js');
load('api_timer.js');
load('api_neopixel.js');

let pin = 5, numPixels = 16, colorOrder = NeoPixel.RGB;
let strip = NeoPixel.create(pin, numPixels, colorOrder);
strip.clear();
strip.show();

let gen = 0;
let isLain = false;
isLain = true;

// Blink built-in LED every second
Timer.set(1000 * 60 * 5 /* 5 min */, true /* repeat */, function() {
  HTTP.query({
    url: 'https://map.yahooapis.jp/weather/V1/place?coordinates=139.8066112,35.7482911&output=json&appid=dj00aiZpPWxFTFlCMWJETjlMTyZzPWNvbnN1bWVyc2VjcmV0Jng9NjY-',
    success: function(body, full_http_msg) {
      // print(body);
      let b = JSON.parse(body);
      let v = b.Feature[0].Property.WeatherList.Weather[1].Rainfall;
      // v = 4;
      isLain = v >= 1;
      if (isLain) {
        strip.clear();
        strip.show();
      }
    },
    error: function(err) { print(err); }  // Optional
  });
}, null);

Timer.set(300, true, function() {
  strip.clear();
  gen = (gen + 1) % 8;
  if (isLain) {
    for (let i = 0; i < 16; i++) {
      let level = ((i < 8 ? i : 8 - i) + gen & 8) % 8;
      strip.setPixel(i, 0, 0, level * 10);
      // print(i);
      // print(level * 10);
    }
    strip.show();
  }
}, null);
