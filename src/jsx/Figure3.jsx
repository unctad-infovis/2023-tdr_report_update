import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { transpose } from 'csv-transpose';

// Load helpers.
import CSVtoJSON from './helpers/CSVtoJSON.js';
import ChartStackedColumn from './components/ChartStackedColumn2.jsx';

import '../styles/styles.less';

function Figure3({ lang }) {
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
    const data_file = `${(window.location.href.includes('unctad.org')) ? 'https://storage.unctad.org/2023-tdr_report_update/' : './'}assets/data/2023-tdr_report_update_figure3_${lang}.csv`;
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
  }, [lang]);

  return (
    <div className="app">
      {dataFigure && (
      <ChartStackedColumn
        data={dataFigure}
        data_decimals={0}
        idx="3"
        lang={lang}
        note=""
        show_first_label
        source={lang === 'fr' ? '<em>Source:</em> CNUCED' : (lang === 'es' ? '<em>Fuente:</em> UNCTAD' : '<em>Source:</em> UNCTAD')}
        subtitle={lang === 'fr' ? 'Taux de croissance moyens, 2002–2022' : (lang === 'es' ? 'Tasa media de crecimiento 2002-2022' : 'Average growth rate 2002–2022')}
        suffix=""
        title={lang === 'fr' ? 'Le taux de croissance économique diminue dans toutes les régions' : (lang === 'es' ? 'La tasa de crecimiento económico desciende en todas las regiones' : 'Economic growth rate is falling in all regions')}
        xcategories={lang === 'fr' ? ['Monde', 'Pays en développement<br />(sans la  Chine)', 'Chine'] : (lang === 'es' ? ['Mundo', 'Economías en desarrollo<br />(excluida China)', 'China'] : ['World', 'Developing economies<br />(excl. China)', 'China'])}
        xlabel={lang === 'fr' ? 'Année' : (lang === 'es' ? 'Año' : 'Year')}
        ylabel=""
        ymax={14}
        ymin={0}
      />
      )}
      <noscript>Your browser does not support JavaScript!</noscript>
    </div>
  );
}

Figure3.propTypes = {
  lang: PropTypes.string
};

Figure3.defaultProps = {
  lang: 'en'
};

export default Figure3;
