// List of chart
export const chartList = ["line", "bar", "pie", "doughnut", "bubble", "stacked-bar"];
// Label list
export const labels = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL"];
// Background color values for chart
export const backgroundColor = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 205, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(201, 203, 207, 0.2)'
  ];
// Border color values for chart
export const borderColor =[
    'rgb(255, 99, 132)',
    'rgb(255, 159, 64)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(54, 162, 235)',
    'rgb(153, 102, 255)',
    'rgb(201, 203, 207)'
  ]
// Data values for chart
export const dataValue = [65, 59, 80, 81, 56, 55, 40];

/**
 * Function for to get chart values
 * @param {*} val String
 * @param {*} type Dtring
 * @returns 
 */
export function getChart( val, type ){
    let value;
    switch(val){
        case 'line':
            value = {
                labels: labels,
                datasets: [{
                  label: type === 'line' ? 'Line Chart' : 'Bar Chart',
                  data: dataValue,
                  fill: false,
                  borderColor: type === 'line' ? 'rgb(75, 192, 192)': borderColor,
                  backgroundColor: type === 'line' ? '' : backgroundColor,
                  tension: 0.1,
                  borderWidth: 1
                }]
              };
        break;
        case 'bar':
        case 'bar-one':
            value = {
                labels: labels,
                datasets: [{
                  label: 'Bar Chart',
                  data: dataValue,
                  backgroundColor,
                  borderColor,
                  borderWidth: 1
                }]
              };
        break;
        case 'pie':
            value = {
                labels: labels,
                datasets: [{
                  label: 'Pie Chart',
                  data: dataValue,
                  backgroundColor:borderColor,
                  hoverOffset: 4
                }]
              };
        break;
        case 'doughnut':
            value = {
                labels: labels,
                datasets: [{
                  label: 'Doughnut Chart',
                  data: dataValue,
                  backgroundColor: borderColor,
                  hoverOffset: 4
                }]
              };
        break;
        case 'bubble':
            value = {
                datasets: [{
                  label: 'Bubble Chart',
                  data: [{
                    x: 20,
                    y: 30,
                    r: 15
                  }, {
                    x: 40,
                    y: 10,
                    r: 10
                  },
                  {
                    x: 70,
                    y: 50,
                    r: 30
                  }],
                  backgroundColor: 'rgb(255, 99, 132)'
                }]
              };
        break;
        case 'stacked-bar':
            value = {
                labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL"],
                datasets: [
                  {
                    label: 'Dataset 1',
                    data: ['Strategy 1', 100, 101, 140],
                    backgroundColor: 'rgb(255, 205, 86)',
                  },
                  {
                    label: 'Dataset 2',
                    data: ['Strategy 2', 105, 140, 144],
                    backgroundColor: 'rgb(255, 159, 64)',
                  },
                  {
                    label: 'Dataset 3',
                    data: ['Strategy 3', 120, 80, 160],
                    backgroundColor: 'rgb(255, 99, 132)',
                  },
                ]
              };
        break;
        default:
            value = {
                labels: labels,
                datasets: [{
                  label: 'Line Chart',
                  data: dataValue,
                  fill: false,
                  borderColor: 'rgb(75, 192, 192)',
                  tension: 0.1
                }]
              };
    }
    return value;

}