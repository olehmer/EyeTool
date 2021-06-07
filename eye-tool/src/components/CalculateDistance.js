export default {
    methods: {
        getDistance(pixDist, viewDist, ppi, units) {
            /**
             * Calculate the distance in degrees or prism dioptres for a given 
             * pixel distance.
             *
             * Inputs:
             *  pixDist  - the distance in pixels
             *  viewDist - the distance to the viewer [meters]
             *  ppi      - the pixels per inch
             *  units    - the desired output units. 0 is degrees, 1 is prism
             *             dioptres
             *
             * Returns:
             *  dist - distance in degrees
             * */

            let pixelOffset_mm = pixDist/ppi*25.4
            let angle = Math.atan(pixelOffset_mm/viewDist/1000) //dist in m

            var dist = undefined

            if(units == 0){
                //degrees
                dist = angle*180/Math.PI
            }
            else{
                //prism dioptres
                dist = 100*Math.tan(angle)
            }

            dist = Math.round(100*dist)/100
            return dist
        },
        getDistBetweenPoints(p1, p2, ppi){
            var total = ((p1.x - p2.x)**2 + (p1.y - p2.y)**2)**0.5 //meters
            let dist = total/ppi*25.4/1000 //meters
            return dist
        },
        getEyeOffset(viewDist, centerPos, offsetPos, markerPos, ppi, 
                            units){
            /**
             * Calculate the offset measurement for the outer (green) mark and
             * the inner (red) mark. Because the screen is flat, the distance 
             * is changing to the offset marker. 
             *
             * Inputs:
             *  viewDist - the viewing distance between the patient and the 
             *             center of the screen [meters]
             *  centerPos - an object with .x and .y defined that contains the 
             *              pixel coordinates for the center of the screen
             *  offsetPos - an object with .x and .y defined that contains the 
             *              pixel coordinates for the center (red) mark
             *  markerPos - an object with .x and .y defined that contains the
             *              pixel coordinates of the outer (green) mark
             *  ppi       - the pixels per inch (ppi) of the screen
             *  units     - the desired result units. 0 is degrees, 1 is prism
             *              doptres
             *
             * Returns:
             *  dist - an object containing .v and .h defined, which correspond
             *         to the horizontal and vertical offset in the specified
             *         unit
             **/
             

            //make new points for the H and V offsets
            let markerPosH = {}
            markerPosH.x = markerPos.x
            markerPosH.y = offsetPos.y

            let markerPosV = {}
            markerPosV.x = offsetPos.x
            markerPosV.y = markerPos.y

            let offsetToMarkH = this.getDistBetweenPoints(offsetPos, markerPosH, ppi)
            let offsetToMarkV = this.getDistBetweenPoints(offsetPos, markerPosV, ppi)


            let centerToOffset = this.getDistBetweenPoints(centerPos, offsetPos, ppi)
            let centerToH = this.getDistBetweenPoints(centerPos, markerPosH, ppi)
            let centerToV = this.getDistBetweenPoints(centerPos, markerPosV, ppi)

            let newViewDist = (viewDist**2 + centerToOffset**2)**0.5

            //units in degrees
            let sigmaH = (viewDist**2 + centerToH**2)**0.5
            let sigmaV = (viewDist**2 + centerToV**2)**0.5


            let alphaH = Math.acos( (newViewDist**2 + sigmaH**2 
                - offsetToMarkH**2)/(2*newViewDist*sigmaH) ) //radians

            let alphaV = Math.acos( (newViewDist**2 + sigmaV**2 
                - offsetToMarkV**2)/(2*newViewDist*sigmaV) ) //radians

            let dist = {}
            if(units == 0){
                //units in degrees
                dist.h = alphaH*180/Math.PI //degrees
                dist.v = alphaV*180/Math.PI //degrees
            }
            else{
                //prism dioptres
                dist.h = 100*Math.tan(alphaH)
                dist.v = 100*Math.tan(alphaV)

            }

            //correct the +/- as needed
            if(markerPos.x < offsetPos.x){
                dist.h = -1*dist.h
            }
            if(markerPos.y > offsetPos.y){
                dist.v = -1*dist.v
            }

            //round the result
            dist.h = Math.round(dist.h*100)/100
            dist.v = Math.round(dist.v*100)/100
           

            return dist
        }
    }
};
