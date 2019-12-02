const SPIN = new function () {
    let SPIN = this,
        cnv, ctx, width, height, nodes = [], for_destory = {};

    let $ = (id) => {return document.getElementById(id)};

    let rect = (x, y, w, h, clr) => {
        ctx.fillStyle clr;
        ctx.fillRect();
    };

    class Node {
        constructor (x, y, w, h) {
            this.id = node_cont++;
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;

            nodes.push(this);
        }

        update () {

        }

        draw () {
            rect(this.x, this.y, this.w, this.h, '#fff');
        }

        destory () {
            for_destory[this.id] = this;
        }

        move (x, y) {

        }
    }

    SPIN.create_node = (x, y, w, h) => {
        return new Node(x, y, w, h);
    };

    SPIN.update = () => {
        for (let i = 0, len = nodes.length; i < len; i++) {
            nodes[i].update();
            nodes[i].draw();
        }
    }


    SPIN.start = (W, H) => {
        cnv = $('cnv')
        ctx = cnv.getContext('2d');
        width = W;
        height = H;
        cnv.width = width;
        cnv.height = height;
        SPIN.update();
    };
};

window.addEventListener('load', function () {
    SPIN.start(640, 480);
});