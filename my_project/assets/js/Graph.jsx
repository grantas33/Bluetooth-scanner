import React, { Component } from 'react';
import '../css/app.css';
import {ResponsiveLine} from "nivo";

class Graph extends Component {
    constructor(props) {
        super(props);
        this.getChartData = this.getChartData.bind(this);
    }

    getChartData(data) {
        return [
            {
                id: "amount",
                color: "hsl(14, 70%, 50%)",
                data: data
            }
        ]
    }

    render() {
        return <ResponsiveLine
                        data={this.getChartData(this.props.data)}
                        margin={{
                            "top": 50,
                            "right": 60,
                            "bottom": 50,
                            "left": 60
                        }}
                        xScale={{
                            "type": "point"
                        }}
                        yScale={{
                            "type": "linear",
                            "stacked": true,
                            "min": "auto",
                            "max": "auto"
                        }}
                        minY="auto"
                        maxY="auto"
                        stacked={true}
                        axisBottom={{
                            "orient": "bottom",
                            "tickSize": 5,
                            "tickPadding": 5,
                            "tickRotation": 0,
                            "legend": "Laikas",
                            "legendOffset": 36,
                            "legendPosition": "center"
                        }}
                        axisLeft={{
                            "orient": "left",
                            "tickSize": 5,
                            "tickPadding": 5,
                            "tickRotation": 0,
                            "legend": "Įrenginių skaičius",
                            "legendOffset": -40,
                            "legendPosition": "center"
                        }}
                        enableDots={false}
                        enableDotLabel={false}
                        enableStackTooltip={false}

                    />
    }
}

export default Graph;
