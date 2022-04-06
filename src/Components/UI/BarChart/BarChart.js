import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


export default function BarChart(props){

    let earthquakes = props.data.map((el) => el.properties.mag).filter((el) => el > 0)

    let rangeObject = {}

    for (let i = 1; i <= 10; i++) {
        rangeObject[`${i - 1} - ${i}`] = 0    
    }

    let rangeValues = Object.entries(earthquakes.reduce((t,n) => {
        const ceil = Math.ceil(n);

        t[`${ceil - 1} - ${ceil}`] ?
        t[`${ceil - 1} - ${ceil}`]++ :
        t[`${ceil - 1} - ${ceil}`] = 1;

        return t
    }, rangeObject),
    ). sort((a,b) => a[0].split('- ')[1] - b[0].split('- ')[1])

    const options = {
        chart: {
            type: 'column',
            backgroundColor: '#00000066',
            borderRadius: '25px'
        },
        title: {
            text: 'Earthquakes by magnitudo',
            style: {
                color: '#cccccc'
            }
        },
        credits: {
            enabled: false
        },
        subtitle: {
            text: 'Source: <a href="https://earthquake.usgs.gov/">https://earthquake.usgs.gov/</a>'
        },
        xAxis: {
            categories: rangeValues.map((el) => el[0]),
            title: {
                text: 'Magnitudo (R. scale)'
            }
        },
        yAxis: {
            categories: null,
            title: {
                text: null
            }
        },
        series: [{
            name: 'Events number',
            data: rangeValues.map((el) => el[1])
        }]
    };

    return <HighchartsReact highcharts={Highcharts} options={options}/>
}