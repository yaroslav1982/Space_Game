const SPIN = new function () {
    let SPIN = this,
        cnv, ctx, width, height, nodes = [], for_destory = {};

    let $ = (id) => {return document.getElementById(id)};

    class Nade {
        constructor (x, y) {
            nodes.push(this);
        }

        update () {

        }

        draw () {

        }

        destory () {

        }

        move (x, y) {

        }
    }

    SPIN.create_node = (x, y, w, h) => {
        return new Node(x, y, w, h);
    };


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