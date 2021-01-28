// Setting up SVG area
var svgWidth = 960;
var svgHeight = 500;

// Chart margins
var margin = {
    top: 60,
    right: 60,
    bottom: 60,
    left: 60
};

// Chart dimensions
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Append SVG to HTML
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append a group to the SVG area
var chartGroup = svg.append("g");

// Read in data using D3 method
d3.csv("../data/data.csv").then(function(healthData) {
    console.log(healthData);

} , function(error) {
    console.log(error);
});