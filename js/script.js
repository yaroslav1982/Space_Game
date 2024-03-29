const SPIN = new function () {
    let SPIN = this,
        cnv, ctx, width, height, nodes = [], node_count = 0, for_destroy = {},
        down_keys = {}, timer = 0, user_draw;

    let $ = (id) => {return document.getElementById(id)};

    let rect = (x, y, w, h, clr) => {
        ctx.fillStyle = clr;
        ctx.fillRect(x, y, w, h);
    };

    let text = (x, y, clr, text) => {
        ctx.fillStyle = clr;
        ctx.fillText(text, x, y);
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
            rect(this.x, this.y, this.w, this.h, this.clr);
        }

        destroy () {
            for_destroy[this.id] = this;
        }

        move (x, y) {
            this.x += x;
            this.y += y;
        }

        intersect (node) {
            return !(this.x + this.w < node.x || this.y + this.h < node.y || this.x > node.x + node.w || this.y > node.y + node.h);
        }
    }

    SPIN.create_node = (x, y, w, h, clr, upd) => {
        return new Node(x, y, w, h, clr, upd);
    };

    SPIN.draw_text = (x, y, clr, _text) => {
        text(x, y, clr, _text);
    };

    SPIN.update = () => {
        ctx.clearRect(0, 0, width, height);
        for (let i = nodes.length - 1; i >= 0; i--) {
            if (for_destroy[nodes[i].id]) {
                nodes.splice(i, 1);
                continue;
            }
            nodes[i]._update();
            nodes[i].draw();
        }
        if (user_draw)
            user_draw(SPIN);
        requestAnimationFrame(SPIN.update);
        timer++;
    };

    SPIN.key = (key) => {
        return down_keys[key];
    };

    SPIN.clear_timer = () => {
        timer = 0;
    };

    SPIN.get_timer = () => {
        return timer;
    };

    SPIN.set_draw = (f) => {
        user_draw = f;
    };

    SPIN.start = (W, H) => {
        cnv = $('cnv');
        ctx = cnv.getContext('2d');
        width = W;
        height = H;
        cnv.width = width;
        cnv.height = height;
        ctx.textBaseline = 'top';
        ctx.font = '20px Arial, sans-serif';

        window.addEventListener('keydown', (e) => {
            down_keys[e.code] = true;
        });
        window.addEventListener('keyup', (e) => {
            delete down_keys[e.code];
        });
        SPIN.update();
    };
};

window.addEventListener('load', function () {
    SPIN.start(640, 480);

    let enemies = [], score = 0;

    let enemy_ai = (node) => {    
        node.y += 0.3;
    };

    let bullet_ai = (node) => {
        node.y -= 5;
        if (node.y + node.h < 0)
            node.destroy();
        for (let i = enemies.length - 1; i >= 0; i--) {
            if (node.intersect(enemies[i])) {
                enemies[i].destroy();
                node.destroy();
                enemies.splice(i, 1);
                score += 1;
                break;
            }
        }
    };

    for (let j = 0; j < 5; j++) {
        for (let i = 0; i < 10; i++) {
            enemies.push(SPIN.create_node(30 + (20 + 40) * i, -100 + (20 + 40) * j, 40, 40, '#004e8d', enemy_ai));
        }
    }
    for (let j = 0; j < 5; j++) {
        for (let i = 0; i < 10; i++) {
            enemies.push(SPIN.create_node(30 + (20 + 40) * i, -400 + (20 + 40) * j, 40, 40, '#417fa7', enemy_ai));
        }
    }
    for (let j = 0; j < 5; j++) {
        for (let i = 0; i < 10; i++) {
            enemies.push(SPIN.create_node(30 + (20 + 40) * i, -700 + (20 + 40) * j, 40, 40, '#00b08a', enemy_ai));
        }
    }
    for (let j = 0; j < 5; j++) {
        for (let i = 0; i < 10; i++) {
            enemies.push(SPIN.create_node(30 + (20 + 40) * i, -1000 + (20 + 40) * j, 40, 40, '#06b000', enemy_ai));
        }
    }
    for (let j = 0; j < 5; j++) {
        for (let i = 0; i < 10; i++) {
            enemies.push(SPIN.create_node(30 + (20 + 40) * i, -1300 + (20 + 40) * j, 40, 40, '#2c8b00', enemy_ai));
        }
    }
    for (let j = 0; j < 5; j++) {
        for (let i = 0; i < 10; i++) {
            enemies.push(SPIN.create_node(30 + (20 + 40) * i, -1600 + (20 + 40) * j, 40, 40, '#06b000', enemy_ai));
        }
    }
    for (let j = 0; j < 5; j++) {
        for (let i = 0; i < 10; i++) {
            enemies.push(SPIN.create_node(30 + (20 + 40) * i, -1900 + (20 + 40) * j, 40, 40, '#4c00b0', enemy_ai));
        }
    }
    for (let j = 0; j < 5; j++) {
        for (let i = 0; i < 10; i++) {
            enemies.push(SPIN.create_node(30 + (20 + 40) * i, -2200 + (20 + 40) * j, 40, 40, '#b00093', enemy_ai));
        }
    }
    for (let j = 0; j < 5; j++) {
        for (let i = 0; i < 10; i++) {
            enemies.push(SPIN.create_node(30 + (20 + 40) * i, -2500 + (20 + 40) * j, 40, 40, '#48acff', enemy_ai));
        }
    }
    for (let j = 0; j < 5; j++) {
        for (let i = 0; i < 10; i++) {
            enemies.push(SPIN.create_node(30 + (20 + 40) * i, -2800 + (20 + 40) * j, 40, 40, '#ff17cd', enemy_ai));
        }
    }
    for (let j = 0; j < 5; j++) {
        for (let i = 0; i < 10; i++) {
            enemies.push(SPIN.create_node(30 + (20 + 40) * i, -3100 + (20 + 40) * j, 40, 40, '#b00000', enemy_ai));
        }
    }
    for (let j = 0; j < 5; j++) {
        for (let i = 0; i < 10; i++) {
            enemies.push(SPIN.create_node(30 + (20 + 40) * i, -3400 + (20 + 40) * j, 40, 40, '#585858', enemy_ai));
        }
    }
    for (let j = 0; j < 5; j++) {
        for (let i = 0; i < 10; i++) {
            enemies.push(SPIN.create_node(30 + (20 + 40) * i, -3700 + (20 + 40) * j, 40, 40, '#5b00b0', enemy_ai));
        }
    }
    for (let j = 0; j < 6; j++) {
        for (let i = 0; i < 10; i++) {
            enemies.push(SPIN.create_node(30 + (20 + 40) * i, -4000 + (20 + 40) * j, 40, 40, '#700000', enemy_ai));
        }
    }
    for (let j = 0; j < 5; j++) {
        for (let i = 0; i < 10; i++) {
            enemies.push(SPIN.create_node(30 + (20 + 40) * i, -4300 + (20 + 40) * j, 40, 40, '#ffd51c', enemy_ai));
        }
    }
    for (let j = 0; j < 6; j++) {
        for (let i = 0; i < 10; i++) {
            enemies.push(SPIN.create_node(30 + (20 + 40) * i, -4600 + (20 + 40) * j, 40, 40, '#cc0000', enemy_ai));
        }
    }
    for (let j = 0; j < 5; j++) {
        for (let i = 0; i < 10; i++) {
            enemies.push(SPIN.create_node(30 + (20 + 40) * i, -4900 + (20 + 40) * j, 40, 40, '#00701c', enemy_ai));
        }
    }
    for (let j = 0; j < 4; j++) {
        for (let i = 0; i < 10; i++) {
            enemies.push(SPIN.create_node(30 + (20 + 40) * i, -5200 + (20 + 40) * j, 40, 40, '#6100b0', enemy_ai));
        }
    }
    for (let j = 0; j < 7; j++) {
        for (let i = 0; i < 10; i++) {
            enemies.push(SPIN.create_node(30 + (20 + 40) * i, -5500 + (20 + 40) * j, 40, 40, '#fde400', enemy_ai));
        }
    }
    for (let j = 0; j < 19; j++) {
        for (let i = 0; i < 1; i++) {
            enemies.push(SPIN.create_node(30 + (20 + 40) * i, -5800 + (20 + 40) * j, 40, 40, '#fde400', enemy_ai));
        }
    }

    let fire = (x, y) => {
        if (SPIN.get_timer() > 15) {
            SPIN.create_node(x, y, 10, 20, '#14ff00', bullet_ai);
            SPIN.clear_timer();
        }
    };

    SPIN.create_node(640 / 2 - 25, 480 - 50 - 30, 50, 50, '#64c858', (node) => {
        if (SPIN.key('KeyA'))
            node.x -= 1,6;
        if (SPIN.key('KeyD'))
            node.x += 1,6;
        if (SPIN.key('Space'))
            fire(node.x + 25 - 5, node.y);
    });

    SPIN.set_draw((s) => {
        s.draw_text(640 / 2 - 36, 457, '#8cff09', 'Score: '+ score);
    });
});

//что бы пройти надо набрать 999 очков. Удачи!