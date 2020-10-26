let canvas = document.getElementById('canvas')
canvas.onmousedown=mouseDown;
canvas.onmousemove=mouseMove;
canvas.onmouseup=mouseUp;
canvas.onmouseout=mouseUp;

window.onresize = init

let slider = document.getElementById('slider')

let ctx = canvas.getContext('2d')

var CLICK_DIST = 0
var SCALE = 0
var user_scale_change = 1
var line_width = 0
let DEFAULT_LINE = 20

let red = {}
let green = {}

var startX = 0
var startY = 0

function init(){
    resizeCanvas()

    red.x = ctx.canvas.width/2
    red.y = ctx.canvas.height/2
    red.isDragging = false

    green.x = ctx.canvas.width/2
    green.y = ctx.canvas.height/2
    green.isDragging = false

    slider.value = 50
    updateSize(50)
}

function setRadii(){
    red.r = SCALE*user_scale_change
    green.r = red.r + DEFAULT_LINE*user_scale_change

    line_width = DEFAULT_LINE*user_scale_change
}

function resizeCanvas(){
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    CLICK_DIST = 0.01*(ctx.canvas.width + ctx.canvas.height)/2
    SCALE = CLICK_DIST*5*user_scale_change
}

function drawCircles() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    ctx.beginPath()
    ctx.arc(green.x, green.y, green.r, 0, 2*Math.PI)
    ctx.strokeStyle = "green"
    ctx.lineWidth = line_width
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(red.x, red.y, red.r, 0, 2*Math.PI)
    ctx.strokeStyle = "red"
    ctx.lineWidth = line_width
    ctx.stroke()

}

function mouseDown(e){
    e.preventDefault()
    e.stopPropagation()

    red.isDragging = false
    green.isDragging = false

    startX = parseInt(e.clientX)
    startY = parseInt(e.clientY)

    red_dist_sq = (red.x - startX)**2 + (red.y - startY)**2
    green_dist_sq = (green.x - startX)**2 + (green.y -startY)**2

    if (red_dist_sq < (red.r + line_width)**2){
        red.isDragging = true
        return
    }

    if (green_dist_sq < (green.r + line_width)**2){
        green.isDragging = true
        return
    }
}

function mouseMove(e){
    e.preventDefault()
    e.stopPropagation()

    mouseX = parseInt(e.clientX);
    mouseY = parseInt(e.clientY);

    let dx = mouseX-startX;
    let dy = mouseY-startY;
    startX = mouseX
    startY = mouseY

    if (red.isDragging){
        red.x += dx
        red.y += dy
    }
    if (green.isDragging){
        green.x += dx
        green.y += dy
    }
    drawCircles()
}

function mouseUp(e){
    e.preventDefault()
    e.stopPropagation()
    red.isDragging = false
    green.isDragging = false
}

function updateSize(size){
    user_scale_change = 1 + 2*(size-50)/100
    setRadii()
    drawCircles()
}

init()
