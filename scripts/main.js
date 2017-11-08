var flyUp = document.getElementById('flyUp'),
    flyDown = document.getElementById('flyDown');

var maxFPS = 60,
    fpsw = 0,
    lastFrameTimeMs = 0,
    delta = 0,
    timestep = 1000/60,
    framesThisSecond = 0,
    lastFpsUpdate = 0,
    lastHindernis = 0,
    lastHindernisTime = 0;

var h0 = 0,
    h1 = 0,
    h2 = 0;

var whichMap = 0,
    whichPlane = 0;

var w = screen.width,
    h = screen.height,
    borderLeft = 0,
    borderTop = 0;

if (w/16*9 < h) {
    
    borderTop = (h-w/16*9)/2;
    h = w/16*9;
    
} else {
    
    borderLeft = (w-h/9*16)/2;
    w = h/9*16;
    
}

$('#game').css({width: w+'px', height: h+'px', left: borderLeft+'px', top: borderTop+'px'});
$('#flyUp').css({width: w+'px', height: h/2+'px', top: '0px'});
$('#flyDown').css({width: w+'px', height: h/2+'px', top: h/2+'px'});

var fw = w/32*6,
    fh = h/9,
    fleft = w*0.09375,
    yFlugzeug = h - 0.12*h,
    realFlugzeugCoords = h/2-fh/2;

$('.flugzeug').css({width: fw+'px', height: fh+'px', top: realFlugzeugCoords+'px'});

var map = [
    
    ['#geometrie_']
    
]

var hindernis = [
    
    //[gruppe [nummer [w, h, top]]]
    
    //geometrie = 0
    [
        [w/2560*404, h/1440*312, h/1440*238], [w/2560*430, h/1440*292, h/1440*974], [w/2560*324, h/1440*804, h/1440*318], [w/2560*512, h/1440*773, h/1440*78], [w/2560*289, h/1440*1042, h/1440*78], [w/2560*324, h/1440*964, h/1440*398], [w/2560*544, h/1440*1440, h/1440*0]
    ]
    
]

for (var j = 0; j < hindernis.length; j++) {
    
    for (var i = 0; i < hindernis[j].length; i++) {

        $(map[j]+i).css({width: hindernis[j][i][0]+'px', height: hindernis[j][i][1]+'px', top: hindernis[j][i][2]+'px'});

    }
    
}

var imageScale = h/1440;

/*var collisionPlanes = [
    
    //[nummer [punkt [left, top]]]
    
    [
        [*imageScale+fleft, *imageScale],
    ]
    
]*/

var collisionPoints = [
    
    //[gruppe [nummer [punkt [left, top]]]]
    
    [
        [
            [2*imageScale, 292*imageScale+hindernis[0][0][2]],[2*imageScale, 105*imageScale+hindernis[0][0][2]],[241*imageScale, 2*imageScale+hindernis[0][0][2]],[401*imageScale, 55*imageScale+hindernis[0][0][2]],[401*imageScale, 267*imageScale+hindernis[0][0][2]],[150*imageScale, 309*imageScale+hindernis[0][0][2]],[2*imageScale, 292*imageScale+hindernis[0][0][2]]
        ],
        [
            [2*imageScale, 60*imageScale+hindernis[0][1][2]],[219*imageScale, 1*imageScale+hindernis[0][1][2]],[426*imageScale, 35*imageScale+hindernis[0][1][2]],[223*imageScale, 289*imageScale+hindernis[0][1][2]],[2*imageScale, 60*imageScale+hindernis[0][1][2]]
        ],
        [
            [321*imageScale, 761*imageScale+hindernis[0][2][2]],[162*imageScale, 801*imageScale+hindernis[0][2][2]],[2*imageScale, 734*imageScale+hindernis[0][2][2]],[2*imageScale, 68*imageScale+hindernis[0][2][2]],[161*imageScale, 2*imageScale+hindernis[0][2][2]],[321*imageScale, 42*imageScale+hindernis[0][2][2]]
        ],
        [
            [241*imageScale, 770*imageScale+hindernis[0][3][2]],[3*imageScale, 162*imageScale+hindernis[0][3][2]],[281*imageScale, 2*imageScale+hindernis[0][3][2]],[508*imageScale, 103*imageScale+hindernis[0][3][2]]
        ],
        [
            [286*imageScale, 986*imageScale+hindernis[0][4][2]],[47*imageScale, 1039*imageScale+hindernis[0][4][2]],[2*imageScale, 816 *imageScale+hindernis[0][4][2]],[2*imageScale, 355*imageScale+hindernis[0][4][2]],[47*imageScale, 1*imageScale+hindernis[0][4][2]],[286*imageScale, 84*imageScale+hindernis[0][4][2]]
        ],
        [
            [198*imageScale, 959*imageScale+hindernis[0][5][2]],[161*imageScale, 961*imageScale+hindernis[0][5][2]],[112*imageScale, 957*imageScale+hindernis[0][5][2]],[83*imageScale, 950*imageScale+hindernis[0][5][2]],[56*imageScale, 940*imageScale+hindernis[0][5][2]],[28*imageScale, 924*imageScale+hindernis[0][5][2]],[10*imageScale, 904*imageScale+hindernis[0][5][2]],[2*imageScale, 887*imageScale+hindernis[0][5][2]],[2*imageScale, 40*imageScale+hindernis[0][5][2]],[8*imageScale, 32*imageScale+hindernis[0][5][2]],[20*imageScale, 24*imageScale+hindernis[0][5][2]],[39*imageScale, 17*imageScale+hindernis[0][5][2]],[64*imageScale, 11*imageScale+hindernis[0][5][2]],[96*imageScale, 6*imageScale+hindernis[0][5][2]],[129*imageScale, 3*imageScale+hindernis[0][5][2]],[158*imageScale, 2*imageScale+hindernis[0][5][2]],[196*imageScale, 3*imageScale+hindernis[0][5][2]],[234*imageScale, 7*imageScale+hindernis[0][5][2]],[271*imageScale, 14*imageScale+hindernis[0][5][2]],[298*imageScale, 22*imageScale+hindernis[0][5][2]],[313*imageScale, 31*imageScale+hindernis[0][5][2]],[321*imageScale, 41*imageScale+hindernis[0][5][2]],
        ],
        [
            [2*imageScale, 1439*imageScale+hindernis[0][6][2]],[2*imageScale, 932*imageScale+hindernis[0][6][2]],[272*imageScale, 894*imageScale+hindernis[0][6][2]],[541*imageScale, 932*imageScale+hindernis[0][6][2]],[541*imageScale, 1439*imageScale+hindernis[0][6][2]],[941*imageScale, 1439*imageScale+hindernis[0][6][2]],[941*imageScale, 0*imageScale+hindernis[0][6][2]],[541*imageScale, 0*imageScale+hindernis[0][6][2]],[541*imageScale, 507*imageScale+hindernis[0][6][2]],[271*imageScale, 545*imageScale+hindernis[0][6][2]],[2*imageScale, 507*imageScale+hindernis[0][6][2]],[2*imageScale, 0*imageScale+hindernis[0][6][2]]
        ]
    ]
    
]

/*-------------------------------------------------------------------------------*/

function gameLoop(timestamp) {
    
    if (timestamp < lastFrameTimeMs + (1000 / maxFPS)) {
        
        requestAnimationFrame(gameLoop);
        return;
        
    }
    
    /*delta += timestamp - lastFrameTimeMs;
    lastFrameTimeMs = timestamp;*/
    
    if (timestamp > lastFpsUpdate + 1000) {
        
        fpsw = framesThisSecond //0.25 * framesThisSecond + 0.75 * fpsw;
        lastFpsUpdate = timestamp;
        framesThisSecond = 0;
        
    }
    framesThisSecond++;
    
    if (timestamp > lastHindernisTime + 2000) {
        
        var g = hindernis[whichMap].length-1;                                           //move out
        h0 = getRandomInt(0, g);
        while (h0 == h1 || h0 == h2) {
            
            h0 = getRandomInt(0, g);
            
        }
        hindernisFunctions.move(h0);
        hindernisFunctions.reset(h2);
        h1 = h0;
        h2 = h1;
        lastHindernisTime = timestamp;
         
    }
    
    /*var numUpdatesSteps = 0;
    while (delta >= timestep) {
        
        delta -= timestep;
        if (++numUpdatesSteps >= 240) {
            
            panic();
            break;
            
        }
        
    }*/
    
    
    
    requestAnimationFrame(gameLoop);
    
}

/*-------------------------------------------------------------------------------*/

function panic() {
    
    delta = 0;
    
}

var hindernisFunctions = {
    
    move: function(typ) {
        
        $(map[whichMap]+typ).css({'-webkit-transition-duration': '3s'});
        $(map[whichMap]+typ).css({'transition-duration': '3s'});
        $(map[whichMap]+typ).css('-webkit-transform', 'translate3d('+(-2*w)+'px, 0px, 0px)');
        $(map[whichMap]+typ).css('transform', 'translate3d('+(-2*w)+'px, 0px, 0px)');
        
    },
    
    reset: function(typ) {
        
        $(map[whichMap]+typ).css({'-webkit-transition-duration': 'initial'});
        $(map[whichMap]+typ).css({'transition-duration': 'initial'});
        $(map[whichMap]+typ).css('-webkit-transform', 'none');
        $(map[whichMap]+typ).css('transform', 'none');
        
    }
    
}

var flying = {
    
    touchStartUp: function(e) {
            
        e.preventDefault();

        var flugzeugCoords = $('#flugzeug'+whichPlane).position().top;

        if (flugzeugCoords > h*0.02) {

            var dist = -10 * yFlugzeug;

            flugzeugDist = flugzeugCoords - realFlugzeugCoords + dist;

            $('#flugzeug'+whichPlane).css('-webkit-transform', 'translate3d(0px, '+flugzeugDist+'px, 0px)');
            $('#flugzeug'+whichPlane).css('transform', 'translate3d(0px, '+flugzeugDist+'px, 0px)');

        }
        
    },
    
    touchStartDown: function(e) {
            
        e.preventDefault();

        var flugzeugCoords = $('#flugzeug'+whichPlane).position().top;

        if (flugzeugCoords < h*0.98) {

            var dist = 10 * yFlugzeug;

            flugzeugDist = flugzeugCoords - realFlugzeugCoords + dist;

            $('#flugzeug'+whichPlane).css('-webkit-transform', 'translate3d(0px, '+flugzeugDist+'px, 0px)');
            $('#flugzeug'+whichPlane).css('transform', 'translate3d(0px, '+flugzeugDist+'px, 0px)');

        }
        
    },
    
    touchEnd: function(e) {
        
        e.preventDefault();
        
        var flugzeugCoords = $('#flugzeug'+whichPlane).position().top;
        
        flugzeugDist = flugzeugCoords - realFlugzeugCoords;
        
        $('#flugzeug'+whichPlane).css('-webkit-transform', 'translate3d(0px, '+flugzeugDist+'px, 0px)');
        $('#flugzeug'+whichPlane).css('transform', 'translate3d(0px, '+flugzeugDist+'px, 0px)');
        
    }
    
}

/*-------------------------------------------------------------------------------*/

flyUp.addEventListener('touchstart', flying.touchStartUp);
flyUp.addEventListener('touchend', flying.touchEnd);
flyDown.addEventListener('touchstart', flying.touchStartDown);
flyDown.addEventListener('touchend', flying.touchEnd);

requestAnimationFrame(gameLoop);

/*

var doit = 1;

function ses() {
    var g = hindernis[whichMap].length-1;
    var sj = 0;
    h0 = getRandomInt(0, g);
    while (h0 == h1 || h0 == h2) {
        
        h0 = getRandomInt(0, g);
        sj++
        
        
    }
    h1 = h0;
    h2 = h1;
    alert(sj);
    if (doit == 1) {ses();}
}

alert('dfees');

ses();

[*imageScale, *imageScale+hindernis[0][][2]],

var sd = [[0,1,2,3,4,5],[0,1,2,3,4,5,6,7]],
    v = sd[0].length-1;

alert(v);

var df = getRandomInt(0, v);

alert(df);

var x = sd[0][df];

alert(x);
*/