<template>
<div class="container">
    <canvas id="canvas_plot">
        Your browser doesn't support HTML canvas. 
        Please upgrade to a newer browser.
    </canvas>

</div>
</template>


<script>

  import CalculateDistance from "./CalculateDistance.js"

  export default{
    props: ["ppi", "data"],
    mixins: [CalculateDistance],
    data() {
      return {
        canvas: null,
        ctx: null,
        vSep: 0,
        hSep: 0,
        offsetX: 0,
        offsetY: 0,
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

        //initialize data config values
        this.setVandHSepAndOffset()


        //set the min and max x and y values
        this.minX = -1.5*this.hSep
        this.maxX = 1.5*this.hSep
        this.minY = -1.5*this.vSep
        this.maxY = 1.5*this.vSep

        this.setCanvasDimensions()

        //clear the canvas, just in case
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)

        this.drawMinorGridLines()
        this.drawMajorGridLines()

        this.plotDataPoints()

        this.addPlotLabels()
      },
      setVandHSepAndOffset(){
        /*
         * Calculate the vertical and horizontal separation for the rows and
         * columns of the Tool (3 by 3).
         */


        //the offset is one third of the screen in each direction
        let v_offset = window.innerHeight/3
        let h_offset = window.innerWidth/3

        //x and y offsets from settings
        var xo = 0
        var yo = 0
        if(this.data.offset!==undefined){
          xo =  this.data.offset[0][0].h
          yo =  this.data.offset[0][0].v
        }

        this.hSep = this.getDistance(h_offset, this.data.dist, this.ppi, 
                                     this.data.units)
        this.vSep = this.getDistance(v_offset, this.data.dist, this.ppi,
                                     this.data.units)
        this.offsetX = this.getDistance(xo, this.data.dist, this.ppi, 
                                        this.data.units)
        this.offsetY = this.getDistance(yo, this.data.dist, this.ppi,
                                        this.data.units)
      },
      setCanvasDimensions(){
        /*Preserve the aspect ratio of the tool.*/

        let ratio = window.innerHeight/window.innerWidth
          if(ratio < 1){
          //wider than tall, most likely
          this.ctx.canvas.width = 
            this.canvas.parentElement.parentElement.clientWidth;
          this.ctx.canvas.height = ratio*this.ctx.canvas.width
        }
        else{
          this.ctx.canvas.height = 
                          this.canvas.parentElement.parentElement.clientWidth;
          this.ctx.canvas.width = this.ctx.canvas.height/ratio
        }
      },
      getCanvasCoordsForPoint(X, Y){
        //convert X and Y in local units to canvas units

        //the label size in canvas units
        let labelSize = 35
        let vLabelPad = 10
        let outerPad = 10

        //adjust the X and Y coordinates by the min values
        //also flip about the Y axis to be normal
        var newX = X - this.minX
        var newY = this.maxY - Y 
        //because: (this.maxY - this.minY) - (Y - this.minY) = this.maxY - Y

        var plottableW = this.ctx.canvas.width - (labelSize+vLabelPad) - outerPad
        var plottableH = this.ctx.canvas.height - labelSize - outerPad

        let ratioX = plottableW/(this.maxX - this.minX);
        let ratioY = plottableH/(this.maxY - this.minY);

        //rescale for the canvas
        newX = newX*ratioX + labelSize + vLabelPad
        newY = newY*ratioY + outerPad 

        return [newX, newY]
      },
      intRange(start, stop, num){
        let step = (stop - start)/(num - 1); //since we'll pad the end point on
        return Array.from({length: num}, (_, i) => Math.round((start +
          step*i)*10)/10)
      },
      drawMajorGridLines(){
        let linesX = [-1.5*this.hSep, -this.hSep, 0, this.hSep, 1.5*this.hSep];
        let linesY = [-1.5*this.vSep, -this.vSep, 0, this.vSep, 1.5*this.vSep];
        this.drawGridLines(linesX, linesY, 1.5, "black")
      },
      drawMinorGridLines(){
        let num = 13
        let linesX = this.intRange(this.minX, this.maxX, num)
        let linesY = this.intRange(this.minY, this.maxY, num)
        this.drawGridLines(linesX, linesY, 0.5, "gray", true)
      },
      drawGridLines(linesX, linesY, width, color, labels=false){
        this.ctx.font = "14px Helvetica";
        this.ctx.textAlign = "center"
        this.ctx.globalCompositeOperation = 'source-over'
        this.ctx.strokeStyle= color
        this.ctx.lineWidth = width
        for(var i=0; i<linesX.length; i++){
          if(linesX[i] >= this.minX && linesX[i] <= this.maxX){
            //don't draw lines outside the plot
            let resXMin = this.getCanvasCoordsForPoint(linesX[i], this.minY)
            let resXMax = this.getCanvasCoordsForPoint(linesX[i], this.maxY)

            if(labels){
              //write the numbers for the x-axis
              this.ctx.fillStyle= "black"
              this.ctx.fillText(`${Math.round(linesX[i]*10)/10}`, 
                  resXMin[0], resXMin[1]+15); 
              this.ctx.fillStyle= color
            }

            this.ctx.beginPath()
            this.ctx.moveTo(resXMax[0], resXMax[1])
            this.ctx.lineTo(resXMin[0], resXMin[1])
            this.ctx.stroke()
          }
        }
        for(i=0; i<linesY.length; i++){
          if(linesY[i] >= this.minY && linesY[i] <= this.maxY){
            //don't draw lines outside the plot
            let resYMin = this.getCanvasCoordsForPoint(this.minX, linesY[i])
            let resYMax = this.getCanvasCoordsForPoint(this.maxX, linesY[i])

            if(labels){
              //write the labels for the y-axis
              this.ctx.fillStyle= "black"
              this.ctx.fillText(`${Math.round(linesY[i]*10)/10}`, 
                  resYMin[0] - 15, resYMin[1] + 4); 
              this.ctx.fillStyle= color
            }

            this.ctx.beginPath()
            this.ctx.moveTo(resYMax[0], resYMax[1])
            this.ctx.lineTo(resYMin[0], resYMin[1])
            this.ctx.stroke()
          }

        }
      },
      plotDataPoints(){

        this.ctx.globalCompositeOperation = 'lighter'
        let size = 8
        for(var i=0; i<3; i++){
          for(var j=0; j<3; j++){
            let point = this.data.data[i][j]
            if(point.hu!==undefined){
              //draw the outer marker 
              let baseX = this.hSep*(j - 1) - this.offsetX
              let baseY = this.vSep*(1 - i) - this.offsetY
              var x = baseX + point.hu
              var y = baseY + point.vu

              let resO = this.getCanvasCoordsForPoint(x, y)
              x = resO[0]
              y = resO[1]

              this.ctx.beginPath()
              this.ctx.arc(x, y, size, 0, 2*Math.PI)

              this.ctx.fillStyle = `rgb(${this.data.colors[0][0]}, 
                                        ${this.data.colors[0][1]}, 
                                        ${this.data.colors[0][2]})`

              this.ctx.fill()

              //draw the inner marker
              let resI = this.getCanvasCoordsForPoint(baseX, baseY)
              x = resI[0]
              y = resI[1]

              this.ctx.beginPath()
              this.ctx.arc(x, y, size/1.3, 0, 2*Math.PI)

              this.ctx.fillStyle = `rgb(${this.data.colors[1][0]}, 
                                        ${this.data.colors[1][1]}, 
                                        ${this.data.colors[1][2]})`

              this.ctx.fill()


            }
          }
        }
      },
      addPlotLabels(){
        this.ctx.font = "14px Helvetica";
        this.ctx.textAlign = "center"
        this.ctx.globalCompositeOperation = 'source-over'
        this.ctx.fillStyle = "black"

        var units = "Degrees"
        if(this.data.units == 1){
          units = "Prism Dioptres"
        }

        let resH = this.getCanvasCoordsForPoint(0, this.minY);
        this.ctx.fillText(units, resH[0], resH[1] + 30); 

        let resV = this.getCanvasCoordsForPoint(this.minX, 0);
        this.ctx.translate(resV[0] - 30, resV[1])
        this.ctx.rotate(-90*Math.PI/180)
        this.ctx.fillText(units, 0, 0); 
        this.ctx.rotate(90*Math.PI/180)
        this.ctx.translate(-(resV[0] - 30), -resV[1])

      },
      downloadPlot(name){
        var element = document.createElement('a');
        let image = this.ctx.canvas.toDataURL("image/jpg")
        element.href = image
        element.download = name + '.jpg'

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
      }
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
    }
    div.container{
        margin:0px;
        width:100%;

        padding:0;

        color:black;
        text-align:center;
    }
</style>
