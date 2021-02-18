<template>
<div class="container">
    <div class="footer">
      <span class="footer">H={{h_offset}} [mm]</span>
      <span class="footer">V={{v_offset}} [mm]</span>
    </div>
    <canvas id="canvas">
        Your browser doesn't support HTML canvas. 
        Please upgrade to a newer browser.
    </canvas>

</div>
</template>


<script>

  export default{
    data() {
      return {
        canvas: null,
        ctx: null,
        SCALE: 0,
        CLICK_DIST: 0,
        user_scale_change: 1,
        line_width: 0,
        DEFAULT_LINE: 15,
        red: {},
        green: {},
        startX: 0,
        startY: 0,
        v_offset: 0,
        h_offset:0,
        green_angle:0,
        red_angle:0
      }
    },
    mounted() {
      this.setupCanvas()
      this.init()
    },
    methods: {
      setupCanvas(){
        this.canvas = document.getElementById('canvas')
        this.canvas.onmousedown=this.mouseDown;
        this.canvas.onmousemove=this.mouseMove;
        this.canvas.onmouseup=this.mouseUp;
        this.canvas.onmouseout=this.mouseUp;
        this.canvas.ondblclick=this.doubleClick;

        this.canvas.ontouchstart=this.touchDown;
        this.canvas.ontouchmove=this.touchMove;
        this.canvas.ontouchend=this.mouseUp;
        this.canvas.ontouchcancel=this.mouseUp;
        this.canvas.ondblclick=this.doubleClick;


        window.onresize = this.init

        this.ctx = this.canvas.getContext('2d')

      },
      init(){
        this.resizeCanvas()

        this.red.x = this.ctx.canvas.width/2
        this.red.y = this.ctx.canvas.height/2
        this.red.theta = 0
        this.red.isDragging = false

        this.green.x = this.ctx.canvas.width/2
        this.green.y = this.ctx.canvas.height/2
        this.green.theta = 0
        this.green.isDragging = false

        this.h_offset = 0
        this.v_offset = 0

        this.slider = 50
        this.updateSize()
      },
      setRadii(){
        this.red.r = this.SCALE*this.user_scale_change
        this.green.r = this.red.r + this.DEFAULT_LINE*this.user_scale_change

        this.line_width = this.DEFAULT_LINE*this.user_scale_change
      },
      resizeCanvas(){
        this.ctx.canvas.width = window.innerWidth;
        this.ctx.canvas.height = window.innerHeight;

        this.CLICK_DIST = 0.001*(this.ctx.canvas.width + this.ctx.canvas.height)/2
        this.SCALE = this.CLICK_DIST*50*this.user_scale_change
      },
      getXAndYChangeFromTheta(theta, rad){
        let rho = (Math.PI - theta)/2
        let alpha = rad*Math.sin(theta)/Math.sin(rho)
        let phi = Math.PI/2 - rho
        let dx = rho!=0?Math.sin(phi)*alpha:rad*2
        let dy = rho!=0?Math.sin(rho)*alpha:0
        return [dx, dy]
      },
      drawCircles() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)

        let gds = this.getXAndYChangeFromTheta(this.green.theta, this.green.r)
        let gde = this.getXAndYChangeFromTheta(this.green.theta + Math.PI, 
                                               this.green.r)
        this.ctx.beginPath()
        this.ctx.arc(this.green.x, this.green.y, this.green.r, 0, 2*Math.PI)
        this.ctx.moveTo(this.green.x + gds[0] - this.green.r, 
                        this.green.y + gds[1]) 
        this.ctx.lineTo(this.green.x + gde[0] - this.green.r, 
                        this.green.y + gde[1])
        this.ctx.strokeStyle = "green"
        this.ctx.lineWidth = this.line_width
        this.ctx.stroke()

        this.ctx.globalCompositeOperation = 'lighter'

        let rds = this.getXAndYChangeFromTheta(this.red.theta, this.red.r)
        let rde = this.getXAndYChangeFromTheta(this.red.theta + Math.PI, 
                                               this.red.r)
        this.ctx.beginPath()
        this.ctx.arc(this.red.x, this.red.y, this.red.r, 0, 2*Math.PI)
        this.ctx.moveTo(this.red.x + rds[0] - this.red.r, 
                        this.red.y + rds[1]) 
        this.ctx.lineTo(this.red.x + rde[0] - this.red.r, 
                        this.red.y + rde[1])

        this.ctx.strokeStyle = "red"
        this.ctx.lineWidth = this.line_width
        this.ctx.stroke()
      },
      clickStart(startX, startY){
        let red_dist_sq = (this.red.x - startX)**2 + (this.red.y - startY)**2
        let green_dist_sq = (this.green.x - startX)**2 + (this.green.y -startY)**2

        if (red_dist_sq < (this.red.r + this.line_width)**2){
            this.red.isDragging = true
            return
        }

        if (green_dist_sq < (this.green.r + this.line_width)**2){
            this.green.isDragging = true
            return
        }
      },
      mouseDown(e){
        e.preventDefault()
        e.stopPropagation()

        this.red.isDragging = false
        this.green.isDragging = false

        this.startX = parseInt(e.clientX)
        this.startY = parseInt(e.clientY)

        this.clickStart(this.startX, this.startY)
      },
      touchDown(e){
        e.preventDefault()
        e.stopPropagation()

        this.red.isDragging = false
        this.green.isDragging = false

        this.startX = parseInt(e.touches[0].clientX)
        this.startY = parseInt(e.touches[0].clientY)

        this.clickStart(this.startX, this.startY)
      },
      move(mouseX, mouseY){
        let dx = mouseX-this.startX;
        let dy = mouseY-this.startY;
        this.startX = mouseX
        this.startY = mouseY

        if (this.red.isDragging){
            this.red.x += dx
            this.red.y += dy
        }
        if (this.green.isDragging){
            this.green.x += dx
            this.green.y += dy
        }
        this.drawCircles()

        this.v_offset = Math.abs(this.red.y - this.green.y)
        this.h_offset = Math.abs(this.red.x - this.green.x)
      },
      mouseMove(e){
        e.preventDefault()
        e.stopPropagation()

        let mouseX = parseInt(e.clientX);
        let mouseY = parseInt(e.clientY);
        
        
        this.move(mouseX, mouseY)
      },
      touchMove(e){
        e.preventDefault()
        e.stopPropagation()

        let mouseX = parseInt(e.touches[0].clientX);
        let mouseY = parseInt(e.touches[0].clientY);
        
        this.move(mouseX, mouseY)
      },
      mouseUp(e){
        e.preventDefault()
        e.stopPropagation()
        this.red.isDragging = false
        this.green.isDragging = false
      },
      updateSize(){
        this.user_scale_change = 1 + 2*(this.slider-50)/100
        this.setRadii()
        this.drawCircles()
      }
    }
  }

</script>

<style scoped>
    div{
        -webkit-user-select: none; /* Safari */
        -ms-user-select: none; /* IE 10 and IE 11 */
        user-select: none; /* Standard syntax */
    }
    div.footer{
      color:white;
      position:fixed;
      bottom:10px;
      width:100%;
    }
    span.footer{
      padding:15px;
    }
    canvas{
        position:absolute;
        top:0;
        left:0;
        margin:0;
        padding:0;
        background-color:black;
    }
    div.container{
        margin:0;
        padding:0;
        position:fixed;
        left:0;
        top:0;
        width:100%;
        height:100%;
        background-color:red;
        z-index:400;
    }

</style>
