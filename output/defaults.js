"foo" : {
  "window" : {
    "border" : 2,
    "margin" : function () {return new window.multigraph.math.Insets(/*top*/2, /*left*/2, /*bottom*/2, /*right*/2); },
    "padding" : function () {return new window.multigraph.math.Insets(/*top*/5, /*left*/5, /*bottom*/5, /*right*/5); },
    "bordercolor" : function () {return new window.multigraph.math.RGBColor.parse("0x000000"); }
  },
  "legend" : {
    "base" : function () { return new window.multigraph.math.Point(1,1); },
    "anchor" : function () { return new window.multigraph.math.Point(1,1); },
    "position" : function () { return new window.multigraph.math.Point(0,0); },
    "frame" : "padding",
    "color" : function () {return new window.multigraph.math.RGBColor.parse("white"); },
    "bordercolor" : function () {return new window.multigraph.math.RGBColor.parse("black"); },
    "opacity" : 1.0,
    "border" : 1,
    "cornerradius" : 0,
    "padding" : 0,
    "icon" : {
      "width" : 40,
      "height" : 30,
      "border" : 1
    }
  },
  "background" : {
    "color" : function () {return new window.multigraph.math.RGBColor.parse("0xffffff"); },
    "img" : {
      "anchor" : function () { return new window.multigraph.math.Point(-1,-1); },
      "base" : function () { return new window.multigraph.math.Point(-1,-1); },
      "position" : function () { return new window.multigraph.math.Point(0,0); },
      "frame" : "padding"
    }
  },
  "plotarea" : {
    "border" : 0,
    "bordercolor" : function () {return new window.multigraph.math.RGBColor.parse("0xeeeeee"); },
    "margin" : function () {return new window.multigraph.math.Insets(/*top*/10, /*left*/38, /*bottom*/35, /*right*/35); }
  },
  "title" : {
    "base" : function () { return new window.multigraph.math.Point(0,1); },
    "anchor" : function () { return new window.multigraph.math.Point(0,1); },
    "position" : function () { return new window.multigraph.math.Point(0,0); },
    "frame" : "padding",
    "border" : 0,
    "color" : function () {return new window.multigraph.math.RGBColor.parse("0xffffff"); },
    "bordercolor" : function () {return new window.multigraph.math.RGBColor.parse("0x000000"); },
    "opacity" : 1.0,
    "padding" : 0,
    "cornerradius" : 15
  },
  "horizontalaxis" : {
    "type" : "number",
    "length" : function () {return new window.multigraph.math.Displacement(1.0); },
    "base" : function () { return new window.multigraph.math.Point(-1,1); },
    "anchor" : -1,
    "position" : function () {return new window.multigraph.math.Point(0,0); },
    "min" : "auto",
    "max" : "auto",
    "minposition" : function () {return new window.multigraph.math.Displacement(-1.0); },
    "maxposition" : function () {return new window.multigraph.math.Displacement(1.0); },
    "color" : function () {return new window.multigraph.math.RGBColor.parse("0x000000"); },
    "linewidth" : 1,
    "tickmin" : -3,
    "tickmax" : 3,
    "tickcolor" : function () {return new window.multigraph.math.RGBColor.parse("0x000000"); },
    "title" : {
      "base" : 0,
      "angle" : 0
    },
    "labels" : {
      "format" : "%1d",
      "start" : "0",
      "angle" : 0.0,
      "position" : function () { return new window.multigraph.math.Point(0,0); },
      "anchor" : function () { return new window.multigraph.math.Point(0,0); },
      "color" : function () {return new window.multigraph.math.RGBColor.parse("0x000000"); },
      "spacing" : "10000 5000 2000 1000 500 200 100 50 20 10 5 2 1 0.1 0.01 0.001",
      "densityfactor" : 1.0
    },
    "grid" : {
      "color" : function () {return new window.multigraph.math.RGBColor.parse("0xeeeeee"); },
      "visible" : "false"
    },
    "pan" : {
      "allowed" : "yes"
    },
    "zoom" : {
      "allowed" : "yes"
    }
  },
  "verticalaxis" : {
    "type" : "number",
    "length" : function () {return new window.multigraph.math.Displacement(1.0); },
    "base" : function () { return new window.multigraph.math.Point(-1,1); },
    "anchor" : -1,
    "position" : function () {return new window.multigraph.math.Point(0,0); },
    "min" : "auto",
    "max" : "auto",
    "minposition" : function () {return new window.multigraph.math.Displacement(-1.0); },
    "maxposition" : function () {return new window.multigraph.math.Displacement(1.0); },
    "color" : function () {return new window.multigraph.math.RGBColor.parse("0x000000"); },
    "linewidth" : 1,
    "tickmin" : -3,
    "tickmax" : 3,
    "tickcolor" : function () {return new window.multigraph.math.RGBColor.parse("0x000000"); },
    "title" : {
      "base" : 0,
      "angle" : 0
    },
    "labels" : {
      "format" : "%1d",
      "start" : "0",
      "angle" : 0.0,
      "position" : function () { return new window.multigraph.math.Point(0,0); },
      "anchor" : function () { return new window.multigraph.math.Point(0,0); },
      "color" : function () {return new window.multigraph.math.RGBColor.parse("0x000000"); },
      "spacing" : "10000 5000 2000 1000 500 200 100 50 20 10 5 2 1 0.1 0.01 0.001",
      "densityfactor" : 1.0
    },
    "grid" : {
      "color" : function () {return new window.multigraph.math.RGBColor.parse("0xeeeeee"); },
      "visible" : "false"
    },
    "pan" : {
      "allowed" : "yes"
    },
    "zoom" : {
      "allowed" : "yes"
    }
  },
  "throttle" : {
    "requests" : 0,
    "period" : 0,
    "concurrent" : 0
  },
  "data" : {
    "variables" : {
      "missingop" : "eq",
      "variable" : {
        "type" : "number"
      }
    }
  }
}