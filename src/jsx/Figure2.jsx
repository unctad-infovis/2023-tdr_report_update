import React, { useState, useEffect } from 'react';

// Load helpers.
import CSVtoJSON from './helpers/CSVtoJSON.js';
import ChartLine from './components/ChartLine.jsx';

import '../styles/styles.less';

function Figure2() {
  // Data states.
  const [dataFigure, setDataFigure] = useState(false);

  const cleanData = (data) => data.map((el, i) => {
    const labels = Object.keys(el).filter(val => val !== 'Name').map(val => Date.UTC(parseInt(val, 10), 0, 1));
    const values = Object.values(el).map(val => (parseFloat(val))).filter(val => !Number.isNaN(val));

    return ({
      data: values.map((e, j) => ({
        x: labels[j],
        y: e
      })),
      dashStyle: (i === 0) ? 'ShortDash' : 'Solid',
      label: {
        enabled: false
      },
      lineWidth: (i === 0) ? 3 : 5,
      name: el.Name,
      yAxis: 0
    });
  });

  useEffect(() => {
    const data_file = `${(window.location.href.includes('unctad.org')) ? 'https://storage.unctad.org/2023-tdr_report_update/' : './'}assets/data/2023-tdr_report_update_figure2.csv`;
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
      <ChartLine
        idx="2"
        data={dataFigure}
        note="Based on available corporate data from Akira Holding Foundation, Andersons Inc., Archer Daniels Midland Company, Bunge Ltd., Cargill Inc., CGB Enterprises, CHS Inc., Glencore Plc., Scoular Company, CMOC Group Ltd., COFCO Corporation, GrainCorp Ltd, OFI Group Ltd., OFI Group Ltd., Noble Group Ltd., Wilmar International Ltd."
        show_first_label
        source="UNCTAD secretariat calculations based on Orbis database"
        subtitle="Median food traders' profits and revenunes, 2019 = 100"
        suffix="%"
        title="Profits of food traders have grown rapidly since 2020"
        ylabel=""
      />
      )}
      <noscript>Your browser does not support JavaScript!</noscript>
    </div>
  );
}

export default Figure2;
