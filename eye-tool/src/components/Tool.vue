<template>
<div class="entry-container" :ref='"cont_" + ind.row + "_" + ind.col'>

    <canvas id="canvas" :ref='"canvas_" + ind.row + "_" + ind.col'>
        Your browser doesn't support HTML canvas. 
        Please upgrade to a newer browser.
    </canvas>

    <!--
    <div class="header">
      <span>
        {{ind.row*3 + ind.col + 1 }}
      </span>
    </div>
    -->


    <div class="footer" v-if="showMeta">
      <span class="footer">
        H={{hu}}<span v-if="data.units==0">&deg;</span>
        <span v-else><sup>&Delta;</sup></span> 
      </span>
      <span class="footer">
        V={{vu}}<span v-if="data.units==0">&deg;</span>
        <span v-else><sup>&Delta;</sup></span> 
      </span>
      <span class="footer">
        T={{(red.r - green.r)%180}}&deg;
      </span>
    </div>



</div>
</template>


<script>

  export default{
    props:['ind', 'ppiIn', 'data', 'showMeta', 'config'],
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
        gc: 0,
        rc: 1,
        ppi: null,
        dist: null,
        entries: null,
      }
    },
    mounted() {
      if(this.config){
        this.entries = this.data.offset
      }
      else {
        this.entries = this.data.data
      }

      this.ppi = parseInt(this.ppiIn)

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

        this.canvas.onwheel=this.scroll;


        window.onresize = this.init

        this.ctx = this.canvas.getContext('2d')

      },
      init(){
        this.resizeCanvas()


        //set defaults
        this.red.x = this.ctx.canvas.width/2 
        this.red.y = this.ctx.canvas.height/2
        this.red.r = 0

        if(this.entries[this.ind.row][this.ind.col].v !== undefined){
          //this entry has been used before, reload the content
          this.red.r = this.entries[this.ind.row][this.ind.col].rr
        }
        if(this.data.offset !== undefined && 
           this.data.offset[0][0].h !== undefined){
          //preferences were set
          this.red.x -= this.data.offset[0][0].h
          this.red.y += this.data.offset[0][0].v
          if(this.entries[this.ind.row][this.ind.col].v === undefined){
            this.red.r = this.data.offset[0][0].rr
          }
        }

        if(this.entries[this.ind.row][this.ind.col].v === undefined){
          this.entries[this.ind.row][this.ind.col] = {}

          var rand_x = 0
          var rand_y = 0
          var rand_r = 0
          if(!this.config){
            rand_x = Math.floor(Math.random()*this.data.size) - this.data.size/2
            rand_y = Math.floor(Math.random()*this.data.size) - this.data.size/2
            rand_r = Math.floor(Math.random()*90) - 45
          }
          this.green.x = this.ctx.canvas.width/2 + rand_x
          this.green.y = this.ctx.canvas.height/2 + rand_y
          this.green.r = 0 + rand_r
        }
        else{
          //reconfigure the measurement from mm to pixels.
          this.green.x = this.red.x + 
            this.entries[this.ind.row][this.ind.col].h
          this.green.y = this.red.y -
            this.entries[this.ind.row][this.ind.col].v
          this.green.r = this.entries[this.ind.row][this.ind.col].gr
        }

        this.updateData()

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


        this.ctx.globalCompositeOperation = 'source-over'

        //draw the red circle
        this.ctx.beginPath()
        this.ctx.translate(this.red.x, this.red.y)
        this.ctx.rotate(this.red.r * Math.PI/180)
        this.ctx.arc(0, 0, this.data.size/1.25, 0, 2*Math.PI)

        this.ctx.fillStyle = `rgb(${this.data.colors[this.rc][0]}, 
                                 ${this.data.colors[this.rc][1]}, 
                                 ${this.data.colors[this.rc][2]})`

        this.ctx.fill()


        //draw the black line through the red circle
        this.ctx.beginPath()
        this.ctx.strokeStyle= "black"
        this.ctx.lineWidth = this.data.size/2.5
        this.ctx.moveTo(0, -this.data.size)
        this.ctx.lineTo(0, this.data.size)
        this.ctx.stroke()

        this.ctx.rotate(-this.red.r * Math.PI/180)
        this.ctx.translate(-(this.red.x), -(this.red.y))

        
        this.ctx.globalCompositeOperation = 'lighter'


        this.ctx.beginPath()
        this.ctx.translate(this.green.x, this.green.y)
        this.ctx.rotate(this.green.r * Math.PI/180)

        this.ctx.arc(0, 0, this.data.size, 0, 2*Math.PI)

        this.ctx.moveTo(0, -this.data.size)
        this.ctx.lineTo(0, this.data.size)
                        
        this.ctx.strokeStyle = `rgb(${this.data.colors[this.gc][0]}, 
                                   ${this.data.colors[this.gc][1]}, 
                                   ${this.data.colors[this.gc][2]})`
        this.ctx.lineWidth = this.data.size/2.5 //this.line_width
        this.ctx.stroke()
        this.ctx.rotate(-this.green.r * Math.PI/180)
        this.ctx.translate(-(this.green.x), -(this.green.y))
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

        if(e.touches.length >= 1){ 
          this.dragging = true
        }
        this.startX = parseInt(e.touches[0].clientX)
        this.startY = parseInt(e.touches[0].clientY)
      },
      move(mouseX, mouseY){
        let dx = mouseX-this.startX;
        let dy = mouseY-this.startY;

        this.startX = mouseX
        this.startY = mouseY

        if(this.dragging){
          if(this.config){
            this.red.x += dx
            this.red.y += dy
          }
          else{
            this.green.x += dx
            this.green.y += dy
          }

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

        this.dragging = false
      },
      scroll(e){
        e.preventDefault()
        e.stopPropagation()

        if(e.deltaY <0){
          if(this.config){
            this.red.r -= 1
          }
          else{
            this.green.r -= 1
          }
        }
        else{
          if(this.config){
            this.red.r += 1
          }
          else{
            this.green.r += 1
          }
        }
        this.drawCircles()
        this.updateData()
      },
      updateData(){
        //save the offset, given in pixels, as mm
        let v_offset = ( this.red.y - this.green.y)
        let h_offset = -1*( this.red.x - this.green.x)
        this.entries[this.ind.row][this.ind.col].v = v_offset
        this.entries[this.ind.row][this.ind.col].h = h_offset

        //offsets in mm
        let v_mm = v_offset/this.ppi*25.4
        let h_mm = h_offset/this.ppi*25.4

        if(this.data.units == 0){
          //units have been set for degrees

          //the vertical offset with units (vu) in degrees
          let v_angle = Math.atan(v_mm/this.data.dist/1000) //dist in m
          this.vu = Math.round(v_angle*18000/Math.PI)/100

          //the horizontal offset with units (hu) in degrees
          let h_angle = Math.atan(h_mm/this.data.dist/1000) //dist in m
          this.hu = Math.round(h_angle*18000/Math.PI)/100
        }
        else{
          //units in prism dioptres
          this.vu = Math.round(v_mm/this.data.dist*10)/100
          this.hu = Math.round(h_mm/this.data.dist*10)/100
        }

        this.entries[this.ind.row][this.ind.col].vu = this.vu
        this.entries[this.ind.row][this.ind.col].hu = this.hu
        this.entries[this.ind.row][this.ind.col].gr = this.green.r
        this.entries[this.ind.row][this.ind.col].rr = this.red.r
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



</style>
