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
var chartGroup = svg.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`);

// Read in data using D3 method
d3.csv("assets/data/data.csv").then(function(healthData) {
    // Log data to console to test if it's read in correctly
    //console.log(healthData);

    // Cast data to variables
    var obesity = healthData.map(data => +data.obesity);
    var poverty = healthData.map(data => +data.poverty);
    // console.log(obesity);
    // console.log(poverty);

    // Build scatter plot
    // Using example from https://www.d3-graph-gallery.com/graph/scatter_basic.html and class examples
    
    // Create scales
    var xScale = d3.scaleLinear()
        .domain([0, d3.max(healthData, data => data.obesity)])
        .range([0, chartWidth]);

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(healthData, data => data.poverty)])
        .range([chartHeight, 0]);



} , function(error) {
    console.log(error);
});