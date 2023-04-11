import React, { useState, useEffect } from 'react';

import { transpose } from 'csv-transpose';

// Load helpers.
import CSVtoJSON from './helpers/CSVtoJSON.js';
import ChartStackedColumn from './components/ChartStackedColumn2.jsx';

import '../styles/styles.less';

function Figure3() {
  // Data states.
  const [dataFigure, setDataFigure] = useState(false);

  const cleanData = (data) => data.map((el, i) => {
    // const labels = Object.keys(el).filter(val => val !== 'name').map(val => parseInt(val, 10));
    const values = Object.values(el).map(val => (parseFloat(val))).filter((val, j) => !Number.isNaN(val) && j > 0);
    return ({
      data: values,
      name: el.Name,
      showInLegend: true,
      stack: i,
      xAxis: 0
    });
  });

  useEffect(() => {
    const data_file = `${(window.location.href.includes('unctad.org')) ? 'https://storage.unctad.org/2023-tdr_report_update/' : './'}assets/data/2023-tdr_report_update_figure3.csv`;
    try {
      fetch(data_file)
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.text();
        })
        .then(body => setDataFigure(cleanData(CSVtoJSON(transpose(body)))));
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className="app">
      {dataFigure && (
      <ChartStackedColumn
        idx="3"
        data={dataFigure}
        note=""
        show_first_label
        source="UNCTAD"
        data_decimals={0}
        subtitle="Average growth rate 2002–2022"
        suffix=""
        title="Economic growth rate is falling in all regions"
        ymin={0}
        ymax={12}
        ylabel=""
      />
      )}
      <noscript>Your browser does not support JavaScript!</noscript>
    </div>
  );
}

export default Figure3;
