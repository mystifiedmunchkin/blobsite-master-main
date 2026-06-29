import { SVG } from "https://esm.sh/@svgdotjs/svg.js";
import {
    randomBias,
    random
} from "https://esm.sh/@georgedoescode/generative-utils";
import { Delaunay } from "https://esm.sh/d3-delaunay@6";
import { polygonCentroid } from "https://esm.sh/d3";

var colors = ["rgba(166, 215, 187, 1)", "rgba(215, 242, 237, 1)", "rgba(137, 177, 154,1)", "rgba(158, 204, 177,1)"];

var RGBvalues = (function () {

    var _hex2dec = function (v) {
        return parseInt(v, 16)
    };

    var _splitHEX = function (hex) {
        var c;
        if (hex.length === 4) {
            c = (hex.replace('#', '')).split('');
            return {
                r: _hex2dec((c[0] + c[0])),
                g: _hex2dec((c[1] + c[1])),
                b: _hex2dec((c[2] + c[2]))
            };
        } else {
            return {
                r: _hex2dec(hex.slice(1, 3)),
                g: _hex2dec(hex.slice(3, 5)),
                b: _hex2dec(hex.slice(5))
            };
        }
    };

    var _splitRGB = function (rgb) {
        var c = (rgb.slice(rgb.indexOf('(') + 1, rgb.indexOf(')'))).split(',');
        var flag = false, obj;
        c = c.map(function (n, i) {
            return (i !== 3) ? parseInt(n, 10) : flag = true, parseFloat(n);
        });
        obj = {
            r: c[0],
            g: c[1],
            b: c[2]
        };
        if (flag) obj.a = c[3];
        return obj;
    };

    var color = function (col) {
        var slc = col.slice(0, 1);
        if (slc === '#') {
            return _splitHEX(col);
        } else if (slc.toLowerCase() === 'r') {
            return _splitRGB(col);
        } else {
            console.log('!Ooops! RGBvalues.color(' + col + ') : HEX, RGB, or RGBa strings only');
        }
    };

    return {
        color: color
    };
}());



    function sqr(x) {
        return x * x;
    }

    function dist2(v, w){
        return sqr(v[0] - w[0]) + sqr(v[1] - w[1]);
    }

    // p - point
    // v - start point of segment
    // w - end point of segment
    function distToSegmentSquared(p, v, w){
        var l2 = dist2(v, w);
        if (l2 === 0) return dist2(p, v);
        var t = ((p[0] - v[0]) * (w[0] - v[0]) + (p[1] - v[1]) * (w[1] - v[1])) / l2;
        t = Math.max(0, Math.min(1, t));
        return dist2(p, [v[0] + t * (w[0] - v[0]), v[1] + t * (w[1] - v[1])]);
    }

    // p - point
    // v - start point of segment
    // w - end point of segment
    function distToSegment(p, v, w) {
        return Math.sqrt(distToSegmentSquared(p, v, w));
    }

const defaultOpts = {
    width: 1000,
    height: 1000,
    points: [],
    relaxIterations: 2
};
        const width = 1000
const height = 1000
    function createVoronoiGrid(opts) {


        opts = Object.assign({}, defaultOpts, opts);

        const delaunay = Delaunay.from(opts.points);
        const voronoi = delaunay.voronoi([0, 0, opts.width, opts.height]);

        for (let k = 0; k < opts.relaxIterations; k++) {
            for (let i = 0; i < delaunay.points.length; i += 2) {
                const cell = voronoi.cellPolygon(i >> 1);

                if (cell === null) continue;

                const x0 = delaunay.points[i];
                const y0 = delaunay.points[i + 1];

                const [x1, y1] = polygonCentroid(cell);

                delaunay.points[i] = x0 + (x1 - x0) * 1;
                delaunay.points[i + 1] = y0 + (y1 - y0) * 1;
            }

            voronoi.update();
        }

        return {
            cells: [...voronoi.cellPolygons()].map((points) => {
                return {
                    points,
                    r: getClosestEdgeToCentroid(points),
                    centroid: polygonCentroid(points)
                };
            })
        };
    }

    function getClosestEdgeToCentroid(points) {
        const centroid = polygonCentroid(points);
        const pointsSorted = sortPointsByAngle(centroid, points);

        let closest = distToSegment(centroid, pointsSorted[0], pointsSorted[1]);

        for (let i = 1; i < points.length - 1; i++) {
            if (points[i + 1]) {
                const dist = distToSegment(
                    centroid,
                    pointsSorted[i],
                    pointsSorted[i + 1]
                );
                if (dist < closest) {
                    closest = dist;
                }
            }
        }

        return closest;
    }

    function sortPointsByAngle(centroid, points) {
        const centerPoint = centroid;
        const sorted = points.slice(0);

        const sortByAngle = (p1, p2) => {
            return (
                (Math.atan2(p1[1] - centerPoint[1], p1[0] - centerPoint[0]) * 180) /
                Math.PI -
                (Math.atan2(p2[1] - centerPoint[1], p2[0] - centerPoint[0]) * 180) /
                Math.PI
            );
        };

        sorted.sort(sortByAngle);

        return sorted;
    }
const div = document.body.appendChild(document.createElement('div'));

const svg = SVG().viewbox(0, 0, width, height).addTo(div).fill("#000000").stroke({width:5, color:"#000000"});


        const numPoints = 512;

        const focus = {
            x: width / 2,
            y: height / 2
        };

        const points = [...Array(numPoints)].map(() => {
            return [
                randomBias(0, width, focus.x, 1),
                randomBias(0, height, focus.y, 1)
            ];
        });

        const voronoi = createVoronoiGrid({
            width,
            height,
            points,
            relaxIterations: 2
        });
        
        let allTraced = voronoi.cells.filter((cell) => {
            return random(0, 1) > 0.7 && cell.centroid[0] > 150 && cell.centroid[0] < width-150 && cell.centroid[1] > 150 && cell.centroid[1] < height-150;
        });

        trace();

    function trace() {
        
            var neighbour = [];
            var near = [];
            var previous =0;

        for (let n=0; n< allTraced.length ;n++) {
            const thisone = allTraced[n];
            neighbour = [];
            previous = 25424324;
            allTraced.forEach((cell) =>{
                let dist = dist2(thisone.centroid, cell.centroid);
                if (dist > 0) {
                    if (dist < previous) {
                        neighbour =cell.centroid;
                        previous = dist;
                    }
                }
            });


            
svg.line(thisone.centroid[0], thisone.centroid[1], neighbour[0], neighbour[1]).fill("none").stroke({width:4, color:colors[0]});


            }    allTraced.forEach((thisone) =>{
        let color = random(colors);
thisone.points.forEach((point) => {
                svg.circle(thisone.r).cx(point[0]).cy(point[1]).fill(color).stroke("none");
        });
        svg.circle(thisone.r*2).cx(thisone.centroid[0]).cy(thisone.centroid[1]).fill(color).stroke("none");});
    
}


    Coloris({
        onChange: (color, inputEl) => {
            colors = ["rgba(" + RGBvalues.color(color).r /3+"," + RGBvalues.color(color).g /3+ "," + RGBvalues.color(color).b /3+")",
                 "rgba(" + RGBvalues.color(color).r /2+ "," + RGBvalues.color(color).g/2 + "," + RGBvalues.color(color).b  /2+")",
                 "rgba(" + RGBvalues.color(color).r /1.5+ "," + RGBvalues.color(color).g /1.5+ "," + RGBvalues.color(color).b /1.5+ ")",
                  "rgba(" + RGBvalues.color(color).r + "," + RGBvalues.color(color).g + "," + RGBvalues.color(color).b + ")"];
            svg.clear();
            trace();
        }
    });


    /*
            let newColor = RGBvalues.color(color);
            function colorGetHue() {
                let darkest = Math.min(newColor.r, newColor.g, newColor.b);
                let lightest = Math.max(newColor.r, newColor.g, newColor.b);
                let isYellow = darkest == newColor.b;
                let isMagenta = darkest == newColor.g;
                let isCyan = darkest == newColor.r;
                let isRed = lightest == newColor.r;
                let isBlue = lightest == newColor.b;
                let isGreen = lightest == newColor.g;
                let isGrey = (newColor.b == newColor.g && newColor.g == newColor.r);
                let lightOrDark = lightest > 128;
                return { red: isRed, green: isGreen, blue: isBlue, magenta: isMagenta, yellow: isYellow, cyan: isCyan, grey: isGrey, light: lightOrDark };
            }

            let newColors = [];
            let newShade;
            let shade;
            function colorGetScheme() {
                let direction = 0;
                if (colorGetHue().light) {
                    direction = -0.5;
                } else direction = 0.5;
                if (!colorGetHue().grey) {
                    if (colorGetHue().red && colorGetHue().magenta) {
                        shade = (newColor.r - newColor.b) / 64;
                        newShade = {
                            r: newColor.r + 100 * direction,
                            g: newColor.g,
                            b: newColor.b + 100 * direction
                        };
                        newColors.push("rgba(" + newShade.r + "," + newShade.g + "," + newShade.b + ")");
                    }
                    if (colorGetHue().red && colorGetHue().yellow) {
                        shade = (newColor.g - newColor.r) / 64;
                        newShade = {
                            r: newColor.r + 100 * direction,
                            g: newColor.g + 100 * direction,
                            b: newColor.b
                        };
                        newColors.push("rgba(" + newShade.r + "," + newShade.g + "," + newShade.b + ")");
                    }
                    if (colorGetHue().green && colorGetHue().yellow) {
                        shade = (newColor.g - newColor.r) / 64;
                        newShade = {
                            r: newColor.r,
                            g: newColor.g + 100 * direction,
                            b: newColor.b + 100 * direction
                        };
                        newColors.push("rgba(" + newShade.r + "," + newShade.g + "," + newShade.b + ")");
                    }
                    if (colorGetHue().green && colorGetHue().cyan) {
                        shade = (newColor.g - newColor.b) / 64;
                        newShade = {
                            r: newColor.r,
                            g: newColor.g + 100 * direction,
                            b: newColor.b + 100 * direction
                        };
                        newColors.push("rgba(" + newShade.r + "," + newShade.g + "," + newShade.b + ")");
                    }
                    if (colorGetHue().blue && colorGetHue().magenta) {
                        shade = (newColor.b - newColor.r) / 64;
                        newShade = {
                            r: newColor.r + 100 * direction,
                            g: newColor.g,
                            b: newColor.b + 100 * direction
                        };
                        newColors.push("rgba(" + newShade.r + "," + newShade.g + "," + newShade.b + ")");
                    }
                    if (colorGetHue().blue && colorGetHue().cyan) {
                        shade = (newColor.b - newColor.g) / 64;
                        newShade = {
                            r: newColor.r,
                            g: newColor.g + 100 * direction,
                            b: newColor.b + 100 * direction
                        };
                        newColors.push("rgba(" + newShade.r + "," + newShade.g + "," + newShade.b + ")");
                    }

                } else {
                    newShade = {
                        r: newColor.r + 25,
                        g: newColor.g + 25,
                        b: newColor.b + 25
                    };
                    newColors.push("rgba(" + newShade.r + "," + newShade.g + "," + newShade.b + ")");
                }
                newColor = newShade;
            }
            colorGetScheme();
            colorGetScheme();
            colorGetScheme();*/