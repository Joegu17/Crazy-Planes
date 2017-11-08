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
    fh = h/9;

$('.flugzeug').css({width: fw+'px', height: fh+'px'});

var hindernis = [
    
    //[gruppe [number [w, h, top]]]
    
    //geometrie = 0
    [[w/2560*404, h/1440*312, h/1440*238], [w/2560*430, h/1440*292, h/1440*974], [w/2560*324, h/1440*804, h/1440*318], [w/2560*512, h/1440*773, h/1440*78], [w/2560*289, h/1440*1042, h/1440*78], [w/2560*324, h/1440*964, h/1440*398], [w/2560*544, h/1440*1440, h/1440*0]]
    
]

for (var i = 0; i < hindernis[0].length; i++) {
    
    $('#geometrie_'+i).css({width: hindernis[0][i][0]+'px', height: hindernis[0][i][1]+'px', top: hindernis[0][i][2]+'px'});
    
}

var imageScale = h/1440;