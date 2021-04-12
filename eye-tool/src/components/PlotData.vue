<template>
<div class="container">
    <canvas id="canvas_plot">
        Your browser doesn't support HTML canvas. 
        Please upgrade to a newer browser.
    </canvas>

</div>
</template>


<script>

  export default{
    props: ["data", "maxX", "minX", "maxY", "minY", "vSep", "hSep"],
    data() {
      return {
        canvas: null,
        ctx: null,
      }
    },
    mounted() {
      this.setupCanvas()
      this.init()
    },
    methods: {
      setupCanvas(){
        this.canvas = document.getElementById('canvas_plot')

        window.onresize = this.init

        this.ctx = this.canvas.getContext('2d')
      },
      init(){

        this.vSep = window.innerHeight/3
        this.hSep = window.innerWidth/3

        this.ctx.canvas.width = this.canvas.parentElement.parentElement.clientWidth
        this.ctx.canvas.height = this.canvas.parentElement.parentElement.clientHeight

        let line = {}
        line.x = this.ctx.canvas.width/2 - this.ppi_default/2
        line.y = this.ctx.canvas.height/2

        //clear the canvas, just in case
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)

        //draw the line
        this.ctx.beginPath()
        this.ctx.moveTo(0, 0) 

        this.ctx.lineTo(this.ctx.canvas.width/2, this.ctx.canvas.height/2)
        this.ctx.strokeStyle = "blue"
        this.ctx.lineWidth = 5
        this.ctx.stroke()
      },
      /*
      getCanvasCoordsFromPoint(X, Y){
        //convert X and Y in local units to canvas units

        //pick the center as a reference point
        let midX = (this.maxX + this.minX)/2;
        let midY = (this.maxY + this.minY)/2;

        let ratioX = this.ctx.canvas.width/(this.maxX - this.minX);
        let ratioY = this.ctx.canvas.height/(this.maxY - this.minY);



      },
      drawGridLines(){
        let linesX = [-10, -5, 0, 5, 10];
        let linesY = [-10, -5, 0, 5, 10];

        this.ctx.globalCompositeOperation = 'source-over'
        for(var i=0; i<linesX.length; i++){

          this.ctx.beginPath()
          this.ctx.strokeStyle= "black"
          this.ctx.lineWidth = 1
          this.ctx.moveTo(0, this.ctx.canvas.height/3*(1))
          this.ctx.lineTo(this.ctx.canvas.width, this.ctx.canvas.height/3*(1))
          this.ctx.stroke()

         
        }

      }*/
    }
  }

</script>

<style scoped>
    canvas{
        position:relative;
        top:0;
        left:0;
        background-color:white;
        display:block;
        border:1px solid red;
    }
    div.container{
        margin:0px;
        width:100%;

        padding:0;

        color:black;
        text-align:center;
    }
</style>
