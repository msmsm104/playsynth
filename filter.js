
let sketch3 = function(p) {
    
    p.setup = function() {
        var Doc = document.querySelector('.box1');
        let cnvWidth = Doc.offsetWidth/2;

        let cnvHeight = Doc.offsetHeight/2;

        cnv2 = p.createCanvas(cnvWidth,cnvHeight);
        
    };

    p.draw = function() {
        p.background(80);
        var Doc = document.querySelector('.box1');
        let postHeight = Doc.offsetHeight/2;

        cnv2.position(0,postHeight);

    };

    p.windowResized = function() {
        var Doc = document.querySelector('.box1');
        let cnvWidth = Doc.offsetWidth/2;

        let cnvHeight = Doc.offsetHeight/2;

        p.resizeCanvas(cnvWidth, cnvHeight);
    };
};

let myp52 = new p5(sketch3);