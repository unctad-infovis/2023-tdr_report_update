import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Load helpers.
import CSVtoJSON from './helpers/CSVtoJSON.js';
import ChartStackedColumn from './components/ChartStackedColumn.jsx';

import '../styles/styles.less';

function Figure1({ lang }) {
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
    const data_file = `${(window.location.href.includes('unctad.org')) ? 'https://storage.unctad.org/2023-tdr_report_update/' : './'}assets/data/2023-tdr_report_update_figure1_${lang}.csv`;
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
  //
  return (
    <div className="app">
      {dataFigure && (
      <ChartStackedColumn
        data={dataFigure}
        data_decimals={0}
        idx="1"
        lang={lang}
        note={lang === 'fr' ? '<em>Note:</em> Cadre commun de l\'Initiative de suspension du service de la dette ISSD' : (lang === 'es' ? '<em>Nota:</em> DSSI-CF = Marco Común de la Iniciativa de Suspensión del Servicio de la Deuda' : '<em>Note:</em> DSSI-CF = Debt Service Suspension Initiative Common Framework')}
        show_first_label
        source={lang === 'fr' ? '<em>Source:</em> CNUCED' : (lang === 'es' ? '<em>Fuente:</em> UNCTAD' : '<em>Source:</em> UNCTAD')}
        subtitle={lang === 'fr' ? 'Nombre de pays consacrant plus d\'argent à la dette qu\'à certains autres secteurs, 2019-2021 vs. 2012-2014' : (lang === 'es' ? 'Número de países que gastan más dinero en deuda en comparación con sectores seleccionados, 2019-2021 frente a 2012-2014' : 'Number of countries spending more money on dept compared to selected sectors, 2019–2021 vs. 2012–2014')}
        suffix="%"
        title={lang === 'fr' ? 'Pays dépensant plus pour le service de la dette que pour l\'éducation ou la santé' : (lang === 'es' ? 'Los países que gastan más en deuda que en sanidad y educación han aumentado considerablemente' : 'Countries spending more on debt than on health care and education have increased sharply')}
        xcategories={lang === 'fr' ? ['Education', 'Santé'] : (lang === 'es' ? ['Educación', 'Sanidad'] : ['Education', 'Health'])}
        xlabel={lang === 'fr' ? ' pays' : (lang === 'es' ? ' países' : ' countries')}
        ylabel=""
        ymax={70}
      />
      )}
      <noscript>Your browser does not support JavaScript!</noscript>
    </div>
  );
}

Figure1.propTypes = {
  lang: PropTypes.string
};

Figure1.defaultProps = {
  lang: 'en'
};

export default Figure1;
