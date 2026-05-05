import { SVG } from "https://esm.sh/@svgdotjs/svg.js";
import {
    randomBias,
    random,
    randomSnap
} from "https://esm.sh/@georgedoescode/generative-utils";
import { Delaunay } from "https://esm.sh/d3-delaunay@6";
import { polygonCentroid } from "https://esm.sh/d3";

const width = 4000;
const height = 4000;

// Thanks Matt DesLauriers! https://gist.github.com/mattdesl/47412d930dcd8cd765c871a65532ffac
// Taken From:
// https://stackoverflow.com/questions/849211/shortest-distance-between-a-point-and-a-line-segment




function sqr(x) {
    return x * x;
}

function dist2(v, w) {
    return sqr(v[0] - w[0]) + sqr(v[1] - w[1]);
}

// p - point
// v - start point of segment
// w - end point of segment
function distToSegmentSquared(p, v, w) {
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
    width: 1024,
    height: 1024,
    points: [],
    relaxIterations: 8
};

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

const svg = SVG().viewbox(0, 0, width, height).addTo("body");

generate();


function generate() {
    svg.clear();

    svg.rect(width, height).fill("#ebebeb");

    const numPoints = random(96, 1200, true);

    const focus = {
        x: randomSnap(0, width, width / 2),
        y: randomSnap(0, height, height / 2)
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
        relaxIterations: random(1, 8, true)
    });

    const colors = ["#d4d6d6", "#f8f8f8", "#c1c6c6", "#f7f7f7"];

    svg.rect(width, height).fill("#ebebeb");

    voronoi.cells.forEach((cell) => {
        const choice = random(0, 2, true);

        switch (choice) {
            case 0:
                svg
                    .line(
                        cell.centroid[0] - cell.r / 4,
                        cell.centroid[1] - cell.r / 4,
                        cell.centroid[0] + cell.r / 4,
                        cell.centroid[1] + cell.r / 4
                    )
                    .stroke({
                        width: cell.r / 3,
                        color: random(colors)
                    })
                    .rotate(random(0, 360));
                break;
            case 1:
                svg.polygon(cell.points).fill(random(colors)).scale(0.75);

                break;
            case 2:
                if (random(0, 1) > 0.5) {
                    svg
                        .circle(cell.r)
                        .cx(cell.centroid[0])
                        .cy(cell.centroid[1])
                        .fill(random(colors));
                } else {
                    svg
                        .circle(cell.r)
                        .cx(cell.centroid[0])
                        .cy(cell.centroid[1])
                        .fill("none")
                        .stroke({
                            width: cell.r / 6,
                            color: random(colors)
                        });
                }

                break;
        }

    });
    // setInterval(() => {
    //     voronoi.cells.forEach((c) => {
    //         c.points.forEach((p) => {
    //             p.x += random(-10, 10);
    //             p.y += random(-10, 10)
    //         })
    //     });
    // }, 100);
}



document.querySelector("svg").setAttribute("style", "min-width:100%; min-height:100vh");