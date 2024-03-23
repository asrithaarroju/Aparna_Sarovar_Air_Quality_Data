document.addEventListener("DOMContentLoaded", function () {
  // Initialize Leaflet map
  var map = L.map("map").setView([17.462941927458417, 78.31126566160734], 4); // Centered at the coordinates with zoom level 4

  // Add tile layer
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
  }).addTo(map);

  // Set map zoom to 90%
  map.setZoom(30);

  // Define annotations for each location
  var annotations = {
    A: [17.461970655110473, 78.31211674662691],
    B: [17.462035592298083, 78.31178979139295],
    C: [17.462166672301525, 78.31135851779102],
    D: [17.462228872296716, 78.31084387546282],
    E: [17.462322263098898, 78.31042127165752],
    F_10: [17.462485110160863, 78.31008838082572],
    F_15: [17.462348722515124, 78.31004730825205],
    G: [17.462900555064753, 78.31025119325385],
    H: [17.463295813629774, 78.31040130859746],
    I: [17.46368800355311, 78.31097756441794],
    J: [17.46356899338774, 78.31134346986292],
    K: [17.463464599800595, 78.31169880212973],
    L: [17.463303469203407, 78.31213131779103],
    M: [17.46282630352284, 78.3123243889551],
    N: [17.462392603507606, 78.31225474662692],
    A_: [17.465554387506323, 78.31101530934438],
  };

  // Loop through annotations to add labels
  Object.keys(annotations).forEach(function (label) {
    var annotation = annotations[label];
    var markerColor = "black"; // Default marker color

    // Check if the label corresponds to L, D, F, or N blocks and set marker color to blue
    if (
      label === "L" ||
      label === "N" ||
      label === "F_10" ||
      label === "F_15" ||
      label === "A_"
    ) {
      markerColor = "blue";
    }

    // Function to update label size based on map zoom
    function updateLabelSize() {
      var fontSize = 14; // Default font size
      if (map.getZoom() > 10) {
        fontSize = 14;
      }
      var divIcon = L.divIcon({
        className: "custom-label",
        html:
          "<div style='color: " +
          markerColor +
          "; font-size: " +
          fontSize +
          "px;'>" +
          label +
          "</div>",
      });
      marker.setIcon(divIcon);
    }

    var divIcon = L.divIcon({
      className: "custom-label",
      html: "<div style='color: " + markerColor + ";'>" + label + "</div>",
    });

    var marker = L.marker(annotation, { icon: divIcon }).addTo(map);

    // Update label size when map zoom changes
    map.on("zoom", updateLabelSize);

    // Initial label size update
    updateLabelSize();

    // Add click event listener to each marker
    marker.on("click", function () {
      // Perform action based on the label clicked
      switch (label) {
        case "A_":
          window.location.href = "A_Block.html";
          break;
        case "F_10":
          window.location.href = "F_Block_10f.html";
          break;
        case "F_15":
          window.location.href = "F_Block_15f.html";
          break;
        case "N":
          window.location.href = "N_Block.html";
          break;
        case "L":
          window.location.href = "L_Block.html";
          break;
        // Add more cases for other labels if needed
        default:
          break;
      }
    });
  });
  // Button click event listener for "Select node" button
  document
    .getElementById("select-node-btn")
    .addEventListener("click", function () {
      document.getElementById("node-list").classList.toggle("hidden");
    });

  // Button click event listener for "Parameter wise" button
  document
    .getElementById("parameter-wise-btn")
    .addEventListener("click", function () {
      document.getElementById("parameter-list").classList.toggle("hidden");
    });
});
