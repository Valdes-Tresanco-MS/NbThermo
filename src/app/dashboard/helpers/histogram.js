import * as d3 from "d3";
export function Histogram(data, _width, _markers) {
  // set the dimensions and margins of the graph
  var margin = { top: 10, right: 30, bottom: 50, left: 50 },
    width = _width - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3
    .select(".my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // get the data
  var x = d3
    .scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, width]);
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // set the parameters for the histogram
  var histogram = d3
    .bin()
    .domain(x.domain()) // then the domain of the graphic
    .thresholds(x.ticks(100 / 5)); // then the numbers of bins

  // And apply this function to data to get the bins
  var bins = histogram(data);
  // Y axis: scale and draw:
  var y = d3.scaleLinear().range([height, 0]);
  y.domain([
    0,
    d3.max(bins, function (d) {
      return d.length;
    }),
  ]); // d3.hist has to be called before the Y axis obviously
  svg.append("g").call(d3.axisLeft(y));

  // append the bar rectangles to the svg element
  svg
    .selectAll("rect")
    .data(bins)
    .enter()
    .append("rect")
    .attr("x", 1)
    .attr("transform", function (d) {
      return "translate(" + x(d.x0) + "," + y(d.length) + ")";
    })
    .attr("width", function (d) {
      return x(d.x1) - x(d.x0) - 1;
    })
    .attr("height", function (d) {
      return height - y(d.length);
    })
    .style("fill", function (d) {
      if (d.x0 < 140) {
        return "#ffd740";
      } else {
        return "#69b3a2";
      }
    });

  // text label for the x axis
  svg
    .append("text")
    .attr(
      "transform",
      "translate(" + width / 2 + " ," + (height + margin.top + 20) + ")"
    )
    .style("text-anchor", "middle")
    .text("Tm");

  // text label for the y axis
  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - height / 2)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Count");

  // Append a vertical line to highlight the separation
  Object.keys(_markers).map((k, index) => {
    if (!!_markers[k]) {
      svg
        .append("text")
        .attr("x", x(_markers[k] + 1))
        .attr("y", y(20 * (index + 1)))
        .text(`${k}: ${_markers[k]}`)
        .style("font-size", "15px");

      svg
        .append("line")
        .attr("x1", x(_markers[k]))
        .attr("x2", x(_markers[k]))
        .attr("y1", y(0))
        .attr("y2", y(1600))
        .attr("stroke", "grey")
        .attr("stroke-dasharray", "4");
    }
  });

  return svg;
}
