<template>
  <div class="entry-container" id="toolCont">

    <canvas id="toolCanvas">
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
        H={{-1*hu}}<span v-if="data.units==0">&deg;</span>
        <span v-else><sup>&Delta;</sup></span> 
      </span>
      <span class="footer">
        V={{-1*vu}}<span v-if="data.units==0">&deg;</span>
        <span v-else><sup>&Delta;</sup></span>
      </span>
    </div>



</div>
</template>


<script>
  import CalculateDistance from "./CalculateDistance.js"

  export default{
    props:['ppiIn', 'data', 'showMeta', 'config'],
    mixins: [CalculateDistance],
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
        entries: null,
        chars: [null,null,null,null],
        ind: {row:1, col:1},
        rotateInner: false,
        rotateOuter: false,
        showGrayDots: false,
        currentRotation: 0,
      }
    },
    mounted() {
      if(this.config){
        this.entries = this.data.offset
        this.ind.row = 0
        this.ind.col = 0
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
        this.canvas = document.getElementById('toolCanvas')
        this.canvas.onmousedown=this.mouseDown;
        this.canvas.onmousemove=this.mouseMove;
        this.canvas.onmouseup=this.mouseUp;
        this.canvas.onmouseout=this.mouseUp;

        this.canvas.ontouchstart=this.touchDown;
        this.canvas.ontouchmove=this.touchMove;
        this.canvas.ontouchend=this.mouseUp;
        this.canvas.ontouchcancel=this.mouseUp;

        //this.canvas.onwheel=this.scroll;

        document.onkeyup = this.handleKey


        window.onresize = this.init

        this.ctx = this.canvas.getContext('2d')

      },
      init(){
        this.resizeCanvas()

        this.configureMarkerLocation()

        this.randomCharacters()

        this.updateData()

        this.drawCircles()
      },
      configureMarkerLocation(){
        console.log("orl1")
        var centerX = this.ctx.canvas.width/6*(1+2*this.ind.col)
        var centerY = this.ctx.canvas.height/6*(1+2*this.ind.row)

        if(this.config){
          centerX = this.ctx.canvas.width/2
          centerY = this.ctx.canvas.height/2
        }
        else{
          //store the center location
          this.data.cx = this.ctx.canvas.width/2
          this.data.cy = this.ctx.canvas.height/2
        }

        //set defaults
        this.red.x = centerX
        this.red.y = centerY
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
        }

        if(this.entries[this.ind.row][this.ind.col].v === undefined){
          //center the outer marker, no preset values
          this.entries[this.ind.row][this.ind.col] = {}

          this.green.x = centerX
          this.green.y = centerY
          this.green.r = 0 
        }
        else{
          //reconfigure the measurement from mm to pixels.
          this.green.x = this.red.x + 
            this.entries[this.ind.row][this.ind.col].h
          this.green.y = this.red.y -
            this.entries[this.ind.row][this.ind.col].v
          this.green.r = this.entries[this.ind.row][this.ind.col].gr
        }
      },
      resizeCanvas(){
        let element = document.getElementById('toolCont')

        if(element === undefined || element === null){
          return
        }
    
        this.ctx.canvas.width = element.clientWidth 
        this.ctx.canvas.height = element.clientHeight 
      },
      drawGrid(){
        //draw a grid of blue lines on the tool, for debugging
        this.ctx.globalCompositeOperation = 'source-over'

        this.ctx.beginPath()
        this.ctx.strokeStyle= "gray"
        this.ctx.lineWidth = 3
        this.ctx.moveTo(0, this.ctx.canvas.height/3*(1))
        this.ctx.lineTo(this.ctx.canvas.width, this.ctx.canvas.height/3*(1))
        this.ctx.stroke()

        this.ctx.beginPath()
        this.ctx.moveTo(0, this.ctx.canvas.height/3*(2))
        this.ctx.lineTo(this.ctx.canvas.width, this.ctx.canvas.height/3*(2))
        this.ctx.stroke()

        this.ctx.beginPath()
        this.ctx.moveTo(this.ctx.canvas.width/3*(1), 0)
        this.ctx.lineTo(this.ctx.canvas.width/3*(1), this.ctx.canvas.height)
        this.ctx.stroke()

        this.ctx.beginPath()
        this.ctx.moveTo(this.ctx.canvas.width/3*(2), 0)
        this.ctx.lineTo(this.ctx.canvas.width/3*(2), this.ctx.canvas.height)
        this.ctx.stroke()
       
      },
      drawGuideCircles(){
        let w_step = this.ctx.canvas.width/6
        let h_step = this.ctx.canvas.height/6

        //this.ctx.fillStyle = "#222222" 
        this.ctx.fillStyle = `rgb(${this.data.colors[this.rc][0]/3}, 
                                  ${this.data.colors[this.rc][1]/3}, 
                                  ${this.data.colors[this.rc][2]/3})`

        for(var i=0; i<3; i++){
          for(var j=0; j<3; j++){
            if(i != this.ind.row || j != this.ind.col){
              //draw a circle
              this.ctx.beginPath()
              this.ctx.arc(w_step*(1 + 2*j), h_step*(1 + 2*i), 
                           this.data.size/1.5, 0, 2*Math.PI)
              this.ctx.fill()

            }
          }
        }

      },
      drawCircles() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)

        //this.drawGrid()

        if(this.showGrayDots){
          this.drawGuideCircles()
        }


        if(!this.rotateOuter){
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

          //draw the letters, still black from before
          let letterSize = this.data.size/2
          this.ctx.font = letterSize + "px Arial";
          this.ctx.textAlign = 'center'
          this.ctx.textBaseline='middle'
          this.ctx.fillStyle='black'
          this.ctx.fillText(this.chars[0], -this.data.size/2.00, 0);
          this.ctx.fillText(this.chars[1], this.data.size/2.00, 0);


          this.ctx.rotate(-this.red.r * Math.PI/180)
          this.ctx.translate(-(this.red.x), -(this.red.y))
        }

        
        if(!this.rotateInner){
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

          //draw the text
          this.ctx.globalCompositeOperation = 'source-over'
          this.ctx.fillStyle='black'
          this.ctx.fillText(this.chars[2], -this.data.size/1.00, 0);
          this.ctx.fillText(this.chars[3], this.data.size/1.00, 0);

          this.ctx.rotate(-this.green.r * Math.PI/180)
          this.ctx.translate(-(this.green.x), -(this.green.y))
        }
      },
      randomCharacters(){
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        let charLen = chars.length
        this.chars[0] = chars.charAt(Math.floor(Math.random()*charLen))
        this.chars[1] = chars.charAt(Math.floor(Math.random()*charLen))
        this.chars[2] = chars.charAt(Math.floor(Math.random()*charLen))
        this.chars[3] = chars.charAt(Math.floor(Math.random()*charLen))
      },
      mouseDown(e){
        e.preventDefault()
        e.stopPropagation()

        this.dragging = true

        this.startX = parseInt(e.clientX)
        this.startY = parseInt(e.clientY)

        //store the rotation
        if(this.rotateInner){
          this.currentRotation = this.red.r
        }
        else {
          this.currentRotation = this.green.r
        }
      },
      touchDown(e){
        e.preventDefault()
        e.stopPropagation()

        if(e.touches.length >= 1){ 
          this.dragging = true
        }
        this.startX = parseInt(e.touches[0].clientX)
        this.startY = parseInt(e.touches[0].clientY)

        //store the rotation
        if(this.rotateInner){
          this.currentRotation = this.red.r
        }
        else {
          this.currentRotation = this.green.r
        }
      },
      move(mouseX, mouseY){
        if(this.rotateInner || this.rotateOuter){
          //only move when not rotating
          return
        }
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
      getRotation(start, end, center){

        let aSq = (center.x - start.x)**2 + (center.y - start.y)**2
        let bSq = (center.x - end.x)**2 + (center.y - end.y)**2
        let cSq = (start.x - end.x)**2 + (start.y - end.y)**2

        var alpha = Math.acos((aSq + bSq - cSq)/(2*aSq**0.5*bSq**0.5))
        alpha = Math.round(alpha*180/Math.PI*10)/10

        //let line to check where points are
        var slope = (center.y - start.y)/(center.x - start.x)

        let intercept = start.y - slope*start.x
        if(end.y < slope*end.x + intercept){
          alpha = -1*alpha
        }
        if(start.x < center.x){
          alpha = -1*alpha
        }
        
        return alpha
 
      },
      moveRotate(mouseX, mouseY){
        if(this.dragging){
          if(this.rotateInner){
            let alpha = this.getRotation({x:this.startX, y:this.startY}, 
                                         {x:mouseX, y:mouseY},
                                         {x:this.red.x, y:this.red.y})
            this.red.r = this.currentRotation + alpha

          }
          else {
            let alpha = this.getRotation({x:this.startX, y:this.startY}, 
                                         {x:mouseX, y:mouseY},
                                         {x:this.green.x, y:this.green.y})
            this.green.r = this.currentRotation + alpha

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
        this.moveRotate(mouseX, mouseY)

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
      handleKey(event){
        event.preventDefault()
        event.stopPropagation()

        if(this.config){
          //no keys during config
          return
        }


        let key = event.keyCode

        switch(key){
          case 49:
            //1
            this.ind.row = 0;
            this.ind.col = 0;
            break;
          case 50:
            //2
            this.ind.row = 0;
            this.ind.col = 1;
            break;
          case 51:
            //3
            this.ind.row = 0;
            this.ind.col = 2;
            break;
          case 52:
            //4
            this.ind.row = 1;
            this.ind.col = 0;
            break;
          case 53:
            //5
            this.ind.row = 1;
            this.ind.col = 1;
            break;
          case 54:
            //6
            this.ind.row = 1;
            this.ind.col = 2;
            break;
          case 55:
            //7
            this.ind.row = 2;
            this.ind.col = 0;
            break;
          case 56:
            //8
            this.ind.row = 2;
            this.ind.col = 1;
            break;
          case 57:
            //9
            this.ind.row = 2;
            this.ind.col = 2;
            break;
          case 71:
            //g
            this.showGrayDots = !this.showGrayDots
            break;
          case 73:
            //i key, change inner marker angle
            this.rotateOuter = false;
            this.rotateInner = true;
            break;
          case 79:
            //o key, change the outer marker angle
            this.rotateInner = false;
            this.rotateOuter = true;
            break;
          case 80:
            //p key, proceed back to tool ;)
            this.rotateOuter = false;
            this.rotateInner = false;
            break;
          case 81:
            //q, emit the quit
            this.$emit("exitTool");
            break;
        }

        this.configureMarkerLocation()

        if(key > 48 && key < 58){
          this.randomCharacters()
          this.updateData()
        }
        this.drawCircles()
      },
      updateData(){
        //save the offset, given in pixels, as mm
        let v_offset = ( this.red.y - this.green.y)
        let h_offset = -1*( this.red.x - this.green.x)
        this.entries[this.ind.row][this.ind.col].v = v_offset
        this.entries[this.ind.row][this.ind.col].h = h_offset


        let centerPos = {}
        centerPos.x = this.ctx.canvas.width/2
        centerPos.y = this.ctx.canvas.height/2
        let res = this.getEyeOffset(this.data.dist, centerPos, this.red, 
                                         this.green, this.ppi, this.data.units)

        this.vu = res.v
        this.hu = res.h


        this.entries[this.ind.row][this.ind.col].vu = this.vu
        this.entries[this.ind.row][this.ind.col].hu = this.hu
        this.entries[this.ind.row][this.ind.col].gr = this.green.r
        this.entries[this.ind.row][this.ind.col].rr = this.red.r

        this.entries[this.ind.row][this.ind.col].gx = this.green.x
        this.entries[this.ind.row][this.ind.col].gy = this.green.y
        this.entries[this.ind.row][this.ind.col].rx = this.red.x
        this.entries[this.ind.row][this.ind.col].ry = this.red.y
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
