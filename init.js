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
    state[i] = { "on": true, "color": { "r": 39, "g": 108, "b": 146 } };
}

Timer.set(3000, false, function() {
    for (let i = 0; i < 16; ++i) {
        state[i].on = false;
    }
}, null);


RPC.addHandler('Control', function(args) {
    let start = args.start;
    let end = args.end;
    if (args.off) {
        for (let i = start; i <= end; ++i) {
            state[i].on = false;
            strip.setPixel(i, 0, 0, 0);
        }
    } else {
        let color = args.color;
        for (let i = start; i <= end; ++i) {
            state[i].color = color;
            state[i].on = true;
            let s = state[i];
            strip.setPixel(i, s.color.g, s.color.r, s.color.b);
        }
    }
    strip.show();
    print(state);
});

let gen = true;

Timer.set(500, true, function() {
    strip.clear();
    gen = !gen;
    if (gen) {
        for (let i = 0; i < 16; i++) {
            let s = state[i];
            if (!s.on) {
                continue;
            }
            strip.setPixel(i, s.color.g, s.color.r, s.color.b);
        }
    }
    strip.show();
}, null);
