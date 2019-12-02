const SPIN = new function () {
    let SPIN = this,
        cnv, ctx, width, height, nodes = [], node_count = 0, for_destory = {};

    let $ = (id) => {return document.getElementById(id)};

    let rect = (x, y, w, h, clr) => {
        ctx.fillStyle = clr;
        ctx.fillRect(x, y, w, h);
    };

    class Node {
        constructor (x, y, w, h, clr, upd) {
            this.id = node_count++;
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.clr = clr;
            this.update = upd;
            nodes.push(this);
        }

        _update () {
            if (this.update)
                this.update(this);
        }

        draw () {
            rect(this.x, this.y, this.w, this.h, '#ff6d5a');
        }

        destory () {
            for_destory[this.id] = this;
        }

        move (x, y) {
            this.x += x;
            this.y += y;
        }
    }

    SPIN.create_node = (x, y, w, h, clr, upd) => {
        return new Node(x, y, w, h, clr, upd);
    };

    SPIN.update = () => {
        ctx.clearRect(0, 0, width, height);
        for (let i = 0, len = nodes.length; i < len; i++) {
            nodes[i]._update();
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

    let enemy_ai = (node) => {
        node.y += 0.1;
    }

    for (let j = 0; j < 3; j++) {
        for (let i = 1; i <= 10; i++) {
            SPIN.create_node(-30 + (20 + 40) * i, 20 + (20 + 40) * j, 40, 40, '#ff6d5a', enemy_ai);
        }
    }

    SPIN.create_node();
});