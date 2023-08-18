import * as d3 from "d3";
import * as topojson from "topojson-client";
import { handleModal } from "../modal/modal";

export default async function createUSAMap() {
  const width = 975;
  const height = 610;

  const svg = d3.create("svg").attr("viewBox", [0, 0, width, height]);
  const g = svg.append("g");

  const geojson = await d3.json("/states-albers-10m.json");

  const statesData = geojson.objects.states;

  const featureCollection = topojson.feature(geojson, statesData);

  const path = d3.geoPath();

  const mapPaths = g
    .selectAll("path")
    .data(featureCollection.features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("fill", "#444")
    .attr("stroke", "white")
    .on("click", handleClick)
    .on("mouseenter", handleMouseEnter)
    .on("mouseleave", handleMouseLeave);

  function handleClick(event, d) {
    const stateName = d.properties.name;

    handleModal(stateName);

    mapPaths.style("fill", null);
    d3.select(this).style("fill", "green");
  }

  function handleMouseEnter(event, d) {
    d3.select(this)
      .transition()
      .duration(200)
      .attr("transform", "scale(1.015)");
    d3.select(this).style("fill", "#0EF6CC");
  }

  function handleMouseLeave(event, d) {
    d3.select(this).transition().duration(200).attr("transform", "scale(1)");
    d3.select(this).style("fill", "#444");
  }

  return svg.node();
}
