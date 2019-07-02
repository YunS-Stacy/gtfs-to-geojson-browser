"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports["default"] = (function (datum) {
    console.time('shape');
    var grouped = exports.groupByShapeId(datum);
    console.timeEnd('shape');
    return grouped;
});
exports.groupByShapeId = function (datum) {
    var res = datum.reduce(function (prev, curr) {
        if (prev.has(curr.shape_id)) {
            var oldLine = prev.get(curr.shape_id);
            var newLine = oldLine.concat([curr]);
            prev.set(curr.shape_id, newLine);
            return prev;
        }
        prev.set(curr.shape_id, [curr]);
        return prev;
    }, new Map());
    var routes = new Set();
    res.forEach(function (value, key) {
        var newValue = value
            .sort(function (_a, _b) {
            var a = _a.shape_pt_sequence;
            var b = _b.shape_pt_sequence;
            return a - b;
        })
            .reduce(function (prev, curr) {
            return __assign({}, prev, { coordinates: prev.coordinates.concat([
                    [curr.shape_pt_lon, curr.shape_pt_lat],
                ]) });
        }, {
            type: 'LineString',
            coordinates: []
        });
        routes.add({
            type: 'Feature',
            geometry: newValue,
            properties: {
                RouteID: key
            }
        });
    });
    return routes;
};
