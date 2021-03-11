<template>
<div class="entry-container" :ref='"cont_" + ind.row + "_" + ind.col'>

    <canvas id="canvas" :ref='"canvas_" + ind.row + "_" + ind.col'>
        Your browser doesn't support HTML canvas. 
        Please upgrade to a newer browser.
    </canvas>

    <div class="header">
      <span>
        {{ind.row*3 + ind.col + 1 }}
      </span>
    </div>

    <div class="arrow-holder">
      <div class="arrow-set">
        <div class="up-arrow arrow" v-on:click="arrowClick(1, 1)"
          v-bind:style="{borderBottomColor:greenColorString}"></div>
        <div class="down-arrow arrow" v-on:click="arrowClick(1,-1)"
          v-bind:style="{borderTopColor:greenColorString}"></div>
      </div>

      <div class="arrow-set" style="top:95px;">
        <div class="up-arrow arrow" v-on:click="arrowClick(0, 1)"
          v-bind:style="{borderBottomColor:redColorString}"></div>
        <div class="down-arrow arrow" v-on:click="arrowClick(0,-1)"
          v-bind:style="{borderTopColor:redColorString}"></div>
      </div>
    </div>

    <div class="footer">
      <span class="footer">
        H={{hu}}<span v-if="units==0">&deg;</span>
        <span v-else><sup>&Delta;</sup></span> 
      </span>
      <span class="footer">
        V={{vu}}<span v-if="units==0">&deg;</span>
        <span v-else><sup>&Delta;</sup></span> 
      </span>
      <span class="footer">
        T<sub>r</sub>={{red.r}}&deg;
      </span>
      <span class="footer">
        T<sub>g</sub>={{green.r}}&deg;
      </span>
    </div>



</div>
</template>


<script>

  export default{
    props:['ind', 'ppiIn', 'colors', 'size', 'distIn', 'units', 'data', 'invert'],
    data() {
      return {
        canvas: null,
        ctx: null,
        CLICK_DIST: 0,
        red: {r:0},
        green: {r:0},
        startX: 0,
        startY: 0,
        vu: 0,
        hu:0,
        dragging: false,
        dragged: false,
        gc: 0,
        rc: 1,
        ppi: null,
        dist: null,
        redColorString:null,
        greenColorString:null,
      }
    },
    mounted() {
      if(this.invert){
        this.gc = 1
        this.rc = 0
      }

      this.ppi = parseInt(this.ppiIn)
      this.dist = parseFloat(this.distIn)

      this.greenColorString = `rgb(${this.colors[this.gc][0]}, 
                                   ${this.colors[this.gc][1]}, 
                                   ${this.colors[this.gc][2]})`
      this.redColorString = `rgb(${this.colors[this.rc][0]}, 
                                 ${this.colors[this.rc][1]}, 
                                 ${this.colors[this.rc][2]})`

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

        this.red.x = this.ctx.canvas.width/2 - this.size/2
        this.red.y = this.ctx.canvas.height/2 - this.size/2
        this.red.r = 0

        this.green.x0 = this.ctx.canvas.width/2 - this.size
        this.green.y0 = this.ctx.canvas.height/2 - this.size

        if(this.data.data[this.ind.row][this.ind.col].v === undefined){
          this.data.data[this.ind.row][this.ind.col] = {}
          this.green.x = this.green.x0
          this.green.y = this.green.y0
          this.green.r = 0
        }
        else{
          //reconfigure the measurement from mm to pixels.
          this.green.x = this.green.x0 + 
            this.data.data[this.ind.row][this.ind.col].h
          this.green.y = this.green.y0 -
            this.data.data[this.ind.row][this.ind.col].v
          this.green.r = this.data.data[this.ind.row][this.ind.col].gr
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
      },
      drawCircles() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)

        
        this.ctx.beginPath()
        //this.ctx.arc(this.green.x, this.green.y, this.size, 0, 2*Math.PI)
        this.ctx.translate(this.green.x + this.size, this.green.y+this.size)
        this.ctx.rotate(this.green.r * Math.PI/180)
        this.ctx.rect(-this.size, -this.size, this.size*2, this.size*2)

        /*
        this.ctx.moveTo(this.green.x - this.size, 
                        this.green.y) 
        this.ctx.lineTo(this.green.x - this.size, 
                        this.green.y)
                        */
        this.ctx.strokeStyle = this.greenColorString
        this.ctx.lineWidth = this.size/2 //this.line_width
        this.ctx.stroke()
        this.ctx.rotate(-this.green.r * Math.PI/180)
        this.ctx.translate(-(this.green.x+this.size), -(this.green.y+this.size))


        //draw the red circle
        this.ctx.beginPath()
        //this.ctx.arc(this.red.x, this.red.y, this.size/2, 0, 2*Math.PI)
        this.ctx.fillStyle = this.redColorString
        this.ctx.translate(this.red.x + this.size/2, this.red.y+this.size/2)
        this.ctx.rotate(this.red.r * Math.PI/180)
        this.ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size)
        this.ctx.rotate(-this.red.r * Math.PI/180)
        this.ctx.translate(-(this.red.x+this.size/2), -(this.red.y+this.size/2))
        //this.ctx.fill()
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
        //save the offset, given in pixels, as mm
        let v_offset = ( this.green.y0 - this.green.y)
        let h_offset = -1*( this.green.x0  - this.green.x)
        this.data.data[this.ind.row][this.ind.col].v = v_offset
        this.data.data[this.ind.row][this.ind.col].h = h_offset

        //offsets in mm
        let v_mm = v_offset/this.ppi*25.4
        let h_mm = h_offset/this.ppi*25.4

        if(this.units == 0){
          //units have been set for degrees

          //the vertical offset with units (vu) in degrees
          let v_angle = Math.atan(v_mm/this.dist/1000) //dist in m
          this.vu = Math.round(v_angle*18000/Math.PI)/100

          //the horizontal offset with units (hu) in degrees
          let h_angle = Math.atan(h_mm/this.dist/1000) //dist in m
          this.hu = Math.round(h_angle*18000/Math.PI)/100
        }
        else{
          //units in prism dioptres
          this.vu = Math.round(v_mm/this.dist*10)/100
          this.hu = Math.round(h_mm/this.dist*10)/100
        }

        this.data.data[this.ind.row][this.ind.col].vu = this.vu
        this.data.data[this.ind.row][this.ind.col].hu = this.hu
        this.data.data[this.ind.row][this.ind.col].gr = this.green.r
        this.data.data[this.ind.row][this.ind.col].rr = this.red.r

      },
      arrowClick(color, val){
        //color==0 --> green
        //color==1 --> red
        if(color==0){
          this.red.r += val
        }
        else{
          this.green.r += val
        }
        this.drawCircles()
        this.updateData()
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
      bottom:5px;
      margin:0;
      padding:0;
      padding-bottom:0px;
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
    div.entry-container{
        margin:0;
        padding:0;
        position:absolute;
        left:0;
        top:0;
        width:100%;
        height:100%;
        background-color:black;
    }

    div.arrow-holder{
      position:absolute;
      top:0;
      left:0;
      width:30px;
      height:100%;
      padding:10px;
    }
    div.arrow-set{
      margin-top:20px;
      position:absolute;
      top:15px;
      left:10px;
    }
    div.up-arrow{
      top:0;
      border-bottom: 30px solid red;
    }
    div.arrow{
      position:absolute;
      left:0;
      width: 0;
      height: 0;
      border-left: 15px solid transparent;
      border-right: 15px solid transparent;
      cursor:pointer;
    }
    div.arrow:active{
      opacity:0.5;
    }
    div.down-arrow{
      top:35px;
      border-top: 30px solid red;
    }




</style>
