<template>
<div class="container">
    <div class="slidecont">
        <input type="range" min="1" max="100" value="50" class="slider" 
         id="slider" onchange="updateSize(this.value)">
    </div>
    <canvas id="canvas">
        Your browser doesn't support HTML canvas. 
        Please upgrade to a newer browser.
    </canvas>

</div>
</template>


<script>

let canvas = document.getElementById('canvas')
canvas.onmousedown=mouseDown;
canvas.onmousemove=mouseMove;
canvas.onmouseup=mouseUp;
canvas.onmouseout=mouseUp;

canvas.ontouchstart=touchDown;
canvas.ontouchmove=touchMove;
canvas.ontouchend=mouseUp;
canvas.ontouchcancel=mouseUp;

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

    CLICK_DIST = 0.001*(ctx.canvas.width + ctx.canvas.height)/2
    SCALE = CLICK_DIST*50*user_scale_change
}

function drawCircles() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)


    ctx.beginPath()
    ctx.arc(green.x, green.y, green.r, 0, 2*Math.PI)
    ctx.strokeStyle = "green"
    ctx.lineWidth = line_width
    ctx.stroke()

    ctx.globalCompositeOperation = 'lighter'
    ctx.beginPath()
    ctx.arc(red.x, red.y, red.r, 0, 2*Math.PI)
    ctx.strokeStyle = "red"
    ctx.lineWidth = line_width
    ctx.stroke()
}

function clickStart(startX, startY){
    let red_dist_sq = (red.x - startX)**2 + (red.y - startY)**2
    let green_dist_sq = (green.x - startX)**2 + (green.y -startY)**2

    if (red_dist_sq < (red.r + line_width)**2){
        red.isDragging = true
        return
    }

    if (green_dist_sq < (green.r + line_width)**2){
        green.isDragging = true
        return
    }
}

function mouseDown(e){
    e.preventDefault()
    e.stopPropagation()

    red.isDragging = false
    green.isDragging = false

    startX = parseInt(e.clientX)
    startY = parseInt(e.clientY)

    clickStart(startX, startY)
}
function touchDown(e){
    e.preventDefault()
    e.stopPropagation()

    red.isDragging = false
    green.isDragging = false

    startX = parseInt(e.touches[0].clientX)
    startY = parseInt(e.touches[0].clientY)

    clickStart(startX, startY)
}

function move(mouseX, mouseY){
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
function mouseMove(e){
    e.preventDefault()
    e.stopPropagation()

    let mouseX = parseInt(e.clientX);
    let mouseY = parseInt(e.clientY);
    
    move(mouseX, mouseY)
}
function touchMove(e){
    e.preventDefault()
    e.stopPropagation()

    let mouseX = parseInt(e.touches[0].clientX);
    let mouseY = parseInt(e.touches[0].clientY);
    
    move(mouseX, mouseY)
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

</script>

<style scoped>
    div{
        -webkit-user-select: none; /* Safari */
        -ms-user-select: none; /* IE 10 and IE 11 */
        user-select: none; /* Standard syntax */
    }
    canvas{
        background-color:black;
    }
    div.container{
        margin:0;
        position:fixed;
        left:0;
        top:0;
        width:100%;
        height:100%;
        background-color:black;
    }
    div.slidecont{
        position:fixed;
        top:3px;
        left:0;
        width:100%;
        margin:auto;
        text-align:center;
        padding-top: 20px;
    }
    .slider{
        width:80%;
        height: 20px;
    }


</style>



