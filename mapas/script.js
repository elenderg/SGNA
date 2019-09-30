/**
 * ---------------------------------------
 * This demo was created using amCharts 4.
 *
 * For more information visit:
 * https://www.amcharts.com/
 *
 * Documentation is available at:
 * https://www.amcharts.com/docs/v4/
 * ---------------------------------------
 */

am4core.ready(function() {  });// QUANDO O ARQUIVO CORE.JS ESTIVER CARREGADO, FAÇA:
  
  // Themes begin
    am4core.useTheme(am4themes_animated); // ativa as animações antes de inicializar o mapa.  usa o arquivo animated.js
  // Themes end
  
  // Inicializa o mapa
  var chart = am4core.create("chartdiv", am4maps.MapChart);
  chart.geodata = am4geodata_worldLow;
  chart.projection = new am4maps.projections.Miller();
  chart.homeZoomLevel = 10; //zoom inicial. o máximo é 10, não sei o porquê
  chart.homeGeoPoint = {
      latitude: -3.264444,  // coordenadas de sbht
      longitude: -52.252222
  };
  
  // Cria os países
  var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
  polygonSeries.useGeodata = true;
  //abaixo se muda a cor dos países de acordo com o index, que ainda não achei aonde fica.
  polygonSeries.mapPolygons.template.fill = chart.colors.getIndex(15).lighten(0.1);
  // 0 = azul claro, 1, azul escuro, 2 e 3 = roxo,  4-7 = violeta/rosa, 11-13 = amarelo e 14-16 = verde/azul 
  polygonSeries.mapPolygons.template.nonScalingStroke = true;
  polygonSeries.exclude = ["AQ"];  // Exclui a Antártida do Mapa, pois ela é muito grande na projeção de Mercator
  
  /* //Cria os estados  
  var BrazilSeries = chart.series.push(new am4maps.MapPolygonSeries());
  BrazilSeries.geodata = am4geodata_brazilLow;
  BrazilSeries.mapPolygons.template.fill = chart.colors.getIndex(15).lighten(0.1);
  
  var polygonTemplate = polygonSeries.mapPolygons.template;
  polygonTemplate.fill = am4core.color("#74B266");
  var hs = polygonTemplate.states.create("hover");
  hs.properties.fill = am4core.color("#367B25");
  polygonSeries.data = [{
  id: "BR",
  disabled: true
  }];
  var polygonTemplate = brazilSeries.mapPolygons.template;
  polygonTemplate.fill = am4core.color("#74B266");*/

  // Adiciona line bullets
  var cities = chart.series.push(new am4maps.MapImageSeries());  
  cities.mapImages.template.nonScaling = true;
  
  var city = cities.mapImages.template.createChild(am4core.Circle);
  city.radius = 6; 
  city.fill = chart.colors.getIndex(0).brighten(-0.2);
  city.strokeWidth = 2;
  city.stroke = am4core.color("#fff");
  
  function addCity(coords, title) {
      //console.log(coords)
      //console.log(typeof coords)
      var city = cities.mapImages.create();
      city.latitude = coords.latitude;
      //console.log(coords.latitude);
      //console.log(typeof coords.latitude)
      city.longitude = coords.longitude;
      //console.log(coords.longitude);
      //console.log(typeof coords.longitude)
      city.tooltipText = title;      
      return city;        
  }
  

  chart.zoomControl = new am4maps.ZoomControl(); /*Adiciona os botões de + e - do zoom*/
  chart.zoomControl.slider.height = 100; // Adiciona uma barra de zoom dentro dos botões


  /*var paris = addCity({ "latitude": 48.8567, "longitude": 2.3510 }, "Paris");
  var toronto = addCity({ "latitude": 43.8163, "longitude": -79.4287 }, "Toronto");
  var la = addCity({ "latitude": 34.3, "longitude": -118.15 }, "Los Angeles");
  var havana = addCity({ "latitude": 23, "longitude": -82 }, "Havana"); */
  var belém = addCity({"latitude": -1.437778, "longitude": -48.468889 }, "SBBE");
  var altamira = addCity({"latitude": -3.264444, "longitude": -52.252222 }, "SBHT");
  var santarém = addCity({"latitude": -2.4225, "longitude": -54.792778 }, "SBSN");
  var itaituba = addCity({"latitude": -4.242222, "longitude": -56.000833 }, "SBIH");
 
  
  /*var lineSeries = chart.series.push(new am4maps.MapLineSeries());
  lineSeries.data = [{
    "multiGeoLine": [
      [
        { "latitude": 48.856614, "longitude": 2.352222 },
        { "latitude": 40.712775, "longitude": -74.005973 },
        { "latitude": 49.282729, "longitude": -123.120738 }
      ]
    ]
  }];*/
  
  // Add lines
  var lineSeries = chart.series.push(new am4maps.MapArcSeries());
  lineSeries.mapLines.template.shortestDistance = true;  // deixa as trajetórias das aeronaves retas
  lineSeries.mapLines.template.line.strokeWidth = 2;
  lineSeries.mapLines.template.line.strokeOpacity = 0.5;
  lineSeries.mapLines.template.line.stroke = city.fill;
  lineSeries.mapLines.template.line.nonScalingStroke = true;
  lineSeries.mapLines.template.line.strokeDasharray = "1,1";
  lineSeries.zIndex = 10;
  lineSeries.mapLines.template.line.stroke = am4core.color("#bb44bb");

  
  var shadowLineSeries = chart.series.push(new am4maps.MapLineSeries());
  shadowLineSeries.mapLines.template.line.strokeOpacity = 0;
  shadowLineSeries.mapLines.template.line.nonScalingStroke = true;
  shadowLineSeries.mapLines.template.shortestDistance = false;
  shadowLineSeries.zIndex = 5;
  
  function addLine(from, to) {
    //console.log(from);
    //console.log(to);
    var line = lineSeries.mapLines.create();
    //console.log(line);
    //console.log(typeof line);
    line.imagesToConnect = [from, to];
    line.line.controlPointDistance = 0;  
    var shadowLine = shadowLineSeries.mapLines.create();
    shadowLine.imagesToConnect = [from, to];  
    return line;
  }
  
  /*addLine(paris, toronto);
  addLine(toronto, la);
  addLine(la, havana);
  addLine(havana, belém);*/
  addLine(belém, altamira);
  //addLine(altamira, santarém);
 // addLine(santarém, altamira);
  //addLine(altamira, itaituba);
  
  // Adicionar avião
  var plane = lineSeries.mapLines.getIndex(0).lineObjects.create();
  plane.position = 0;
  plane.width = 1;
  plane.height = 1;
  
  plane.adapter.add("scale", function(scale, target) {
      return 0.1 * (1 - (Math.abs(0.5 - target.position)));
  })
  
  var planeImage = plane.createChild(am4core.Sprite);
  planeImage.scale = 0.08;
  planeImage.horizontalCenter = "middle";
  planeImage.verticalCenter = "middle";
  planeImage.path = "m2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47";
  planeImage.fill = chart.colors.getIndex(2).brighten(-0.2);
  planeImage.strokeOpacity = 0;
  
  var shadowPlane = shadowLineSeries.mapLines.getIndex(0).lineObjects.create();
  shadowPlane.position = 0;
  shadowPlane.width = 1;
  shadowPlane.height = 1;
  
  var shadowPlaneImage = shadowPlane.createChild(am4core.Sprite);
  shadowPlaneImage.scale = 0.0125;
  shadowPlaneImage.horizontalCenter = "middle";
  shadowPlaneImage.verticalCenter = "middle";
  shadowPlaneImage.path = "m2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47";
  shadowPlaneImage.fill = am4core.color("#000");
  shadowPlaneImage.strokeOpacity = 0;
  
  shadowPlane.adapter.add("scale", function(scale, target) {
      target.opacity = (0.6 - (Math.abs(0.5 - target.position)));
      return 0.5 - 0.3 * (1 - (Math.abs(0.5 - target.position)));
  })
  
  // Plane animation
  var currentLine = 0;
  var direction = 1;
  function flyPlane() {
  
      // Get current line to attach plane to
      plane.mapLine = lineSeries.mapLines.getIndex(currentLine);
      plane.parent = lineSeries;
      shadowPlane.mapLine = shadowLineSeries.mapLines.getIndex(currentLine);
      shadowPlane.parent = shadowLineSeries;
      shadowPlaneImage.rotation = planeImage.rotation;
  
      // Set up animation
      var from, to;
      var numLines = lineSeries.mapLines.length;
      if (direction == 1) {
          from = 0
          to = 1;
          if (planeImage.rotation != 0) {
              planeImage.animate({ to: 0, property: "rotation" }, 1000).events.on("animationended", flyPlane);
              return;
          }
      }
      else {
          from = 1;
          to = 0;
          if (planeImage.rotation != 180) {
              planeImage.animate({ to: 180, property: "rotation" }, 1000).events.on("animationended", flyPlane);
              return;
          }
      }
  
      // Start the animation
      var animation = plane.animate({
          from: from,
          to: to,
          property: "position"
      }, 5000, am4core.ease.sinInOut); // velocidade do avião
      animation.events.on("animationended", flyPlane)
      /*animation.events.on("animationprogress", function(ev) {
        var progress = Math.abs(ev.progress - 0.5);
        //console.log(progress);
        //planeImage.scale += 0.2;
      });*/
  
      shadowPlane.animate({
          from: from,
          to: to,
          property: "position"
      }, 5000, am4core.ease.sinInOut); // velocidade da sombra do avião
  
      // Increment line, or reverse the direction
      currentLine += direction;
      if (currentLine < 0) {
          currentLine = 0;
          direction = 1;
      }
      else if ((currentLine + 1) > numLines) {
          currentLine = numLines - 1;
          direction = -1;
      }
  
  }
  
  // Go!
  flyPlane();
//chart.panBehavior = "rotateLongLat";
chart.smallMap = new am4maps.SmallMap();
chart.smallMap.series.push(polygonSeries);

/*
var bullet = line.lineObjects.create(); 
var circle = bullet.createChild(am4core.Circle);
circle.radius = 5;
circle.fill = am4core.color("#fff");
circle.strokeWidth = 3;
circle.stroke = am4core.color("#e03e96");
bullet.position = 0.5;

function goPlane() {
    bullet.animate({
      from: 0,
      to: 1,
      property: "position"
    }, 5000, am4core.ease.sinInOut);
  }

  function goPlane() {
  var from = bullet.position, to;
  if (from == 0) {
    to = 1;
    plane.rotation = 0;
  }
  else {
    to = 0;
    plane.rotation = 180;
  }
  
  var animation = bullet.animate({
    from: from,
    to: to,
    property: "position"
  }, 5000, am4core.ease.sinInOut);
  animation.events.on("animationended", goPlane)
}
series.columns.template.alwaysShowTooltip = true;
series.columns.template.alwaysShowTooltip = true;

  */
//  }); // end am4core.ready()
  
