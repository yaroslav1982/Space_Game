const SPIN = new function () {
    let SPIN = this,
        cnv, ctx, width, height;

    let $ = (id) => (document.getElementById(id));




    SpIN.start = (W, H) => {
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