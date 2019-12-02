const SPIN = new function () {
    let SPIN = this,
        cnv, ctx, width, height, nodes = [], node_count = 0, for_destory = {},
        down_keys = {};

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

    SPIN.key = (key) => {
        return down_keys[key];
    };

    SPIN.clear_timer = () => {
        timer = 0;
    };

    SPIN.get_timer = () => {
        return timer;
    }

    SPIN.start = (W, H) => {
        cnv = $('cnv')
        ctx = cnv.getContext('2d');
        width = W;
        height = H;
        cnv.width = width;
        cnv.height = height;
        SPIN.update();
        window.addEventListener('keydown', (e) => {
            down_keys[e.code] = true;
        });
        window.addEventListener('keyup', (e) => {
            delete down_keys[e.code]
        });
    };
};

window.addEventListener('load', function () {
    SPIN.start(640, 480);

    let enemy_ai = (node) => {
        node.y += 0.1;
    }

    let bullet_ai = (node) => {
        node.y -= 2;
    }

    for (let j = 0; j < 3; j++) {
        for (let i = 1; i <= 10; i++) {
            SPIN.create_node(-30 + (20 + 40) * i, 20 + (20 + 40) * j, 40, 40, '#ff6d5a', enemy_ai);
        }
    }

    let fire = (x, y) => {
        if (SPIN.get_timer() > 500) {
            SPIN.create_node(x, y, 10, 20, '#14ff00', bullet_ai);
            SPIN.clear_timer();
        }
    };

    SPIN.create_node(640 / 2 - 25, 480 - 50 - 30, 50, 50, '#64c858', (node) => {
        if (SPIN.key('KeyA'))
            node.x -= 1;
        if (SPIN.key('KeyD'))
            node.x += 1;
        if (SPIN.key('Space'))
            fire(node.x + 25 - 5, node.y);
    });
});