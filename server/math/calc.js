const math = require('mathjs')


var triangulate =(lat1, lon1, alt1, lat2, lon2, alt2, az1, el1, az2, el2)=>
{
    var RA = 6378137;

    el1 = el1 * math.pi / 180;
    el2 = el2 * math.pi / 180;
    var p1 = math.ctranspose([lat1 * RA, lon1 * RA * Math.cos(lat1), alt1]);

    console.log("p1", p1);
    var p2 = math.ctranspose([lat2 * RA, lon2 * RA * Math.cos(lat1), alt2]);
    console.log("p2", p2);
    

    var u1 = math.ctranspose([Math.cos(az1) * Math.cos(el1), Math.sin(az1) * Math.cos(el1), Math.sin(el1)]);
    console.log("u1", u1);
    

    var u2 = math.ctranspose([Math.cos(az2) * Math.cos(el2), Math.sin(az2) * Math.cos(el2), Math.sin(el2)]);
    console.log("u2", u2);
    

    var u11 = u1[0] * u1[0] + u1[1] * u1[1] + u1[2] * u1[2];
    console.log("u11", u11);
    

    var u12 = u1[0] * u2[0] + u1[1] * u2[1] + u1[2] * u2[2];
    console.log("u12", u12);
    

    var u22 = u2[0] * u2[0] + u2[1] * u2[1] + u2[2] * u2[2];
    console.log("u22", u22);
    

    var dp = math.subtract(p2, p1);

    console.log("dp", dp);;

    var x = [[u22, -u12], [-u12, u11]];
    console.log("x", x);;

    var r = math.divide(math.multiply([[u22, u12],[u12, u11]], [u1[0] * dp[0] + u1[1] * dp[1] + u1[2] * dp[2], -u2[0] * dp[0] - u2[1] * dp[1] - u2[2] * dp[2]]), u11 * u22 - math.pow(u12, 2));
    console.log("r", r);;

     var point = math.add(p1, math.multiply(u1, r[0]));

    console.log("point", point);;

    var geoPoint = [point[0]/RA, point[1]/RA/math.cos(lat1), point[2]];

    console.log("geoPoint,", geoPoint);

    return geoPoint;
};

module.exports = 
{
    triangulate,
};