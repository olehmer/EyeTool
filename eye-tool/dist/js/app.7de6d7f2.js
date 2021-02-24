(function(t){function i(i){for(var s,o,r=i[0],c=i[1],l=i[2],u=0,h=[];u<r.length;u++)o=r[u],Object.prototype.hasOwnProperty.call(n,o)&&n[o]&&h.push(n[o][0]),n[o]=0;for(s in c)Object.prototype.hasOwnProperty.call(c,s)&&(t[s]=c[s]);d&&d(i);while(h.length)h.shift()();return a.push.apply(a,l||[]),e()}function e(){for(var t,i=0;i<a.length;i++){for(var e=a[i],s=!0,r=1;r<e.length;r++){var c=e[r];0!==n[c]&&(s=!1)}s&&(a.splice(i--,1),t=o(o.s=e[0]))}return t}var s={},n={app:0},a=[];function o(i){if(s[i])return s[i].exports;var e=s[i]={i:i,l:!1,exports:{}};return t[i].call(e.exports,e,e.exports,o),e.l=!0,e.exports}o.m=t,o.c=s,o.d=function(t,i,e){o.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:e})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,i){if(1&i&&(t=o(t)),8&i)return t;if(4&i&&"object"===typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(o.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&i&&"string"!=typeof t)for(var s in t)o.d(e,s,function(i){return t[i]}.bind(null,s));return e},o.n=function(t){var i=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(i,"a",i),i},o.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},o.p="/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],c=r.push.bind(r);r.push=i,r=r.slice();for(var l=0;l<r.length;l++)i(r[l]);var d=c;a.push([0,"chunk-vendors"]),e()})({0:function(t,i,e){t.exports=e("56d7")},"034f":function(t,i,e){"use strict";e("85ec")},"0999":function(t,i,e){"use strict";e("a574")},"1e96":function(t,i,e){},"25ea":function(t,i,e){},"2d09":function(t,i,e){"use strict";e("a825")},"3e65":function(t,i,e){"use strict";e("25ea")},"56d7":function(t,i,e){"use strict";e.r(i);e("e260"),e("e6cf"),e("cca6"),e("a79d");var s=e("2b0e"),n=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{attrs:{id:"app"}},[e("Home")],1)},a=[],o=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"container"},[t.calibrating?t._e():e("div",{staticClass:"home"},[e("h3",[t._v("Data")]),e("div",{staticClass:"button top-left",on:{click:function(i){t.calibrating=!0}}},[t._v(" "+t._s(t.calibrated?"Recalibrate":"Calibrate")+" ")]),t.calibrated?t._e():e("div",{staticClass:"needs-cal"},[e("p",[t._v('You must calibrate this device before you can make measurements. Use the "Calibrate" button in the top left corner of the screen. The calibration will be stored locally (via cookies) on your device for future use. You can recalibrate at any time using the same button. ')])]),t.calibrated?e("div",{staticClass:"data-holder"},[e("div",{staticClass:"button",on:{click:t.addDataEntry}},[t._v("Add Data Entry")]),e("div",{staticClass:"table-holder"},t._l(t.dataReversed,(function(i,s){return e("div",{key:s,staticClass:"table-row",class:{odd:(s+1)%2},on:{click:function(i){return t.showDataDetails(t.data.length-1-s)}}},[e("p",[t._v(t._s(i.name))])])})),0)]):t._e(),e("div",{staticClass:"button top-right",on:{click:t.downloadData}},[t._v("Download Data")])]),t.calibrating?e("Calibrate",{attrs:{ppiIn:t.ppi,colorsIn:t.colors,sizeIn:t.size,distIn:t.dist,unitsIn:t.units},on:{setPPI:function(i){t.ppi=i},setColors:function(i){t.colors=i},setSize:function(i){t.size=i},setDistance:function(i){t.dist=i},setUnits:function(i){t.units=i},calibrationDone:function(i){return t.calibrationEnded()}}}):t._e(),t.dataDetails?e("DataDetails",{staticClass:"data-details-container",attrs:{dataIn:t.currentData,ppi:t.ppi,size:t.size,colors:t.colors,dist:t.dist,units:t.units},on:{deleteEntry:t.deleteCurrentEntry,closeDetailView:function(i){t.dataDetails=!1}}}):t._e()],1)},r=[],c=(e("a434"),e("b0c0"),e("ac1f"),e("843c"),e("1276"),e("2909")),l=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"content-view"},[e("h3",[t._v("Calibration (step "+t._s(t.view)+" of 3)")]),t.view>1?e("div",{staticClass:"button top-left",on:{click:function(i){t.view--}}},[t._v("Back")]):t._e(),t.canContinue()?e("div",{staticClass:"button top-right",on:{click:function(i){t.view<3?t.view++:t.calibrationDone()}}},[t._v(" "+t._s(3==t.view?"Done":"Next")+" ")]):t._e(),1==t.view?e("PPI",{attrs:{ppiIn:t.ppiIn},on:{setPPI:function(i){return t.updatePPI(i)}}}):t._e(),2==t.view?e("Colors",{attrs:{colorsIn:t.colors,sizeIn:t.size},on:{setColors:function(i){return t.updateColors(i)},setSize:function(i){return t.updateSize(i)}}}):t._e(),3==t.view?e("Distance",{attrs:{distIn:t.dist,unitsIn:t.units},on:{setDistance:function(i){return t.updateDist(i)},setUnits:function(i){return t.updateUnits(i)}}}):t._e()],1)},d=[],u=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"container"},[e("h3",[t._v("Set the Screen Pixel Density")]),e("h3",{staticClass:"selector",class:{active:0==t.method},on:{click:function(i){return t.setMethod(0)}}},[t._v("Enter PPI")]),e("h3",{staticClass:"selector",class:{active:1==t.method},on:{click:function(i){return t.setMethod(1)}}},[t._v("Manually Measure")]),e("canvas",{attrs:{id:"canvas_ppi"}},[t._v(" Your browser doesn't support HTML canvas. Please upgrade to a newer browser. ")]),0==t.method?e("div",{staticClass:"method"},[e("p",[t._v("The pixels per inch (PPI) of the screen is:")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.ppi,expression:"ppi"}],attrs:{placeholder:"pixels per inch"},domProps:{value:t.ppi},on:{input:[function(i){i.target.composing||(t.ppi=i.target.value)},t.updateWidth]}}),e("span",{staticStyle:{"padding-left":"10px"}},[t._v("PPI.")]),e("p",[t._v('If the PPI is correct, the red line above should measure exactly 25.4 mm (1 inch) in width. Note that mobile phones may require you to enter the dots per inch (DPI) instead of PPI. A common PPI for 1080p computer screens is 96. If you\'re unsure, click "Manually Measure" above to manually calibrate.')])]):t._e(),1==t.method?e("div",{staticClass:"method"},[e("p",[t._v("Using a ruler, the green line above is: ")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.line_width,expression:"line_width"}],attrs:{placeholder:"line width in mm"},domProps:{value:t.line_width},on:{input:[function(i){i.target.composing||(t.line_width=i.target.value)},t.updatePPI]}}),e("span",{staticStyle:{"padding-left":"10px"}},[t._v("millimeters wide.")]),e("p",[t._v("From your measurement, the PPI/DPI of your screen is: "+t._s(t.ppi))])]):t._e()])},h=[],p={props:["ppiIn"],data:function(){return{canvas:null,ctx:null,ppi:null,ppi_default:96,line_width:null,method:0}},mounted:function(){this.ppi=this.ppiIn,this.setupCanvas(),this.init()},methods:{setMethod:function(t){this.method=t,this.setupCanvas(),this.init()},setupCanvas:function(){this.canvas=document.getElementById("canvas_ppi"),window.onresize=this.init,this.ctx=this.canvas.getContext("2d")},init:function(){this.ctx.canvas.width=window.innerWidth,this.ctx.canvas.height=20;var t=1==this.method?"green":"red",i=0;i=null===this.ppi||1==this.method?this.ppi_default:parseInt(this.ppi);var e={};e.x=this.ctx.canvas.width/2-i/2,e.y=this.ctx.canvas.height/2,this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height),this.ctx.beginPath(),this.ctx.moveTo(e.x,e.y),this.ctx.lineTo(e.x+i,e.y),this.ctx.strokeStyle=t,this.ctx.lineWidth=5,this.ctx.stroke()},updateWidth:function(){this.init(),this.$emit("setPPI",this.ppi)},updatePPI:function(){this.line_width>0?this.ppi=Math.round(this.ppi_default/this.line_width*25.4):this.ppi=null,this.$emit("setPPI",this.ppi)}}},v=p,f=(e("3e65"),e("2877")),m=Object(f["a"])(v,u,h,!1,null,"2097905a",null),_=m.exports,g=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"container"},[e("h3",[t._v("Adjust Colors and Size for Your Glasses and Screen")]),e("canvas",{attrs:{id:"canvas_color"}},[t._v(" Your browser doesn't support HTML canvas. Please upgrade to a newer browser. ")]),e("div",[e("div",{staticClass:"slide-cont"},[e("p",[t._v("Set the size of the circles:")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.size,expression:"size"}],attrs:{type:"range",min:"10",max:"200"},domProps:{value:t.size},on:{input:function(i){return t.drawCircles()},__r:function(i){t.size=i.target.value}}})])]),t._l(t.colors,(function(i,s){return e("div",{key:s,staticClass:"slide-cont"},[e("h3",[t._v(t._s(0==s?"Green":"Red")+" Circle RGB")]),t._l(3,(function(s){return e("div",{key:s},[e("p",[t._v(t._s(t.colorNames[s-1])+" Component:")]),e("input",{directives:[{name:"model",rawName:"v-model",value:i[s-1],expression:"color[j-1]"}],staticClass:"slider",attrs:{type:"range",min:"0",max:"255"},domProps:{value:i[s-1]},on:{input:function(i){return t.drawCircles()},__r:function(e){return t.$set(i,s-1,e.target.value)}}})])}))],2)}))],2)},b=[],w=(e("99af"),e("cb29"),{props:["colorsIn","sizeIn"],data:function(){return{canvas:null,ctx:null,colors:[[0,128,0],[128,0,0]],colorNames:["Red","Green","Blue"],size:105}},mounted:function(){this.colors=this.colorsIn,null!==this.sizeIn&&(this.size=this.sizeIn),this.setupCanvas()},methods:{setupCanvas:function(){window.onresize=this.setupCanvas,this.canvas=document.getElementById("canvas_color"),this.ctx=this.canvas.getContext("2d");var t=window.innerWidth-20;t>500&&(t=window.innerWidth/2),this.ctx.canvas.width=t,this.ctx.canvas.height=.625*t,this.ctx.globalCompositeOperation="lighter",this.drawCircles()},drawCircles:function(){var t=this.ctx.canvas.width,i=this.ctx.canvas.height;this.ctx.clearRect(0,0,t,i),this.ctx.beginPath(),this.ctx.arc(t/2,i/2,this.size,0,2*Math.PI),this.ctx.moveTo(t/2-this.size,i/2),this.ctx.lineTo(t/2-this.size,i/2),this.ctx.strokeStyle="rgb(".concat(this.colors[0][0],", \n                                  ").concat(this.colors[0][1],", \n                                  ").concat(this.colors[0][2],")"),this.ctx.lineWidth=this.size/2,this.ctx.stroke(),this.ctx.beginPath(),this.ctx.arc(t/2,i/2,this.size/2,0,2*Math.PI),this.ctx.fillStyle="rgb(".concat(this.colors[1][0],", \n                                ").concat(this.colors[1][1],", \n                                ").concat(this.colors[1][2],")"),this.ctx.fill(),this.$emit("setColors",this.colors),this.$emit("setSize",this.size)}}}),C=w,x=(e("dea8"),Object(f["a"])(C,g,b,!1,null,"cd7aa5b4",null)),y=x.exports,I=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"container"},[e("h3",[t._v("Configure the Viewing Distance and Units")]),e("div",{staticClass:"text-holder"},[e("p",[t._v("In meters, the distance between the patient and the screen is:")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.dist,expression:"dist"}],attrs:{placeholder:"distance"},domProps:{value:t.dist},on:{input:[function(i){i.target.composing||(t.dist=i.target.value)},t.updateDistance]}})]),e("div",{staticClass:"text-holder"},[e("p",[t._v("For measurements, show results in:")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.units,expression:"units"}],attrs:{type:"radio",id:"degrees",value:"0"},domProps:{checked:t._q(t.units,"0")},on:{change:[function(i){t.units="0"},t.updateUnits]}}),e("label",{attrs:{for:"degrees"}},[t._v("Degrees")]),e("br"),e("input",{directives:[{name:"model",rawName:"v-model",value:t.units,expression:"units"}],attrs:{type:"radio",id:"pd",value:"1"},domProps:{checked:t._q(t.units,"1")},on:{change:[function(i){t.units="1"},t.updateUnits]}}),e("label",{attrs:{for:"pd"}},[t._v("Prism Dioptres")])])])},D=[],P={props:["distIn","unitsIn"],data:function(){return{dist:null,units:null}},mounted:function(){this.dist=this.distIn,this.units=this.unitsIn,console.log(this.units)},methods:{updateDistance:function(){this.$emit("setDistance",this.dist)},updateUnits:function(){this.$emit("setUnits",this.units)}}},M=P,k=(e("7067"),Object(f["a"])(M,I,D,!1,null,"291c4ebd",null)),z=k.exports,T={components:{PPI:_,Colors:y,Distance:z},props:["ppiIn","sizeIn","colorsIn","distIn","unitsIn"],data:function(){return{ppi:null,colors:[[0,128,0],[128,0,0]],size:null,dist:null,units:null,view:1}},mounted:function(){this.ppi=this.ppiIn,this.size=this.sizeIn,null!==this.colorsIn&&(this.colors=this.colorsIn),this.dist=this.distIn,this.units=this.unitsIn},methods:{canContinue:function(){return 1==this.view&&null!==this.ppi&&this.ppi>0||(2==this.view||3==this.view&&null!==this.dist&&this.dist>0&&null!==this.units)},updatePPI:function(t){this.ppi=t,this.$emit("setPPI",t),this.ppi>0&&null!==this.ppi?this.canContinue[0]=!0:this.canContinue[0]=!1},updateSize:function(t){this.size=t,this.$emit("setSize",t)},updateColors:function(t){this.colors=t,this.$emit("setColors",t)},updateDist:function(t){this.dist=t,this.$emit("setDistance",t),this.distAndUnitsDone()},updateUnits:function(t){this.units=t,this.$emit("setUnits",t),this.distAndUnitsDone()},distAndUnitsDone:function(){null!==this.units&&null!==this.dist&&this.dist>0?this.canContinue[2]=!0:this.canContinue[2]=!1},calibrationDone:function(){this.$emit("calibrationDone")}}},A=T,E=(e("7f4a"),Object(f["a"])(A,l,d,!1,null,null,null)),S=E.exports,$=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"container"},[t.showTool?t._e():e("div",[e("div",{staticClass:"button top-left",on:{click:function(i){t.confirmDelete=!0}}},[t._v(" Delete Entry ")]),t.dataAll.name&&t.dataAll.name.length>0?e("div",{staticClass:"button top-right",on:{click:t.closeDetailView}},[t._v(" Save ")]):t._e(),e("input",{directives:[{name:"model",rawName:"v-model",value:t.dataAll.name,expression:"dataAll.name"}],staticClass:"text",attrs:{placeholder:"name this dataset"},domProps:{value:t.dataAll.name},on:{input:function(i){i.target.composing||t.$set(t.dataAll,"name",i.target.value)}}}),t.dataAll.name&&t.dataAll.name.length>0?e("div",[e("div",[e("div",{staticClass:"check-holder"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.inverted,expression:"inverted"}],staticClass:"check",attrs:{type:"checkbox",id:"invertbox"},domProps:{checked:Array.isArray(t.inverted)?t._i(t.inverted,null)>-1:t.inverted},on:{change:function(i){var e=t.inverted,s=i.target,n=!!s.checked;if(Array.isArray(e)){var a=null,o=t._i(e,a);s.checked?o<0&&(t.inverted=e.concat([a])):o>-1&&(t.inverted=e.slice(0,o).concat(e.slice(o+1)))}else t.inverted=n}}}),e("label",{attrs:{for:"invertbox"}},[t._v("Invert colors")])]),t.smallScreen?e("div",{staticClass:"check-holder"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.useMobile,expression:"useMobile"}],staticClass:"check",attrs:{type:"checkbox",id:"mobilebox"},domProps:{checked:Array.isArray(t.useMobile)?t._i(t.useMobile,null)>-1:t.useMobile},on:{change:function(i){var e=t.useMobile,s=i.target,n=!!s.checked;if(Array.isArray(e)){var a=null,o=t._i(e,a);s.checked?o<0&&(t.useMobile=e.concat([a])):o>-1&&(t.useMobile=e.slice(0,o).concat(e.slice(o+1)))}else t.useMobile=n}}}),e("label",{attrs:{for:"mobilebox"}},[t._v("Use Mobile Mode")])]):t._e()]),t.useMobile?e("p",[t._v(" Click a square below to launch the tool for that position. ")]):t._e(),t.useMobile?t._e():e("p",[t._v(" Click the grid below to launch the tool for all positions. ")]),void 0!==t.dataAll.data?e("div",{staticClass:"data-container"},[e("div",{class:{clickable:!t.useMobile},staticStyle:{display:"inline-block"},on:{click:function(i){return t.launchTool()}}},t._l(3,(function(i){return e("div",{key:i,staticClass:"data-row"},t._l(3,(function(s){return e("div",{key:s,staticClass:"data-entry",class:{clickable:t.useMobile},on:{click:function(e){return t.launchTool(i-1,s-1)}}},[e("p",{staticClass:"corner-label"},[t._v(t._s(i)+","+t._s(s))]),e("div",{staticClass:"show-data-values"},[void 0!==t.dataAll.data[i-1][s-1].hu?e("p",{staticClass:"data"},[t._v(" H: "+t._s(t.dataAll.data[i-1][s-1].hu)),0==t.units?e("span",[t._v("° ")]):e("span",[e("sup",[t._v("Δ")])])]):e("p",{staticClass:"data"},[t._v(" H: ")]),void 0!==t.dataAll.data[i-1][s-1].vu?e("p",{staticClass:"data"},[t._v(" V: "+t._s(t.dataAll.data[i-1][s-1].vu)),0==t.units?e("span",[t._v("° ")]):e("span",[e("sup",[t._v("Δ")])])]):e("p",{staticClass:"data"},[t._v(" V: ")]),void 0!==t.dataAll.data[i-1][s-1].tu?e("p",{staticClass:"data"},[t._v(" T: "+t._s(t.dataAll.data[i-1][s-1].tu)),0==t.units?e("span",[t._v("° ")]):e("span",[e("sup",[t._v("Δ")])])]):e("p",{staticClass:"data"},[t._v(" T: ")])])])})),0)})),0)]):t._e(),e("p",{staticClass:"data"},[t._v("V is the measured vertical offset in "+t._s(0==t.units?"degrees":"prism dioptres")+".")]),e("p",{staticClass:"data"},[t._v("H is the measured horizontal offset in "+t._s(0==t.units?"degrees":"prism dioptres")+".")]),e("p",{staticClass:"data"},[t._v("T is the total measured offset (hypotenuse) in "+t._s(0==t.units?"degrees":"prism dioptres")+".")]),t.confirmDelete?e("div",{staticClass:"confirm-delete-container"}):t._e(),t.confirmDelete?e("div",{staticClass:"confirm-popup"},[e("h3",[t._v("Confirm Delete")]),e("p",[t._v("Are you sure you want to delete this entry and all its data? This can't be undone.")]),e("div",{staticClass:"button delete-buttons cancel",on:{click:function(i){t.confirmDelete=!1}}},[t._v(" Cancel ")]),e("div",{staticClass:"button delete-buttons yes",on:{click:t.deleteEntry}},[t._v(" Yes ")])]):t._e()]):e("div",[e("p",[t._v("You must name this dataset before you can make measurements.")])])]),t._v(" "),t.showTool&&t.useMobile?e("Tool",{attrs:{ppiIn:t.ppi,size:t.size,colors:t.colors,distIn:t.dist,units:t.units,ind:t.ind,data:t.dataAll,invert:t.inverted}}):t._e(),void 0!==t.dataAll.data&&t.showTool&&!t.useMobile?e("div",{staticClass:"tool-container"},t._l(3,(function(i){return e("div",{key:i,staticClass:"tool-row"},t._l(3,(function(s){return e("div",{key:s,staticClass:"tool-entry"},[e("Tool",{attrs:{ppiIn:t.ppi,size:t.size,colors:t.colors,distIn:t.dist,units:t.units,ind:{row:i-1,col:s-1},data:t.dataAll,invert:t.inverted}})],1)})),0)})),0):t._e(),t.showTool?e("div",{staticClass:"button top-right",on:{click:function(i){t.showTool=!1}}},[t._v(" Done ")]):t._e()],1)},U=[],O=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{ref:"cont_"+t.ind.row+"_"+t.ind.col,staticClass:"container"},[e("canvas",{ref:"canvas_"+t.ind.row+"_"+t.ind.col,attrs:{id:"canvas"}},[t._v(" Your browser doesn't support HTML canvas. Please upgrade to a newer browser. ")]),e("div",{staticClass:"footer"},[e("span",{staticClass:"footer"},[t._v(" H="+t._s(t.hu)),0==t.units?e("span",[t._v("°")]):e("span",[e("sup",[t._v("Δ")])])]),e("span",{staticClass:"footer"},[t._v(" V="+t._s(t.vu)),0==t.units?e("span",[t._v("°")]):e("span",[e("sup",[t._v("Δ")])])]),e("span",{staticClass:"footer"},[t._v(" T="+t._s(t.tu)),0==t.units?e("span",[t._v("°")]):e("span",[e("sup",[t._v("Δ")])])])]),e("div",{staticClass:"header"},[e("span",[t._v(" "+t._s(t.ind.row+1)+","+t._s(t.ind.col+1)+" ")])])])},j=[],Y={props:["ind","ppiIn","colors","size","distIn","units","data","invert"],data:function(){return{canvas:null,ctx:null,CLICK_DIST:0,red:{},green:{},startX:0,startY:0,vu:0,hu:0,tu:0,dragging:!1,dragged:!1,preset:!1,gc:0,rc:1,ppi:null,dist:null}},mounted:function(){this.invert&&(this.gc=1,this.rc=0),this.ppi=parseInt(this.ppiIn),this.dist=parseFloat(this.distIn),this.setupCanvas(),this.init()},methods:{setupCanvas:function(){var t="canvas_"+this.ind.row+"_"+this.ind.col;this.canvas=this.$refs[t],this.canvas.onmousedown=this.mouseDown,this.canvas.onmousemove=this.mouseMove,this.canvas.onmouseup=this.mouseUp,this.canvas.onmouseout=this.mouseUp,this.canvas.ontouchstart=this.touchDown,this.canvas.ontouchmove=this.touchMove,this.canvas.ontouchend=this.mouseUp,this.canvas.ontouchcancel=this.mouseUp,window.onresize=this.init,this.ctx=this.canvas.getContext("2d")},init:function(){this.resizeCanvas(),this.red.x=this.ctx.canvas.width/2,this.red.y=this.ctx.canvas.height/2,void 0===this.data.data[this.ind.row][this.ind.col].v?(this.data.data[this.ind.row][this.ind.col]={},this.green.x=this.ctx.canvas.width/2,this.green.y=this.ctx.canvas.height/2):(this.green.x=this.red.x+this.data.data[this.ind.row][this.ind.col].h,this.green.y=this.red.y-this.data.data[this.ind.row][this.ind.col].v),this.updateData(),this.ctx.globalCompositeOperation="lighter",this.drawCircles()},resizeCanvas:function(){var t="cont_"+this.ind.row+"_"+this.ind.col,i=this.$refs[t];void 0!==i&&(this.ctx.canvas.width=i.clientWidth,this.ctx.canvas.height=i.clientHeight,this.CLICK_DIST=.001*(this.ctx.canvas.width+this.ctx.canvas.height)/2)},drawCircles:function(){this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height),this.ctx.beginPath(),this.ctx.arc(this.green.x,this.green.y,this.size,0,2*Math.PI),this.ctx.moveTo(this.green.x-this.size,this.green.y),this.ctx.lineTo(this.green.x-this.size,this.green.y),this.ctx.strokeStyle="rgb(".concat(this.colors[this.gc][0],", \n                                  ").concat(this.colors[this.gc][1],", \n                                  ").concat(this.colors[this.gc][2],")"),this.ctx.lineWidth=this.size/2,this.ctx.stroke(),this.ctx.beginPath(),this.ctx.arc(this.red.x,this.red.y,this.size/2,0,2*Math.PI),this.ctx.fillStyle="rgb(".concat(this.colors[this.rc][0],", \n                                ").concat(this.colors[this.rc][1],", \n                                ").concat(this.colors[this.rc][2],")"),this.ctx.fill()},mouseDown:function(t){t.preventDefault(),t.stopPropagation(),this.dragging=!0,this.startX=parseInt(t.clientX),this.startY=parseInt(t.clientY)},touchDown:function(t){t.preventDefault(),t.stopPropagation(),t.touches.length>=1&&(this.dragging=!0),this.startX=parseInt(t.touches[0].clientX),this.startY=parseInt(t.touches[0].clientY)},move:function(t,i){var e=t-this.startX,s=i-this.startY;(Math.abs(e)>0||Math.abs(s)>0)&&(this.dragged=!0),this.startX=t,this.startY=i,this.dragging&&(this.green.x+=e,this.green.y+=s,this.drawCircles(),this.updateData())},mouseMove:function(t){t.preventDefault(),t.stopPropagation();var i=parseInt(t.clientX),e=parseInt(t.clientY);this.move(i,e)},touchMove:function(t){t.preventDefault(),t.stopPropagation();var i=parseInt(t.touches[0].clientX),e=parseInt(t.touches[0].clientY);this.move(i,e)},mouseUp:function(t){t.preventDefault(),t.stopPropagation(),this.dragging=!1,this.dragged=!1},updateData:function(){var t=this.red.y-this.green.y,i=-1*(this.red.x-this.green.x);this.data.data[this.ind.row][this.ind.col].v=t,this.data.data[this.ind.row][this.ind.col].h=i;var e=t/this.ppi*25.4,s=i/this.ppi*25.4,n=Math.sqrt(Math.pow(e,2)+Math.pow(s,2));if(0==this.units){var a=Math.atan(n/this.dist/1e3);this.tu=Math.round(1800*a/Math.PI)/10;var o=Math.atan(e/this.dist/1e3);this.vu=Math.round(1800*o/Math.PI)/10;var r=Math.atan(s/this.dist/1e3);this.hu=Math.round(1800*r/Math.PI)/10}else this.tu=Math.round(n/this.dist)/10,this.vu=Math.round(e/this.dist)/10,this.hu=Math.round(s/this.dist)/10;this.data.data[this.ind.row][this.ind.col].tu=this.tu,this.data.data[this.ind.row][this.ind.col].vu=this.vu,this.data.data[this.ind.row][this.ind.col].hu=this.hu}}},N=Y,H=(e("2d09"),Object(f["a"])(N,O,j,!1,null,"3804366a",null)),V=H.exports,R={components:{Tool:V},props:["dataIn","ppi","size","colors","dist","units"],data:function(){return{dataAll:{},confirmDelete:!1,ind:{},showTool:!1,inverted:!1,useMobile:!1,smallScreen:!1,forceDesktop:!1}},mounted:function(){this.dataAll=this.dataIn,window.onresize=this.configureLayout,this.configureLayout()},methods:{configureLayout:function(){window.innerWidth<500?(this.useMobile=!0,this.smallScreen=!0):(this.useMobile=!1,this.smallScreen=!1)},deleteEntry:function(){this.$emit("deleteEntry")},closeDetailView:function(){this.$emit("closeDetailView")},launchTool:function(t,i){this.useMobile&&void 0!==t?(this.ind.row=t,this.ind.col=i,this.showTool=!0):this.useMobile||(this.showTool=!0)}}},W=R,X=(e("a436"),Object(f["a"])(W,$,U,!1,null,"3d9b1131",null)),L=X.exports,q={components:{Calibrate:S,DataDetails:L},data:function(){return{calibrated:!1,calibrating:!1,ppi:null,colors:null,size:null,dist:null,units:null,invertColor:!1,data:[],currentIndex:null,currentData:null,dataDetails:!1,cname:"cal"}},mounted:function(){if(document.cookie.length>0){var t=decodeURIComponent(document.cookie),i=JSON.parse(t.split("=")[1]);this.ppi=i.ppi,this.colors=i.colors,this.size=i.size,this.dist=i.dist,this.units=i.units,this.calibrated=!0}},computed:{dataReversed:function(){return Object(c["a"])(this.data).reverse()}},methods:{calibrationEnded:function(){this.calibrating=!1,null!==this.ppi&&null!==this.colors&&null!==this.size&&null!==this.dist&&null!==this.units&&(this.calibrated=!0,this.saveCalibration())},addDataEntry:function(){var t={name:"",data:[[{},{},{}],[{},{},{}],[{},{},{}]]};this.data.push(t),this.showDataDetails(this.data.length-1)},showDataDetails:function(t){this.currentIndex=t,this.currentData=this.data[t],this.dataDetails=!0},deleteCurrentEntry:function(){this.data.splice(this.currentIndex,1),this.dataDetails=!1},saveCalibration:function(){var t={};t.ppi=this.ppi,t.colors=this.colors,t.size=this.size,t.dist=this.dist,t.units=this.units;var i=encodeURIComponent(JSON.stringify(t)),e=new Date;e.setTime(e.getTime()+864e8);var s="expires="+e.toUTCString();document.cookie="cal="+i+";"+s+";samesite=Strict; secure;"},downloadData:function(){var t=new Date,i="Downloaded: "+t+"\n\n";i+="H is the horizontal offset.\n",i+="V is the vertical offset.\n",i+="T is the total offset (hypotenuse).\n\n",i+="Viewing distance was: "+this.dist+" meters.\n";var e=0==this.units?"degrees":"prism dioptres";i+="All table units are in "+e+".\n\n";for(var s=this.data,n=0;n<s.length;n++)for(var a=0;a<s[n].data.length;a++)for(var o=0;o<s[n].data[a].length;o++)s[n].data[a][o].vu=void 0===s[n].data[a][o].vu?"-":s[n].data[a][o].vu,s[n].data[a][o].hu=void 0===s[n].data[a][o].hu?"-":s[n].data[a][o].hu,s[n].data[a][o].tu=void 0===s[n].data[a][o].tu?"-":s[n].data[a][o].tu;for(var r=0;r<s.length;r++){i+="Measurement name: "+s[r].name+"\n",i+="".padEnd(49,"-")+"\n";for(var c=0;c<s[r].data.length;c++)i+="|"+(" H: "+s[r].data[c][0].hu).padEnd(15)+"|"+(" H: "+s[r].data[c][1].hu).padEnd(15)+"|"+(" H: "+s[r].data[c][2].hu).padEnd(15)+"|\n",i+="|"+(" V: "+s[r].data[c][0].vu).padEnd(15)+"|"+(" V: "+s[r].data[c][1].vu).padEnd(15)+"|"+(" V: "+s[r].data[c][2].vu).padEnd(15)+"|\n",i+="|"+(" T: "+s[r].data[c][0].tu).padEnd(15)+"|"+(" T: "+s[r].data[c][1].tu).padEnd(15)+"|"+(" T: "+s[r].data[c][2].tu).padEnd(15)+"|\n",i+="".padEnd(49,"-")+"\n";i+="\n\n"}var l=document.createElement("a");l.setAttribute("href","data:text/plain;charset=utf-8,"+encodeURIComponent(i)),l.setAttribute("download","data.txt"),l.style.display="none",document.body.appendChild(l),l.click(),document.body.removeChild(l)}}},B=q,G=(e("0999"),e("f19d"),Object(f["a"])(B,o,r,!1,null,"239593b5",null)),J=G.exports,F={name:"App",components:{Home:J},data:function(){return{view:1}},mounted:function(){},methods:{}},K=F,Q=(e("034f"),Object(f["a"])(K,n,a,!1,null,null,null)),Z=Q.exports;s["a"].config.productionTip=!1,new s["a"]({render:function(t){return t(Z)}}).$mount("#app")},7067:function(t,i,e){"use strict";e("f30a")},"7cd5":function(t,i,e){},"7f4a":function(t,i,e){"use strict";e("b37c")},"85ec":function(t,i,e){},a436:function(t,i,e){"use strict";e("7cd5")},a574:function(t,i,e){},a825:function(t,i,e){},b37c:function(t,i,e){},d729:function(t,i,e){},dea8:function(t,i,e){"use strict";e("1e96")},f19d:function(t,i,e){"use strict";e("d729")},f30a:function(t,i,e){}});
//# sourceMappingURL=app.7de6d7f2.js.map