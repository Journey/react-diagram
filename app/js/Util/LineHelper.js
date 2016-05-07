/**
 * Line Helper. used to log some temp information for draw lines, and provide some helper operations
 * @returns {Object} Line Helper methods
 */
export const LineHelper = (() => {
    let _startInfo = {
        elementKey: null,
        position: null
    };
    return {
        /**
         * wrap line start/end point info into a certain constructor
         * @param {Object} evt the react Event object
         * @returns {Object} oContext  contain type/id proerties
         */
        portInfo(elementKey, position) {
                return {
                    elementKey, position
                };
            },
            logStartInfo(key, position) {
                _startInfo = this.portInfo(key, position);
            },
            getStartInfo() {
                return _startInfo;
            },
            clearStartInfo() {
                _startInfo = this.portInfo(null, null);
            },
            isSamePort(startPort, endPort) {
                if (startPort.elementKey !== undefined && startPort.elementKey !== endPort.elementKey) {
                    return false;
                };
                return true;
            },
            getPath(startPoint, endPoint) {
                return `M${startPoint.x} ${startPoint.y} L${endPoint.x} ${endPoint.y} Z`;
            },
            /**
             * get the hover rect of the path
             * @param {string} path only composed by M L Z e.g 'M250 145 L360 145 Z'
             */
            getPathHoverRect(sPath) {
                let points = sPath.split(/[A-Z]/);
                //
                points = points.filter((value) => {
                    return value !== "";
                });
                //["22 33 ","33 44"] ->[[22,33],[33,44]]
                points = points.map((sPoints) => {
                    sPoints = sPoints.trim();
                    let aPoint = sPoints.split(/\s/);
                    return [parseInt(aPoint[0]), parseInt(aPoint[1])];
                });

                return RectHelper.getRectPathByPoints(points);
            }
    };
})();

//todo
export const RectHelper = (() => {
    const VERTICAL_TYPE = "Verticle Type";
    const HORIZONTAL_TYPE = "Horizontal Type";
    const UP_LINE = "Up Line";
    const DOWN_LINE = "Down Line";

    return {
        /**
         * get the rect area 
         * @param {} aPoints
         */
        getRectPathByPoints: (aPoints) => {
            let aUpArea = [],
                aDownArea = [];
            let sPath = "M",
                temp;
            for (let index = 0, length = aPoints.length; index < length - 1; index++) {
                temp = RectHelper.getRectPoints(aPoints[index], aPoints[index + 1]);
                aUpArea = aUpArea.concat(temp.up);
                aDownArea = aDownArea.concat(temp.down);
            }
            aUpArea.forEach((aPoint) => {
                sPath = sPath + aPoint[0] + " " + aPoint[1] + "L";
            });
            for (let len = aDownArea.length, inx = len; inx > 0; inx--) {
                temp = aDownArea[inx - 1];
                sPath = sPath + temp[0] + " " + temp[1] + "L";
            }
            sPath = sPath + aUpArea[0][0] + " " + aUpArea[0][1] + "Z";
            return sPath;
        },
        getLineType: (aStartPoint, aEndPoint) => {
            let deltaX = aEndPoint[0] - aStartPoint[0];
            let deltaY = aEndPoint[1] - aStartPoint[1];
            if (deltaX == 0) {
                return VERTICAL_TYPE;
            }
            if (deltaY == 0) {
                return HORIZONTAL_TYPE;
            }
            if (deltaY / deltaX > 0) {
                return UP_LINE;
            }
            return DOWN_LINE;
        },
        getRectPoints: (aStartPoint, aEndPoint) => {
            let lineDirction = RectHelper.getLineType(aStartPoint, aEndPoint);
            let [startX, startY] = aStartPoint;
            let [endX, endY] = aEndPoint;
            let aUpArea = [];
            let aDownArea = [];
            let dimension = 6;
            switch (lineDirction) {
                case UP_LINE:
                    aUpArea.push([startX - dimension, startY + dimension]);
                    aUpArea.push([endX - dimension, endY + dimension]);
                    aDownArea.push([startX + dimension, startY - dimension]);
                    aDownArea.push([endX + dimension, endY - dimension]);
                    break;
                case DOWN_LINE:
                    aUpArea.push([startX + dimension, startY + dimension]);
                    aUpArea.push([endX + dimension, endY + dimension]);
                    aDownArea.push([startX - dimension, startY - dimension]);
                    aDownArea.push([endX - dimension, endY - dimension]);
                    break;
                case HORIZONTAL_TYPE:
                    aUpArea.push([startX, startY + dimension]);
                    aUpArea.push([endX, endY + dimension]);
                    aDownArea.push([startX, startY - dimension]);
                    aDownArea.push([endX, endY - dimension]);
                    break;
                case VERTICAL_TYPE:
                    aUpArea.push([startX + dimension, startY]);
                    aUpArea.push([endX + dimension, endY]);
                    aDownArea.push([startX - dimension, startY]);
                    aDownArea.push([endX - dimension, endY]);
                    break;
            }
            return {
                up: aUpArea,
                down: aDownArea
            };
        }
    };
})();

