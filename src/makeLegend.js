import * as d3 from 'd3';
import { fill, width } from './makeMap'
//creating the legend 

export const makeLegend=(element) =>{
const legendSvg = d3.select(element).append("svg").attr('width',width).attr('height', 18);
legendSvg.append("circle").attr('cy', 8).attr('cx',7).attr("fill",fill(0)).attr("r",5);
legendSvg.append("text").attr("transform","translate(13,13)").text("Hillary Clinton");

legendSvg.append("circle").attr('cy', 8).attr('cx',128).attr("fill",fill(1)).attr("r",5);
legendSvg.append("text").attr("transform","translate(134,13)").text("Bernie Sanders");

legendSvg.append("circle").attr('cy', 8).attr('cx',258).attr("fill",fill(2)).attr("r",5);
legendSvg.append("text").attr("transform","translate(264,13)").text("Tie");

legendSvg.append("text").attr("transform","translate(585,13)").text("Click to see vote count, zoom and explore.");

}