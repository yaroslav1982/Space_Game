const SPIN = new function () {
    let SPIN = this,
        cnv, ctx, width, height;

    let $ = (id) => {return document.getElementById(id)};

    class Nade {
        constructor (x, y) {
            
        }
    }


    SPIN.start = (W, H) => {
        cnv = $('cnv')
        ctx = cnv.getContext('2d');
        width = W;
        height = H;
        cnv.width = width;
        cnv.height = height;
    };
};

window.addEventListener('load', function () {
    SPIN.start(640, 480);
});