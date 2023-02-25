import { useState } from 'react';

function TabularVisualization() {
  const [linhas, setLinhas] = useState([]);

  const onChange = (event) => {
    const { value } = event.target;
    const novasLinhas = value.split('\n').map((linha) => {
      const [categoria, ...valores] = linha.split(':');
      return {
        categoria: categoria.trim(),
        valores: valores
          .join('')
          .split(',')
          .map((valor) => valor.trim()),
      };
    });
    setLinhas(novasLinhas);
  };

  let maxCategoriaLength = 0;

  linhas.forEach((linha) => {
    if (linha.categoria.length > maxCategoriaLength) {
      maxCategoriaLength = linha.categoria.length;
    }
  });

  return (
    <div>
      <textarea onChange={onChange} />
      <table>
        <thead>
          <tr>
            <th style={{ width: `${maxCategoriaLength * 8}px` }}>Categoria</th>
            {linhas.length > 0 &&
              linhas[0].valores.map((valor, index) => (
                <th
                  key={index}
                  style={{
                    width: `${(100 - maxCategoriaLength * 8) / linhas[0].valores.length}%`,
                  }}
                >
                  Valor {index + 1}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {linhas.map((linha, index) => (
            <tr key={index}>
              <td>{linha.categoria}</td>
              {linha.valores.map((valor, index) => (
                <td key={index}>{valor}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TabularVisualization;
