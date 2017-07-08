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
    state[i] = { "on": true, "blink": false, "color": { "r": 39, "g": 108, "b": 146 } };
}

Timer.set(3000, false, function() {
    for (let i = 0; i < 16; ++i) {
        state[i].on = false;
    }
}, null);


RPC.addHandler('Control', function(args) {
    let start = args.start;
    let end = args.end;
    if (start < 0 || end < start || end > 15) {
        return true;
    }
    if (args.off) {
        for (let i = start; i <= end; ++i) {
            state[i].on = false;
            state[i].blink = false;
            strip.setPixel(i, 0, 0, 0);
        }
    } else {
        let color = args.color;
        let blink = !!args.blink;
        for (let i = start; i <= end; ++i) {
            state[i].color = color;
            state[i].on = true;
            state[i].blink = blink;
            let s = state[i];
            strip.setPixel(i, s.color.g, s.color.r, s.color.b);
        }
    }
    strip.show();
    print(state);
    return true;
});

let gen = true;

Timer.set(500, true, function() {
    strip.clear();
    gen = !gen;
    for (let i = 0; i < 16; i++) {
        let s = state[i];
        if (!s.on || (s.blink && gen)) {
            continue;
        }
        strip.setPixel(i, s.color.g, s.color.r, s.color.b);
    }
    strip.show();
}, null);
