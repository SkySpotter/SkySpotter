const math = require('mathjs')


var triangulate =(lat1, lon1, alt1, lat2, lon2, alt2, az1, el1, az2, el2)=>
{
    var RA = 6378137;

    var p1 = [lat1 * RA, lon1 * RA * Math.cos(lat1), alt1];

    console.log("p1", p1);
    var p2 = [lat2 * RA, lon2 * RA * Math.cos(lat2), alt2];
    console.log("p2", p2);
    

    var u1 = [Math.cos(az1) * Math.cos(el1), Math.sin(az1) * Math.cos(el1), Math.sin(el1)];
    console.log("u1", u1);
    

    var u2 = [Math.cos(az2) * Math.cos(el2), Math.sin(az2) * Math.cos(el2), Math.sin(el2)];
    console.log("u2", u2);
    

    var u11 = u1[0] * u1[0] + u1[1] * u1[1] + u1[2] * u1[2];
    console.log("u11", u11);
    

    var u12 = u1[0] * u2[0] + u1[1] * u2[1] + u1[2] * u2[2];
    console.log("u12", u12);
    

    var u22 = u2[0] * u2[0] + u2[1] * u2[1] + u2[2] * u2[2];
    console.log("u22", u22);
    

    var dp = [p2[0] -p1[0], p2[1] -p1[1], p2[2] -p1[2]];

    console.log("dp", dp);;

    var x = [[u22, -u12], [-u12, u11]];
    console.log("x", x);;

    var r = math.divide(math.multiply([[u22, -u12],[-u12, u11]], [u1[0] * dp[0] + u1[1] * dp[1] + u1[2] * dp[2], u2[0] * dp[0] + u2[1] * dp[1] + u2[2] * dp[2]]), u11 * u22 - math.pow(u12, 2));
    console.log("r", r);;

    console.log("r[0]", r[0]);
    
    var point = math.add(p1, math.multiply(u1, r[0]));

    console.log("point", point);;

    var geoPoint = [point[0]/RA, point[1]/RA, point[2]/RA];

    console.log("geoPoint,", geoPoint);

    return geoPoint;
};

module.exports = 
{
    triangulate,
};