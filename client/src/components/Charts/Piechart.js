import React, { Component,useEffect,useState } from 'react';
import { CanvasJS, CanvasJSChart } from 'canvasjs-react-charts';
import './Piechart.css'
class Piechart extends Component {
	render() {
		const options = {
			animationEnabled: true,
			exportFileName: "Where does your money go?",
			exportEnabled: true,
			title:{
				text: "Where does your money go?",
				fontColor:"white"
			},
            height:250,
            width:650,
            backgroundColor:'transparent',
			legend: {
                fontColor: "#F3E99F"
				// Change legend text color to black
            },
			data: [{
				type: "pie",
				showInLegend: true,
				legendText: "{label}",
				toolTipContent: "{label}: <strong>{y}%</strong>",
				indexLabel: "{y}%",
				indexLabelPlacement: "inside",
				dataPoints: [
					{ y: 32, label: "School necessities for children" },
					{ y: 22, label: "Oldage homes" },
					{ y: 15, label: "Clothes/Footwear" },
					{ y: 5, label: "Other NGOs" },
					{ y: 19, label: "Single moms" },
					{ y: 7, label: "Hospitals" }
				]
			}]
		}
		return (
		<div className='chart-container'>
			<CanvasJSChart options = {options}
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}
export default Piechart;    