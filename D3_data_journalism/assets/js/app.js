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
        .domain([(d3.min(poverty) - 2), (d3.max(poverty) + 2)])
        .range([0, chartWidth]);

    var yScale = d3.scaleLinear()
        .domain([(d3.min(obesity) - 2), (d3.max(obesity) + 2)])
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
        .attr("cx", (d, i) => xScale(poverty[i]))
        .attr("cy", (d, i) => yScale(obesity[i]))
        .attr("r", 7)
        .style("fill", "#5d05b5")

    // Add labels for axes
    // Resource: http://www.d3noob.org/2012/12/adding-axis-labels-to-d3js-graph.html
    chartGroup.append("text")
        .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + margin.bottom - 15})`)
        .style("text-anchor", "middle")
        .text("In Poverty (%)")

    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (chartHeight / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Obesity (%)")


} , function(error) {
    console.log(error);
});