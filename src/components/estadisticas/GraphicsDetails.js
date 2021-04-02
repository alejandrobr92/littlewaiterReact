import React, { useState, useEffect } from 'react';
import { Line, Bar, Pie, Doughnut, Radar, Polar } from 'react-chartjs-2';

function GraphicsDetails() {
  const [data, setData] = useState({ charData: {} });
  useEffect(() => {
    setData({
      charData: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
        datasets: [
          {
            label: '# items',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
          {
            label: 'Quantity',
            // data: [13, 49, 33, 66, 77, 46],
            // backgroundColor: 'orange',
            // borderColor: 'red',
          },
        ],
      },
    });
  }, []);
  return (
    <>
      <Line
        data={data.charData}
        height={100}
        width={400}
        options={{
          // maintainAspectRatio: false,
          title: { display: true, text: 'sells', fontSize: 14 },
          legend: { display: true, position: 'top', labels: { fontSize: 23 } },
        }}
      />
      <Bar
        data={data.charData}
        height={100}
        width={400}
        options={{
          // maintainAspectRatio: false,
          title: { display: true, text: 'sells', fontSize: 14 },
          legend: { display: true, position: 'top', labels: { fontSize: 23 } },
        }}
      />
      <Pie
        data={data.charData}
        height={100}
        width={400}
        options={{
          // maintainAspectRatio: false,
          title: { display: true, text: 'sells', fontSize: 14 },
          legend: { display: true, position: 'top', labels: { fontSize: 23 } },
        }}
      />
      <Doughnut
        data={data.charData}
        height={100}
        width={400}
        options={{
          // maintainAspectRatio: false,
          title: { display: true, text: 'sells', fontSize: 14 },
          legend: { display: true, position: 'top', labels: { fontSize: 23 } },
        }}
      />
      <Radar
        data={data.charData}
        height={100}
        width={400}
        options={{
          // maintainAspectRatio: false,
          title: { display: true, text: 'sells', fontSize: 14 },
          legend: { display: true, position: 'top', labels: { fontSize: 23 } },
        }}
      />
      <Polar
        data={data.charData}
        height={100}
        width={400}
        options={{
          // maintainAspectRatio: false,
          title: { display: true, text: 'sells', fontSize: 14 },
          legend: { display: true, position: 'top', labels: { fontSize: 23 } },
        }}
      />
    </>
  );
}

export default GraphicsDetails;
