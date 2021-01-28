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
    console.log(obesity);
    console.log(poverty);

    // Build scatter plot
    // Using example from https://www.d3-graph-gallery.com/graph/scatter_basic.html and class examples
    
    // Create x and y scales
    var xScale = d3.scaleLinear()
        .domain([0, d3.max(obesity)])
        .range([0, chartWidth]);

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(poverty)])
        .range([chartHeight, 0]);

    // Create axes
    var bottomAxis = d3.axisBottom(xScale);
    var leftAxis = d3.axisLeft(yScale);

    // Append SVG elements and add axes inside of them
    chartGroup.append("g")
        .call(leftAxis);

    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(bottomAxis);

    // Draw chart
    chartGroup.selectAll("#scatter")
        .data(healthData)
        .enter()
        .append("circle")
        .attr("cx", (d, i) => xScale(obesity[i]))
        .attr("cy", (d, i) => yScale(poverty[i]))
        .attr("r", 5)
        .style("fill", "#5d05b5")



} , function(error) {
    console.log(error);
});