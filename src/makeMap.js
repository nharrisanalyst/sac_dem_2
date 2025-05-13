import * as d3 from 'd3';
import L from 'leaflet';


export const width = 900;
export const margin ={l:0,t:0,b:0,r:0};
export const fill = d3.scaleOrdinal().domain([0,1,2]).range(["#90B9EE","#E3B99B","#A9A9A9"])

export const makeMap =async(element) =>{
    const opacity_fill_map = 0.15
    //color clinton 0 Sanders 1 teis 2
    const data_geojson = await d3.json("data/primary16Joined.geojson");
    const map = L.map(element).setView([38.5558,-121.3944],11);

    // //tile layer and mapbox
    L.tileLayer('https://api.mapbox.com/styles/v1/{style_id}/tiles/{tileSize}/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'nathaniharris.0hge5l9n',
        accessToken: 'pk.eyJ1IjoibmF0aGFuaWhhcnJpcyIsImEiOiJjaXExZjJ2cmQwMHk3Zmlubmw3dmN5ZDUyIn0.suHGEfPnuo1BDAz8Si08fQ',
        style_id: 'mapbox/light-v8'
    }).addTo(map);


    const svg = d3.select(map.getPanes().overlayPane).append("svg")
    const mapG = svg.append("g").attr("class", "leaflet-zoom-hide").attr("id","gelement");

    

    function projectPoint(x, y) {
          var point = map.latLngToLayerPoint(new L.LatLng(y, x));
          this.stream.point(point.x, point.y);
        };

        const transform = d3.geoTransform({point: projectPoint})
        const path = d3.geoPath(transform);

        const bounds = path.bounds(data_geojson);
        const topLeft = bounds[0];
        const bottomRight = bounds[1];
    
    
        svg.attr("width", bottomRight[0] - topLeft[0])
            .attr("height", bottomRight[1] - topLeft[1])
            .style("left", topLeft[0] + "px")
            .style("top", topLeft[1] + "px");

        mapG .attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");

            
        const feature = mapG.selectAll("path")
            .data(data_geojson.features)
            .enter().append("path");

       feature.attr("d", path)
                .attr("stroke","#555")
                .attr("fill-opacity",opacity_fill_map)
                .attr("stroke-opacity", opacity_fill_map-.10)
                .attr('fill',d =>fillPath(d))
                .style('pointer-events', 'all')
                .on("click", function(event, d) {
                    event.stopPropagation();
                    console.log('mousemove event is happening')
                    const [x, y] = d3.pointer(event);
                    console.log(x,y, 'wowoowoowowowow')   

                L.popup({
                    closeButton: true
                }).setLatLng(map.layerPointToLatLng([x,y]))
                 .setContent( "<div id='prenum' style='margin-bottom:0px'> Precinct No.<div>"
                              + "<div 'style='margin-top:0px font-size:24px'><b>"
                            +d.properties["VPrecinct"]+"</b></div>"
                            + "<table><tbody><tr><td>Name: </td><td>Votes</td></tr><tr><td>Clinton: </td><td>"
                            +d.properties["CountyResults _HILLARY CLINTON"]+"</td></tr><tr><td>Sanders: </td><td>"+" "
                            +d.properties["CountyResults _BERNIE SANDERS"]+"</td></tr><tr><td>Judd: </td><td>"
                            +d.properties["CountyResults _KEITH JUDD"]+"</td></tr><tr><td>Hewes: </td><td>"
                            +d.properties["CountyResults _HENRY HEWES"]+"</td></tr><tr><td>Roque De La Fuente: </td><td>"+
                            d.properties["CountyResults _ROQUE DE LA FUENTE"]+"</td></tr><tr><td>Wilson: </td><td>"
                            +d.properties["CountyResults _WILLIE WILSON"]+"</td></tr><tr><td>Steinberg: </td><td>"
                            +d.properties["CountyResults _MICHAEL STEINBERG"]+"</td></tr></tbody></table>")
                        .openOn(map) 
                    });
                
                //adding all circle elements and sizing them and getting them to center and resize with zooming
                mapG.selectAll("circle")
                .data(data_geojson.features)
                .enter()
                .append("circle")
                .attr("class", "leaflet-zoom-hide")
                .attr("id", (d,i) =>  i+"circle") 
                .attr('cx', function(d){
                            var x = path.centroid(d)[0];
                            return x; })
                .attr('cy', function(d){
                            var y = path.centroid(d)[1];
                            return y;})
                .attr("r",function(d){
                            return Math.abs(parseInt(d.properties["CountyResults _HILLARY CLINTON"]) - parseInt(d.properties["CountyResults _BERNIE SANDERS"]))*(1/(3.14*3.14*3.14))+2
                        })
                .style("fill", d=>fillPath(d));


    //reset on zoom 
    function reset(e) {
        var bounds = path.bounds(data_geojson),
            topLeft = bounds[0],
            bottomRight = bounds[1];

        svg.attr("width", bottomRight[0] - topLeft[0])
            .attr("height", bottomRight[1] - topLeft[1])
            .style("left", topLeft[0] + "px")
            .style("top", topLeft[1] + "px");

        mapG.attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");
        feature.attr("d", path);
        mapG.selectAll("circle")
                .data(data_geojson.features)
                .attr('cx', function(d){
                    var x = path.centroid(d)[0];
                    return x;})
                .attr('cy', function(d){
                    var y = path.centroid(d)[1];
                    return y;});
        if(map.getZoom() !=11){ d3.selectAll("#line").remove()}
        if(map.getZoom() ==11){ labelsOnZoom(svg)}
    }

    map.on('zoom', reset);
    labelsOnZoom(svg);

}




const labelsOnZoom =(svgEl) =>{
    svgEl.append("text").text("Bernie Sanders").attr("class", "leaflet-zoom-hide").attr("transform","translate(350,328)").attr("id","line");
    svgEl.append("text").text("Won in Midtown").attr("class", "leaflet-zoom-hide").attr("transform","translate(350,339)").attr("id","line");
    svgEl.append("line").attr('x1',535).attr('x2',450).attr('y1',320).attr('y2',330).attr('stroke','black').attr("class", "leaflet-zoom-hide").attr("id","line");

    svgEl.append("text").text("Hilary Clinton").attr("class", "leaflet-zoom-hide").attr("transform","translate(900,500)").attr("id","line");
    svgEl.append("text").text("Won Biggest in").attr("class", "leaflet-zoom-hide").attr("transform","translate(900,511)").attr("id","line");
    svgEl.append("text").text("East Sac and South Sac/ 'The Pocket'").attr("class", "leaflet-zoom-hide").attr("transform","translate(900,522)").attr("id","line");
    svgEl.append("line").attr('x1',895).attr('x2',500).attr('y1',500).attr('y2',450).attr('stroke','black').attr("class", "leaflet-zoom-hide").attr("id","line");
    
    svgEl.append("line").attr('x1',895).attr('x2',625).attr('y1',500).attr('y2',320).attr('stroke','black').attr("class", "leaflet-zoom-hide").attr("id","line");
    
}



const fillPath =(d) =>{
    if(parseInt(d.properties["CountyResults _HILLARY CLINTON"]) > parseInt(d.properties["CountyResults _BERNIE SANDERS"])){
        return fill(0);
    }else if(parseInt(d.properties["CountyResults _HILLARY CLINTON"]) < parseInt(d.properties["CountyResults _BERNIE SANDERS"])){
        return fill(1);
    }else if(parseInt(d.properties["CountyResults _HILLARY CLINTON"]) == parseInt(d.properties["CountyResults _BERNIE SANDERS"])){
        return fill(2);
    }
}
