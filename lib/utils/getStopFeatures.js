"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports["default"] = (function (datum) {
    var res = new Set();
    datum.forEach(function (_a) {
        var stop_lat = _a.stop_lat, stop_lon = _a.stop_lon, rest = __rest(_a, ["stop_lat", "stop_lon"]);
        res.add({
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [stop_lon, stop_lat]
            },
            properties: rest
        });
    });
    return res;
});
