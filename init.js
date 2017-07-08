load('api_config.js');
load('api_rpc.js');
load('api_http.js');
load('api_sys.js');
load('api_timer.js');
load('api_neopixel.js');

let pin = 4, numPixels = 16, colorOrder = NeoPixel.RGB;
let strip = NeoPixel.create(pin, numPixels, colorOrder);
strip.clear();
strip.show();


let state = {};
for (let i = 0; i < 16; ++i) {
    state[i] = { "on": true, "color": { "r": 255, "g": 255, "b": 255 } };
}

RPC.addHandler('Control', function(args) {
    let start = args.start;
    let end = args.end;
    let color = args.color;
    for (let i = start; i <= end; ++i) {
        state[i].color = color;
    }
    strip.setPixel(i, 0, 0, level * 10);
});

let gen = true;

Timer.set(1000, true, function() {
    strip.clear();
    gen = !gen;
    if (gen) {
        for (let i = 0; i < 16; i++) {
            let s = state[i];
            if (!s.on) {
                continue;
            }
            strip.setPixel(i, s.color.g, s.color.r, s.color.b);
            // print(i);
            // print(level * 10);
        }
    }
    print(state[i].color.on);
    print(state[i].color.g);
    strip.show();
}, null);
