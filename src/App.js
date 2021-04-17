import React, { useEffect, useState } from "react";
import './App.css';
import { Chart, registerables } from 'chart.js';
import { getRequest, saveOrUpdateRequest} from './utils/apiUtils'
import { getChart, chartList } from './utils/util'
Chart.register(...registerables);

export default function App() {
  const [type, setType] = useState('line');
  const [drag, setDrag] = useState();
  const [chart, setChart] = useState([]);
  const [chartId, setChartId] = useState();

  useEffect(
    () => {
      const getChartList = () => {
        getRequest({url: 'chart'})
          .then(response => {
            setChart(response[0].chart)
            setType(response[0].type)
            setChartId(response[0]._id)
          })
          .catch(error => {
            console.log({error});
          });
      };
      getChartList();
    },
    []
  );

  useEffect(() => {
    chart && chart.map((val, i) => {
      if(chartList.includes(val)){
        const ctx = document.getElementById(val);
        new Chart(ctx, {
          type: val === 'stacked-bar' ? 'bar' : val,
          data: getChart(val, type),
          options: val === 'stacked-bar' ? {
            plugins: {
              title: {
                display: true,
                text:  'Stacked Bar Chart'
              },
            },
            responsive: true,
            scales: {
              x: {
                stacked: true,
              },
              y: {
                stacked: true
              }
            }
          } : {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    })
  }, [chart]);

  useEffect(() => {
      const ctx = document.getElementById(type);
      new Chart(ctx, {
        type: type === 'line' ? 'line' : 'bar',
        data: getChart(type, type),
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });    
  }, [type]);

  function onChangeType(val) {
    setType(val.target.value)
    saveOrUpdateRequest({
      url: `chart/${chartId}`,
      data: {
        chart,
        type:val.target.value
      },
      method: 'PATCH'
    })
      .then(response => {
        console.log({response})
      })
      .catch(error => {
        console.log({error});
      });
  }

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragLeave = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setDrag(id);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    var drop_target = document.getElementById(id);
    var drag_target = document.getElementById(drag);
    var tmp = document.createElement('span');
    tmp.className='hide';
    drop_target.before(tmp);
    drag_target.before(drop_target);
    tmp.replaceWith(drag_target);
    
    var newPlace = chart[id];
    chart[id] = chart[drag];
    chart[drag] = newPlace;
    setChart(chart)

    saveOrUpdateRequest({
      url: `chart/${chartId}`,
      data: {
        chart,
        type
      },
      method: 'PATCH'
    })
      .then(response => {
        console.log({response})
      })
      .catch(error => {
        console.log({error});
      });
  };
  
  return (
    <div className="flex-container" id="parent">
      {
        chart && chart.map((val, i) => {
          return(<>
         { chartList.includes(val) && <div className="resize both" key={i} id={i} draggable="true" 
          onDrop={e => handleDrop(e, i)} 
          onDragOver={e => handleDragOver(e)} 
          onDragEnter={e => handleDragEnter(e)}  
          onDragLeave={e => handleDragLeave(e,i)}>
            {val === "line" && <div style={{height: "60px",marginTop: "-10px"}}>
              <label htmlFor="cars">Choose Chart Type:</label>
              <select name="types" id="types" value={type} onChange={onChangeType}>
                <option value="line">Line</option>
                <option value="bar-one">Bar</option>
              </select>
            </div>}
            {type !== 'line' && type === 'bar-one' && val === "line" && <canvas id='bar-one' width="400" height="250"/>}
            {type !== 'bar-one' && type === 'line' && val === "line" && <canvas id={val} width="400" height="250"/>}
            { val !== "line" && <canvas id={val} width="400" height="250"/>}
          </div>}
          </>)
        })
      }
    </div>
  );
}
