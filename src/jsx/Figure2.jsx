import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Load helpers.
import CSVtoJSON from './helpers/CSVtoJSON.js';
import ChartLine from './components/ChartLine.jsx';

import '../styles/styles.less';

function Figure2({ lang }) {
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
    const data_file = `${(window.location.href.includes('unctad.org')) ? 'https://storage.unctad.org/2023-tdr_report_update/' : './'}assets/data/2023-tdr_report_update_figure2_${lang}.csv`;
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
  }, [lang]);

  return (
    <div className="app">
      {dataFigure && (
      <ChartLine
        data={dataFigure}
        idx="2"
        lang={lang}
        note={lang === 'fr' ? '<em>Note:</em> Sur la base des données disponibles des entreprises suivantes : Akira Holding Foundation, Andersons Inc, Archer Daniels Midland Company, Bunge Ltd, Cargill Inc, CGB Enterprises, CHS Inc, Glencore Plc, Scoular Company, CMOC Group Ltd, COFCO Corporation, GrainCorp Ltd, OFI Group Ltd, OFI Group Ltd, Noble Group Ltd, Wilmar International Ltd.' : (lang === 'es' ? '<em>Nota:</em> Basado en los datos corporativos disponibles de Akira Holding Foundation, Andersons Inc., Archer Daniels Midland Company, Bunge Ltd., Cargill Inc., CGB Enterprises, CHS Inc., Glencore Plc., Scoular Company, CMOC Group Ltd., COFCO Corporation, GrainCorp Ltd., OFI Group Ltd., OFI Group Ltd., Noble Group Ltd., Wilmar International Ltd., y otros.' : '<em>Note:</em> Based on available corporate data from Akira Holding Foundation, Andersons Inc., Archer Daniels Midland Company, Bunge Ltd., Cargill Inc., CGB Enterprises, CHS Inc., Glencore Plc., Scoular Company, CMOC Group Ltd., COFCO Corporation, GrainCorp Ltd, OFI Group Ltd., OFI Group Ltd., Noble Group Ltd., Wilmar International Ltd.')}
        show_first_label
        source={lang === 'fr' ? '<em>Source:</em> Calculs du secrétariat de la CNUCED basés sur la base de données Orbis' : (lang === 'es' ? '<em>Fuente:</em> Cálculos de la secretaría de la UNCTAD a partir de la base de datos Orbis' : '<em>Source:</em> UNCTAD secretariat calculations based on Orbis database')}
        subtitle={lang === 'fr' ? 'Bénéfices et revenus médians des négociants en denrées alimentaires, 2019 = 100' : (lang === 'es' ? 'Mediana de los beneficios y revenunes de los comerciantes de alimentos, 2019 = 100' : 'Median food traders\' profits and revenunes, 2019 = 100')}
        title={lang === 'fr' ? 'Les bénéfices des négociants en denrées alimentaires ont augmenté rapidement' : (lang === 'es' ? 'Los beneficios de los comerciantes de alimentos han crecido rápidamente' : 'Profits of food traders have grown rapidly')}
        xlabel={lang === 'fr' ? 'Année' : (lang === 'es' ? 'Año' : 'Year')}
        ylabel=""
      />
      )}
      <noscript>Your browser does not support JavaScript!</noscript>
    </div>
  );
}

Figure2.propTypes = {
  lang: PropTypes.string
};

Figure2.defaultProps = {
  lang: 'en'
};

export default Figure2;
