import createUSAMap from "./components/map/USAMap";


const mapContainer = $(".usa-map");

renderMap()

async function renderMap() {
  const svgNode = await createUSAMap();
  mapContainer.empty();
  mapContainer.append(svgNode);
}

