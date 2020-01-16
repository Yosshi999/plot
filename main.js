const canvasZ1 = document.getElementById("canvasZ1");
const ctxZ1 = canvasZ1.getContext('2d');

const canvasZ2 = document.getElementById("canvasZ2");
const ctxZ2 = canvasZ2.getContext('2d');

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

let Z1x=150, Z1y=150, Z2x=150, Z2y=150;
const HEIGHT = 300;
const WIDTH = 300;

function to_comp(coordX, coordY){
    return math.complex((coordX-WIDTH/2)/30, (coordY-HEIGHT/2)/30);
}
function to_coord(comp) {
    return [comp.re*30+WIDTH/2, comp.im*30+HEIGHT/2];
}

canvasZ1.addEventListener("click", (e) => {
    Z1x = e.offsetX;
    Z1y = e.offsetY;
});
canvasZ2.addEventListener("click", (e) => {
    Z2x = e.offsetX;
    Z2y = e.offsetY;
});


function draw() {
    Z1 = to_comp(Z1x, Z1y);
    Z2 = to_comp(Z2x, Z2y);

    ctxZ1.clearRect(0, 0, canvasZ1.width, canvasZ1.height);
    ctxZ1.textAlign = "left";
    ctxZ1.textBaseline = "top";
    //ctxZ1.fillText("Z1=" + Z1.re + "+" + Z1.im + "j", 0, 0, 200);
    ctxZ1.fillText("Z1=" + Z1, 0, 0, 200);

    ctxZ1.beginPath();
    ctxZ1.arc(Z1x, Z1y, 3, 0, Math.PI*2);
    ctxZ1.stroke();
    ctxZ1.beginPath();
    ctxZ1.moveTo(WIDTH/2,HEIGHT/2);
    ctxZ1.lineTo(Z1x, Z1y);
    ctxZ1.stroke();
    
    ctxZ2.clearRect(0, 0, canvasZ2.width, canvasZ2.height);
    ctxZ2.textAlign = "left";
    ctxZ2.textBaseline = "top";
    ctxZ2.fillText("Z2=" + Z2.re + "+" + Z2.im + "j", 0, 0, 200);

    ctxZ2.beginPath();
    ctxZ2.arc(Z2x, Z2y, 3, 0, Math.PI*2);
    ctxZ2.stroke();
    ctxZ2.beginPath();
    ctxZ2.moveTo(WIDTH/2,HEIGHT/2);
    ctxZ2.lineTo(Z2x, Z2y);
    ctxZ2.stroke();

    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(Z1x, Z1y, 1, 0, Math.PI*2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(WIDTH/2,HEIGHT/2);
    ctx.lineTo(Z1x, Z1y);
    ctx.stroke();
    ctx.fillText("Z1", Z1x, Z1y);

    ctx.beginPath();
    ctx.arc(Z2x, Z2y, 1, 0, Math.PI*2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(WIDTH/2,HEIGHT/2);
    ctx.lineTo(Z2x, Z2y);
    ctx.stroke();
    ctx.fillText("Z2", Z2x, Z2y);

    fs = [math.add(Z1, Z2)];
    for (let i=0; i<1000; i+=1) {
        f = fs[fs.length - 1];
        fn = math.add(Z1 , math.divide(math.multiply(f, Z2), math.add(f, Z2)));
        fs.push(fn);
    }
    ctx.beginPath();
    const [x, y] = to_coord(fs[0]);
    ctx.moveTo(x, y);
    for (let i=1; i<fs.length; i+=1) {
        const [x, y] = to_coord(fs[i]);
        ctx.lineTo(x, y);
    }
    ctx.stroke();
    for (let i=0; i<fs.length; i+=1) {
        ctx.beginPath();
        const [x, y] = to_coord(fs[i]);
        ctx.arc(x, y, 3, 0, Math.PI*2);
        if (i==0) ctx.stroke();
        else ctx.fill();
    }
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("f(1000)=" + fs[fs.length-1], 0, 0, 200);
    window.requestAnimationFrame(draw);
}
draw();

