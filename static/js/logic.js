// Initialize map for location pins
var myMap = L.map("map", {
  center: [37.0902, -95.7129],
  zoom: 4
})
var tile = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: 'mapbox/satellite-streets-v10',
  accessToken: API_KEY
}).addTo(myMap)

// Gauge chart for MPG
var data2 = [
    {
      type: "indicator",
      mode: "gauge+number",
      value: 16.9,
      title: { text: "Combined City/Hway<br><b>MPG</b>"},
      gauge: {
        bar: { color: "red"},  
      }
    }
  ];  
  //use d3 to get the size of the parent container element, then size the width and height to prevent overlap
  var chartContainer = d3.select("#viz-three").node().getBoundingClientRect();
  var layout2 = {
    width: chartContainer.width,
    height: chartContainer.height,
    pad: 10,
  }; 
Plotly.newPlot('viz-three', data2, layout2);

// Initial bar chart
var data = [
  {
    type: "bar",
    x: [20000, 10000, 15000, 6000, 2500],
    y: ["model1", "model2", "model3", "model4", "model5"],
    orientation: "h",
    width: 1,
  },
];
var layout = {
  autosize: true,
  title: "<b>Average Cost</b>",
  //xaxis: { title: "$ Avg. Cost" },
};
Plotly.newPlot("viz-two", data, layout);

// create a list of all car makes
var uniqueMake = d3.map(myData, function(d){return d["Make"];}).keys().sort(d3.ascending);
// Add unique auto makes to the dropdown
d3.select("#exampleFormControlSelect1").selectAll("option")
  .data(uniqueMake.map(d => d))
  .enter()
  .append("option")
  .text(function(d){return d.charAt(0).toUpperCase() + d.slice(1);})
  .attr("value",function(d){return d;});

//*****Make Function Starts *************/
function selectedMake() {
  //capture the user selected make
  var elementValue = d3.select(this).property("value");
  //filter the database to a JSON of all cars from the selected make
  var filteredData = myData.filter(row => row["Make"] === elementValue);
 
  // create a unique, sorted list of all car models for the selected make and add them to the model dropdown
  var uniqueModel = d3.map(filteredData, function(d){return d["Model"];}).keys().sort(d3.ascending);  
  d3.select("#exampleFormControlSelect2").selectAll("option").remove()// resets model dropdown on make change
  d3.select("#exampleFormControlSelect2").append("option").text("Select Model")// replaces text in dropdown
  d3.select("#exampleFormControlSelect2").selectAll("option")// adds list of models to dropdown
  .exit()
  .data(uniqueModel.map(d => d))
  .enter()
  .append("option")
  .text(function(d){return d.charAt(0).toUpperCase() + d.slice(1);})
  .attr("value",function(d){return d;});
  
  // create a unique, sorted list of all years for the selected make and add them to the year dropdown
  // similar to model above
  var uniqueYear = d3.map(filteredData, function(d){return d["Year"];}).keys().sort(d3.ascending);
  d3.select("#exampleFormControlSelect3").selectAll("option").remove()
  d3.select("#exampleFormControlSelect3").append("option").text("Select Year")
  d3.select("#exampleFormControlSelect3").selectAll("option")
  .exit()
  .data(uniqueYear.map(d => d))
  .enter()
  .append("option")
  .text(function(d){return d;})
  .attr("value",function(d){return d;})

  // Map Pins below
  // removes all layers from map (to reset on selection change)
  myMap.eachLayer(function(layer){
    layer.remove();
  });  
  tile.addTo(myMap) // adds the tilelayer back
  myMap.setView([37.0902, -95.7129], 4) // resets the view
  
  // Create a new marker cluster group
  var markers = L.markerClusterGroup();
  // Loop through data
  for (var i = 0; i < filteredData.length; i++) {
    // Add a new marker to the cluster group and bind a pop-up
    markers.addLayer(L.marker([filteredData[i]["lat"], filteredData[i]["lng"]])
      .bindPopup("<center><h6>"+filteredData[i]["Year"]+" "+
      (filteredData[i]["Make"].charAt(0).toUpperCase() + filteredData[i]["Make"].slice(1))+" "+
      (filteredData[i]["Model"].charAt(0).toUpperCase() + filteredData[i]["Model"].slice(1))+
      "</center></h6><hr><h6><center> $"+
      d3.format(",")(filteredData[i]["craigslist_price"])+" MPG "+filteredData[i]["mpg"]+"</center></h6>"));
    }  
  // Add our marker cluster layer to the map      
  myMap.addLayer(markers);

  // //capturing Average MPG's (old code pre LoDash)
  // var total = 0;
  // for(var i = 0; i < filteredData.length; i++) {
  //     total += filteredData[i]["mpg"];
  // }
  // //Calculating the average MPG
  // var averageMpg = total / filteredData.length;

  //LoDash version...way less code using the _.mean method!
  var mpgs = filteredData.map((data) => data["mpg"]);
  var averageMpg = _.mean(mpgs);
  
  // Updating the gauge chart with the avg MPG for the selected model 
  var data2 = [
    {
      type: "indicator",
      mode: "gauge+number",
      value: averageMpg,
      title: { text: `Avg. Combined City/Hway MPG<br><b>${elementValue.charAt(0).toUpperCase() + elementValue.slice(1)}</b>`},
      gauge: {
        bar: { color: "red"},  
      }
    }
  ];
  Plotly.newPlot('viz-three', data2, layout2);

  // Capturing Average price per model  
  var averagePrices = [];
  uniqueModel.forEach((d) => {
    var newData = filteredData.filter((row) => row["Model"] === d);
    // console.log("New Data: ", newData); //checking that all models are captured
  var allPrices = 0;

    // gathering all of the prices for each unique model
    newData.forEach((d) => {
      var currentprice = d["craigslist_price"];
      allPrices += currentprice;
    });
    // Calculating the average price for each unique model
    var averagePrice = allPrices / newData.length;
    averagePrices.push(averagePrice);
  });  
  //capitalize Model names for chart
  var capUM= d3.map(filteredData, function(d){return d["Model"].charAt(0).toUpperCase() + d["Model"].slice(1);}).keys().sort(d3.ascending);  
  // axis for bar chart with the data from above
  xValues = averagePrices;
  yValues = capUM;

  // Updating the bar chart for Avg cost by model
  var data = [
    {
      type: "bar",
      x: xValues,
      y: yValues,
      orientation: "h",
      width: 1,
    },
  ];
  var layout = {
    autosize: true,
    title: `<b>Average Cost - ${elementValue.charAt(0).toUpperCase() + elementValue.slice(1)}</b>`,
    //xaxis: { title: "$ Avg. Cost" },
    yaxis: { automargin: true},
  };
  Plotly.newPlot("viz-two", data, layout);  
} //end function for all changes to make dropdown

//event listener for changes to make dropdown
d3.select("#exampleFormControlSelect1").on("change", selectedMake);  

//*****Model Function Starts *************/
function selectedModel() {
  //capture the user selected model
  var elementValue = d3.select(this).property("value");
  //filter the database to a JSON of all cars from the selected model
  var filteredData = myData.filter(row => row["Model"] === elementValue);

  //create a unique list of all years for the selected model and add them to the year dropdown    
  var uniqueYear = d3.map(filteredData, function(d){return d["Year"];}).keys().sort(d3.ascending);
  d3.select("#exampleFormControlSelect3").selectAll("option").remove()
  d3.select("#exampleFormControlSelect3").append("option").text("Select Year")
  d3.select("#exampleFormControlSelect3").selectAll("option")
  .exit()
  .data(uniqueYear.map(d => d))
  .enter()
  .append("option")
  .text(function(d){return d;})
  .attr("value",function(d){return d;})
  
  // Map Pins below
  // removes all layers from map (to reset on selection change)
  myMap.eachLayer(function(layer){
    layer.remove();
  });  
  tile.addTo(myMap) // adds the tilelayer back
  myMap.setView([37.0902, -95.7129], 4) // resets the view
  
  // Create a new marker cluster group
  var markers = L.markerClusterGroup();
  // Loop through data
  for (var i = 0; i < filteredData.length; i++) {
    // Add a new marker to the cluster group and bind a pop-up
    markers.addLayer(L.marker([filteredData[i]["lat"], filteredData[i]["lng"]])
    .bindPopup("<center><h6>"+filteredData[i]["Year"]+" "+
    (filteredData[i]["Make"].charAt(0).toUpperCase() + filteredData[i]["Make"].slice(1))+" "+
    (filteredData[i]["Model"].charAt(0).toUpperCase() + filteredData[i]["Model"].slice(1))+
    "</center></h6><hr><h6><center> $"+
    d3.format(",")(filteredData[i]["craigslist_price"])+" MPG "+filteredData[i]["mpg"]+"</center></h6>"));
  }  
  // Add our marker cluster layer to the map      
  myMap.addLayer(markers);

  // //capturing Average MPG's (old code pre LoDash)
  // var total = 0;
  // for(var i = 0; i < filteredData.length; i++) {
  //     total += filteredData[i]["mpg"];
  // }
  // //Calculating the average MPG
  // var averageMpg = total / filteredData.length;

  //LoDash version...way less code using the _.mean method!
  var mpgs = filteredData.map((data) => data["mpg"]);
  var averageMpg = _.mean(mpgs);
  
  // Get the make to add to the gauge title with model name below
  var makeValue = d3.select("#exampleFormControlSelect1").property("value");

  // Updating the gauge chart with the avg MPG for the selected make and model 
  var data2 = [
    {
      type: "indicator",
      mode: "gauge+number",
      value: averageMpg,
      title: { text: `Avg. Combined City/Hway MPG<br><b>${makeValue.charAt(0).toUpperCase() + 
        makeValue.slice(1)} ${elementValue.charAt(0).toUpperCase() + elementValue.slice(1)}</b>`},
      gauge: {
        bar: { color: "red"},  
      }
    }
  ];
  Plotly.newPlot('viz-three', data2, layout2);
} //end function for all changes to model dropdown

//event listener for changes to model dropdown
d3.select("#exampleFormControlSelect2").on("change", selectedModel);

//*****Year Function Starts *************
function selectedYear() {
  //capture the user selected Year
  var elementValue = d3.select(this).property("value");
  //This conditional var exists in case the user selects Make & Year without Model
  var controlValue =  (d3.select("#exampleFormControlSelect2").property("value") === "Select Model") ?
    d3.select("#exampleFormControlSelect1").property("value"): //select make or...
    d3.select("#exampleFormControlSelect2").property("value"); //...select model

  //This conditional exists in case the user selects Make & Year without Model
  var filteredData = (d3.select("#exampleFormControlSelect2").property("value") === "Select Model") ?
    myData.filter(row => row["Make"] === controlValue): //filter database on make or...
    myData.filter(row => row["Model"] === controlValue); //...filter database on model

  //then we filter the filtered database on year
  var mmyData = filteredData.filter(row => row["Year"] === +elementValue);     
    
  // Map Pins below
  // removes all layers from map (to reset on selection change)
  myMap.eachLayer(function(layer){
    layer.remove();
  });  
  tile.addTo(myMap) // adds the tilelayer back
  myMap.setView([37.0902, -95.7129], 4) // resets the view
  
  // Create a new marker cluster group
  var markers = L.markerClusterGroup();
  // Loop through data
  for (var i = 0; i < mmyData.length; i++) {
    // Add a new marker to the cluster group and bind a pop-up
    markers.addLayer(L.marker([mmyData[i]["lat"], mmyData[i]["lng"]])
    .bindPopup("<center><h6>"+mmyData[i]["Year"]+" "+
    (mmyData[i]["Make"].charAt(0).toUpperCase() + mmyData[i]["Make"].slice(1))+" "+
    (mmyData[i]["Model"].charAt(0).toUpperCase() + mmyData[i]["Model"].slice(1))+
    "</center></h6><hr><h6><center> $"+
    d3.format(",")(mmyData[i]["craigslist_price"])+" MPG "+mmyData[i]["mpg"]+"</center></h6>"));
  }  
  // Add our marker cluster layer to the map      
  myMap.addLayer(markers);

  // //capturing Average MPG's (old code pre LoDash)
  // var total = 0;
  // for(var i = 0; i < mmyData.length; i++) {
  //     total += mmyData[i]["mpg"];
  // }
  // // Calculating the average MPG
  // var averageMpg = total / mmyData.length;

  //LoDash version...way less code using the _.mean method!
  var mpgs = mmyData.map((data) => data["mpg"]);
  var averageMpg = _.mean(mpgs);

  // Get the make to add to the gauge title with year and/or model name below
  var makeValue = d3.select("#exampleFormControlSelect1").property("value");

  //This conditional exists to create the gauge title based on user choices for make, year, and/or model
  var gaugeText = (d3.select("#exampleFormControlSelect2").property("value") === "Select Model") ?
    `Avg. Combined City/Hway MPG<br><b>${elementValue} ${controlValue.charAt(0).toUpperCase() + 
      controlValue.slice(1)}</b>`:
    `Avg. Combined City/Hway MPG<br><b>${elementValue} ${makeValue.charAt(0).toUpperCase() + 
      makeValue.slice(1)} ${controlValue.charAt(0).toUpperCase() + controlValue.slice(1)}</b>`
    
  var data2 = [
    {
      type: "indicator",
      mode: "gauge+number",
      value: averageMpg,
      title: gaugeText,
      gauge: {
        bar: { color: "red"},  
      }
    }
  ];
  Plotly.newPlot('viz-three', data2, layout2);
} //end function for all changes to year dropdown

//event listener for changes to make dropdown
d3.select("#exampleFormControlSelect3").on("change", selectedYear);