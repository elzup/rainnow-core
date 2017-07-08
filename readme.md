


# API Request Usage

```
curl -d '{ "off": false, "start": 7, "end": 9, "blink": false, "color": { "r": 0, "g": 255, "b": 0 }}' http://192.168.2.101/rpc/Control
```

## Fields
```
start : First position [0-16]
end   : Last position [0-16]
color : RGB Color (r,g,b: [0-255])
off   : Is turn off (default: false)
blink : LED blinking (default: false)
```


## Example
Turn off all

```json
{
  "off": true,
  "start": 0,
  "end": 15
}
```


Turn Red 1/2

```json
{
  "off": true,
  "start": 0,
  "end": 15,
  "color": {
    "r": 255,
    "g": 0,
    "b": 0
  }
}
```

Turn Blue 4/1 with blink

```json
{
  "off": true,
  "start": 4,
  "end": 8,
  "blink": true,
  "color": {
    "r": 0,
    "g": 0,
    "b": 255
  }
}
```
