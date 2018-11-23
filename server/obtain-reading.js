const Gpio = process.env.NODE_ENV !== "develop" ? require('pigpio-mock').Gpio : require('pigpio').Gpio;

console.log("Env....", process.env.NODE_ENV)

const detect = new Gpio(4, {
    mode: Gpio.INPUT,
    alert: true
});

const watchDetect = () => {
    let startTick;

    detect.on('alert', (level, tick) => {
        if (level == 1) {
            startTick = tick;
        } else {
            const endTick = tick;
            const diff = (endTick >> 0) - (startTick >> 0); // Unsigned 32 bit arithmetic
            console.log(diff);
        }
    });
};

watchDetect();