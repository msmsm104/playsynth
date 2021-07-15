
let sketch = function(p) {
    
    p.setup = function() {
        var Doc = document.querySelector('.box1');
        let cnvWidth = Doc.offsetWidth/2;

        let cnvHeight = Doc.offsetHeight/2;

        cnv2 = p.createCanvas(cnvWidth,cnvHeight);
        
        analyzer2 = new p5.FFT();
        p.noStroke();
    };

    p.draw = function() {
        p.background(45);
        var Doc = document.querySelector('.box1');
        let postHeight = Doc.offsetHeight/2;

        cnv2.position(0,postHeight);

        let spectrum = analyzer2.analyze();
        for (let i = 0; i < spectrum.length / 20; i++) {
            p.fill(spectrum[i], spectrum[i] / 10, 0);
            let x = p.map(i, 0, spectrum.length / 20, 0, width);
            let h = p.map(spectrum[i], 0, 255, 0, height);
            p.rect(x, height, spectrum.length / 20, -h);
        }
    };

    p.windowResized = function() {
        var Doc = document.querySelector('.box1');
        let cnvWidth = Doc.offsetWidth/2;

        let cnvHeight = Doc.offsetHeight/2;

        p.resizeCanvas(cnvWidth, cnvHeight);
    };
};

let myp5 = new p5(sketch);


let sketch2 = function(p) {
    p.setup = function() {
        let cnvWidth = document.querySelector('.box1').offsetWidth/2;

        let cnvHeight = document.querySelector('.box1').offsetHeight/2;

        cnv3 = p.createCanvas(cnvWidth,cnvHeight);
        
    };

    p.draw = function() {
        p.background(0);
        let postWidth = document.querySelector('.box1').offsetWidth/2;

        cnv3.position(postWidth,0);
        
        //attack.position(postWidth+30,30);
        //decay.position(postWidth+postWidth/2+30,30);
        //sus.position(postWidth+30,90);
        //release.position(postWidth+postWidth/2+30,90);
    };

    p.windowResized = function() {
        let cnvWidth = document.querySelector('.box1').offsetWidth/2;

        let cnvHeight = document.querySelector('.box1').offsetHeight/2;

        p.resizeCanvas(cnvWidth, cnvHeight);
    };
    
};

let myp51 = new p5(sketch2);



let sketch3 = function(p) {
    
    p.setup = function() {
        var Doc = document.querySelector('.box1');
        let cnvWidth = Doc.offsetWidth/2;

        let cnvHeight = Doc.offsetHeight/2;

        cnv4 = p.createCanvas(cnvWidth,cnvHeight);

        //filter
        filter = new p5.BandPass();
    };

    p.draw = function() {
        p.background(70);
        var Doc = document.querySelector('.box1');
        let postHeight = Doc.offsetHeight/2;
        let postWidth = Doc.offsetWidth/2;

        cnv4.position(postWidth,postHeight);


        let freq = p.map(mouseX, 400, 800, 20, 10000);
        freq = p.constrain(freq,0,22050);
        filter.freq(freq);
        filter.res(50);


        let spectrum = analyzer.analyze();
        p.noStroke();
        for (let i = 0; i < spectrum.length; i++) {
        let x = p.map(i, 0, spectrum.length, 0, width);
        let h = -height + p.map(spectrum[i], 0, 255, height, 0);
        p.rect(x, height, width/spectrum.length, h);
        }
        };

    p.windowResized = function() {
        var Doc = document.querySelector('.box1');
        let cnvWidth = Doc.offsetWidth/2;

        let cnvHeight = Doc.offsetHeight/2;

        p.resizeCanvas(cnvWidth, cnvHeight);
    };
};

let myp52 = new p5(sketch3);



function setup() {
    osc = new p5.Oscillator();
    env = new p5.Envelope();
    analyzer = new p5.FFT();
    osc.connect(filter);


    let cnvWidth = document.querySelector('.box1').offsetWidth/2;
    let cnvHeight = document.querySelector('.box1').offsetHeight/2;
    cnv = createCanvas(cnvWidth, cnvHeight);
    cnv.position(0,0, 'fixed');
    noFill();

    attack = createSlider(0,5,2,0);
    decay = createSlider(0,5,2,0);
    sus = createSlider(0,1,0.5,0);
    release = createSlider(0,4,0,0);
}



function draw() {
    background(30);

    waveform = analyzer.waveform();

    stroke(255);
    strokeWeight(5);
    beginShape();
    for (let i = 0; i < waveform.length; i++) {
        let x = map(i, 0, waveform.length, 0, width);
        let y = map(waveform[i], -1, 1, height, 0);
        vertex(x, y);
    }
    endShape();

    let relPositionWidth = document.querySelector('.box1').offsetWidth/2;

    let relPositionHeight = document.querySelector('.box1').offsetHeight/2

    attack.position(relPositionWidth+30, relPositionHeight
/4);
    decay.position(relPositionWidth+relPositionWidth/2+30, relPositionHeight
/4);
    sus.position(relPositionWidth+30, relPositionHeight
*2/3);
    release.position(relPositionWidth+relPositionWidth/2+30, relPositionHeight
*2/3);
}

function windowResized() {
    let cnvWidth = document.querySelector('.box1').offsetWidth/2;

    let cnvHeight = document.querySelector('.box1').offsetHeight/2;
    resizeCanvas(cnvWidth, cnvHeight);
}

let R = Math.pow(2, 1/12);

var frequency = {
    setFrequency : function(numb) {
        return Math.pow(R, numb)*440;
    }
};

let arr = ['a','w','s','e','d', 'f','t','g','y','h','u','j'];

var j = 3;

function keyPressed() {

    if(key === 'z') {
        j = j - 12;
    } else if (key === 'x') {
        j = j + 12;
    } else if(key != 'q') {

    var i = 0;
    
    while(i < arr.length) {
        if(key === arr[i]) {
            osc.start(0, frequency.setFrequency(i+j));
        };
        i = i + 1;
    };
    }
    control.ctlType();
    control.ctlEnvelope();
    
}

function keyReleased() {
    osc.stop();
}

var control = {
    ctlType : function() {
        let waveForm = document.querySelector('.waveForm').value;
        osc.setType(waveForm);
    },
    ctlEnvelope : function () {
        osc.amp(env);
        env.setADSR(attack.value(), decay.value(), sus.value(), release.value());
        env.play();
    }
}

