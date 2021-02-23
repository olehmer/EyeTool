<template>
<div class="container" :ref='"cont_" + ind.row + "_" + ind.col'>

    <canvas id="canvas" :ref='"canvas_" + ind.row + "_" + ind.col'>
        Your browser doesn't support HTML canvas. 
        Please upgrade to a newer browser.
    </canvas>

    <div class="footer">
      <span class="footer">
        H={{h_offset}} [mm]
      </span>
      <span class="footer">
        V={{v_offset}} [mm]
      </span>
      <span class="footer">
        PD={{pd}} [&#916;]
      </span>
    </div>

    <div class="header">
      <span>
        {{ind.row + 1}},{{ind.col + 1}}
      </span>
    </div>


</div>
</template>


<script>

  export default{
    props:['ind', 'ppi', 'colors', 'size', 'dist', 'data', 'invert'],
    data() {
      return {
        canvas: null,
        ctx: null,
        CLICK_DIST: 0,
        red: {},
        green: {},
        startX: 0,
        startY: 0,
        v_offset: 0,
        h_offset:0,
        pd: 0,
        dragging: false,
        dragged: false,
        preset: false,
        gc: 0,
        rc: 1,
      }
    },
    mounted() {
      if(this.data.data[this.ind.row][this.ind.col].x === undefined){
        let newMeasurement = {}
        newMeasurement.v = 0
        newMeasurement.h = 0
        newMeasurement.x = 0
        this.data.data[this.ind.row][this.ind.col] = newMeasurement
      }
      else{
        //reconfigure the measurement.
        this.green.x = this.data.data[this.ind.row][this.ind.col].x
        this.green.y = this.data.data[this.ind.row][this.ind.col].y
        this.preset = true
      }

      if(this.invert){
        this.gc = 1
        this.rc = 0
      }

      this.setupCanvas()
      this.init()
    },
    methods: {
      setupCanvas(){
        let ref = "canvas_" + this.ind.row + "_" + this.ind.col
        this.canvas = this.$refs[ref] 
        this.canvas.onmousedown=this.mouseDown;
        this.canvas.onmousemove=this.mouseMove;
        this.canvas.onmouseup=this.mouseUp;
        this.canvas.onmouseout=this.mouseUp;

        this.canvas.ontouchstart=this.touchDown;
        this.canvas.ontouchmove=this.touchMove;
        this.canvas.ontouchend=this.mouseUp;
        this.canvas.ontouchcancel=this.mouseUp;


        window.onresize = this.init

        this.ctx = this.canvas.getContext('2d')

      },
      init(){
        this.resizeCanvas()

        this.red.x = this.ctx.canvas.width/2
        this.red.y = this.ctx.canvas.height/2

        if(!this.preset){
          this.green.x = this.ctx.canvas.width/2
          this.green.y = this.ctx.canvas.height/2
        }

        this.updateData()

        this.ctx.globalCompositeOperation = 'lighter'

        this.drawCircles()
      },
      resizeCanvas(){
        let ref = "cont_" + this.ind.row + "_" + this.ind.col
        let element = this.$refs[ref]

        if(element === undefined){
          return
        }
    
        this.ctx.canvas.width = element.clientWidth 
        this.ctx.canvas.height = element.clientHeight 

        this.CLICK_DIST = 0.001*(this.ctx.canvas.width + this.ctx.canvas.height)/2
      },
      drawCircles() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)

        
        this.ctx.beginPath()
        this.ctx.arc(this.green.x, this.green.y, this.size, 0, 2*Math.PI)
        this.ctx.moveTo(this.green.x - this.size, 
                        this.green.y) 
        this.ctx.lineTo(this.green.x - this.size, 
                        this.green.y)
        this.ctx.strokeStyle = `rgb(${this.colors[this.gc][0]}, 
                                    ${this.colors[this.gc][1]}, 
                                    ${this.colors[this.gc][2]})`
        this.ctx.lineWidth = this.size/2 //this.line_width
        this.ctx.stroke()

        //draw the red circle
        this.ctx.beginPath()
        this.ctx.arc(this.red.x, this.red.y, this.size/2, 0, 2*Math.PI)
        this.ctx.fillStyle = `rgb(${this.colors[this.rc][0]}, 
                                  ${this.colors[this.rc][1]}, 
                                  ${this.colors[this.rc][2]})`
        this.ctx.fill()
      },
      mouseDown(e){
        e.preventDefault()
        e.stopPropagation()

        this.dragging = true

        this.startX = parseInt(e.clientX)
        this.startY = parseInt(e.clientY)
      },
      touchDown(e){
        e.preventDefault()
        e.stopPropagation()

        if(e.touches.length >= 1){ //TODO, update touches?
          this.dragging = true
        }
        this.startX = parseInt(e.touches[0].clientX)
        this.startY = parseInt(e.touches[0].clientY)
      },
      move(mouseX, mouseY){
        let dx = mouseX-this.startX;
        let dy = mouseY-this.startY;

        if(Math.abs(dx) > 0 || Math.abs(dy) > 0){
          this.dragged = true
        }

        this.startX = mouseX
        this.startY = mouseY

        if(this.dragging){
          this.green.x += dx
          this.green.y += dy

          this.drawCircles()

          this.updateData()
        }
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

        

        //TODO, if mouse didn't move, move the click distance
        /*
        if(!this.dragged){
          let dx = this.startX - this.green.x
          let dy = this.startY - this.green.y
          let alpha = Math.PI/2 - Math.atan(dx/dy)
        }*/

        this.dragging = false
        this.dragged = false

      },
      updateData(){
        let v_offset = (this.red.y - this.green.y)
        let h_offset = -1*(this.red.x - this.green.x)


        this.h_offset = Math.round(h_offset/this.ppi*25.4*10)/10
        this.v_offset = Math.round(v_offset/this.ppi*25.4*10)/10
        this.data.data[this.ind.row][this.ind.col].v = this.v_offset
        this.data.data[this.ind.row][this.ind.col].h = this.h_offset

        //hypot is in mm, dist in m, so the factor of 1000 drops due to the PD
        //conversion and for rounding
        this.pd = Math.round(
          Math.sqrt(this.h_offset**2 + this.v_offset**2)/this.dist)/10
        this.data.data[this.ind.row][this.ind.col].pd = this.pd

        //store the old x and y values
        this.data.data[this.ind.row][this.ind.col].x = this.green.x
        this.data.data[this.ind.row][this.ind.col].y = this.green.y
      },
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
      position:absolute;
      bottom:15px;
      margin:0;
      padding:0;
      padding-bottom:10px;
      width:100%;
    }
    span.footer{
      padding:5px;
      width:33%;
    }
    div.header{
      color:white;
      position:absolute;
      top:10px;
      width:100%;
      padding:0;
      margin:0;
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
        position:absolute;
        left:0;
        top:0;
        width:100%;
        height:100%;
        background-color:black;
    }

</style>
