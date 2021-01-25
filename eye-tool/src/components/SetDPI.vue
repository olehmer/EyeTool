<template>
<div class="container">
    <h2>Set Screen Pixel Density</h2>

    <p>The pixels per inch (PPI) of the screen is:</p>
    <input v-model="ppi" placeholder="pixels per inch" v-on:change="updateWidth">
    <span style="padding-left:10px;">PPI.</span>
    <p>If the PPI is correct, the red line below should measure exactly 1 inch
      in width. Note that mobile phones may require you to enter the dots per
      inch (DPI) instead of PPI if using this method.</p>

    <h3>OR</H3>

    <p>By measuring, the red line below is: </p>
    <input v-model="line_width" placeholder="line width" v-on:change="updatePPI">
    <span style="padding-left:10px;">inches wide.</span>

    <canvas id="canvas_ppi">
        Your browser doesn't support HTML canvas. 
        Please upgrade to a newer browser.
    </canvas>

    <div style="margin:10px"></div>

</div>
</template>


<script>

  export default{
    data() {
      return {
        canvas: null,
        ctx: null,
        ppi: 96,
        line_width: 1
      }
    },
    mounted() {
      this.setupCanvas()
      this.init()
    },
    methods: {
      setupCanvas(){
        this.canvas = document.getElementById('canvas_ppi')

        window.onresize = this.init

        this.ctx = this.canvas.getContext('2d')

      },
      init(){
        //resize canvas just in case
        this.ctx.canvas.width = window.innerWidth;
        this.ctx.canvas.height = 20

        let line = {}
        line.x = 0
        line.y = this.ctx.canvas.height/2

        //clear the canvas, just in case
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)

        //draw the line
        this.ctx.beginPath()
        this.ctx.moveTo(line.x, line.y) 
        this.ctx.lineTo(this.ppi, line.y)
        this.ctx.strokeStyle = "red"
        this.ctx.lineWidth = 5
        this.ctx.stroke()
      },
      updateWidth(){
        this.init()
      },
      updatePPI(){
        //25.4 mm per inch
        this.ppi = this.ppi/(this.line_width/25.4)
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
    canvas{
        background-color:white;
    }
    div.container{
        margin:0;
        position:fixed;
        left:0;
        top:20px;
        width:100%;
        height:100%;
        background-color:white;
        padding-left:20px;


        color:black;
        text-align:left;

        overflow:auto;
    }



</style>
