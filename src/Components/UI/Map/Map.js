import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMap from "highcharts/modules/map";
import proj4 from "proj4";
import map from "@highcharts/map-collection/custom/world.geo.json"
highchartsMap(Highcharts); // Initialize the map module

export default function MapChart(props){
    
    if (typeof window !== "undefined") {
        window.proj4 = window.proj4 || proj4;
    }

    const formattedData = props.data.filter((el) => el.properties.mag >= props.startMag).map((el) => {
        return {
            z:el.properties.mag,
            keyword: el.properties.place,
            lat: el.geometry.coordinates[1],
            lon: el.geometry.coordinates[0]
        }
    } )

    console.log(formattedData)

    const mapOptions = {
        chart: {
          map: map,
          backgroundColor:"#00000066",
          borderRadius: "25px"
        },
        title: {
          text: "Earthquakes by position",
          style:{
            color: '#cccccc'
            }
        },
        credits: {
          enabled: false
        },
        subtitle: {
          text: 'Source: <a href="https://earthquake.usgs.gov/">https://earthquake.usgs.gov/</a>'
        },
        mapNavigation: {
          enabled: false
        },
        tooltip: {
          headerFormat: "",
          pointFormat: "Position: {point.keyword}, Magnitudo: {point.z}"
        },
        series: [
          {
            // Use the gb-all map with no data as a basemap
            name: "Basemap",
            mapData: map,
            borderColor: "#373737",
            nullColor: "rgba(100, 100, 100, 1.0)",
            showInLegend: false
          },
          {
            // Specify points using lat/lon
            type: "mapbubble",
            name: "Locations",
            color: "#7A080044",
            data: formattedData,
            minSize: "1%",
            maxSize: "12%",
            cursor: "pointer",
            point: {
              events: {
                click: function() {
                  console.log(this.keyword);
                }
              }
            }
          }
        ]
      };

    return <div>
                <HighchartsReact
                constructorType={"mapChart"}
                highcharts={Highcharts}
                options={mapOptions}
                />
            </div>
}