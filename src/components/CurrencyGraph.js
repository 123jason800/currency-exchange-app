import {
    XYPlot,
    XAxis,
    YAxis,
    LineSeries,
  } from 'react-vis';
import '../../node_modules/react-vis/dist/style.css';
import AutoSizer from 'react-virtualized-auto-sizer';
import moment from 'moment';

const CurrencyGraph = ({graphData, symbol, base}) => (
  
 <div className="col-12 my-3 graph">
    <h3 className="text-center">{base}-{symbol}</h3>
    <AutoSizer>
    {({width,height}) => (
      <XYPlot
      margin={{left: 50}}
      xType="time-utc"
      animation={2}
      width={width}
      height={height}
      >
        <LineSeries
          className="linemark-series-example"
          style={{
            strokeWidth: '2px'
          }}
          size={1}
          data={graphData}
        />  
        <XAxis 
        tickTotal={6} 
        tickFormat={(v) =>  moment(v).format('MM/DD')}
        />
        <YAxis 
        tickFormat={v => v.toFixed(3)}
        />  
    </XYPlot>)}
  </AutoSizer>
</div>
);

export default CurrencyGraph;