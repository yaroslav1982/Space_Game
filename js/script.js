const SPIN = new function () {
    let SPIN = this,
        cnv, ctx, width, height, nodes = [], node_count = 0, for_destory = {};

    let $ = (id) => {return document.getElementById(id)};

    let rect = (x, y, w, h, clr) => {
        ctx.fillStyle = clr;
        ctx.fillRect(x, y, w, h);
    };

    class Node {
        constructor (x, y, w, h) {
            this.id = node_count++;
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            nodes.push(this);
        }

        update () {

        }

        _update () {
            this.update();
        }

        draw () {
            rect(this.x, this.y, this.w, this.h, '#ffffff');
        }

        destory () {
            for_destory[this.id] = this;
        }

        move (x, y) {
            this.x += x;
            this.y += y;
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
        requestAnimationFrame(SPIN.update);
    };


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
    SPIN.create_node(10, 10, 15, 15);
});