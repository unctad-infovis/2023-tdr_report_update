import React, { useState, useEffect } from 'react';

// Load helpers.
import CSVtoJSON from './helpers/CSVtoJSON.js';
import ChartStackedColumn from './components/ChartStackedColumn.jsx';

import '../styles/styles.less';

function Figure1() {
  // Data states.
  const [dataFigure, setDataFigure] = useState(false);

  const cleanData = (data) => data.map((el, i) => {
    // const labels = Object.keys(el).filter(val => val !== 'name').map(val => parseInt(val, 10));
    const values = Object.values(el).map(val => (parseFloat(val))).filter(val => !Number.isNaN(val));
    return ({
      data: values,
      name: el.Name,
      showInLegend: !((i >= 2)),
      stack: (i < 2) ? 'stack1' : 'stack2',
      xAxis: 0
    });
  });

  useEffect(() => {
    const data_file = `${(window.location.href.includes('unctad.org')) ? 'https://storage.unctad.org/2023-tdr_report_update/' : './'}assets/data/2023-tdr_report_update_figure1.csv`;
    try {
      fetch(data_file)
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.text();
        })
        .then(body => setDataFigure(cleanData(CSVtoJSON(body))));
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className="app">
      {dataFigure && (
      <ChartStackedColumn
        idx="1"
        data={dataFigure}
        note="DSSI-CF = Debt Service Suspension Initiative Common Framework"
        show_first_label
        source="UNCTAD"
        data_decimals={0}
        subtitle="Number of countries spending more money on dept compared to selected sectors, 2019–2021 vs. 2012–2014"
        suffix="%"
        title="Countries spending more on debt than on health care and education have increased sharply"
        ylabel=""
      />
      )}
      <noscript>Your browser does not support JavaScript!</noscript>
    </div>
  );
}

export default Figure1;
