import { useImageUpload } from '../../hooks/useImageUpload';
import InputImage from '../../components/InputImage';
import './Estimate.css';

const Estimate = () => {
  const { result, error, loading } = useImageUpload();

  console.log('Result devuelve: ', result);

  return (
    <div>
      <h1>Verifica tu presupuesto</h1>
      <InputImage endpoint="/api/estimate-image" />

      {loading && <p>Procesando...</p>}

      {error && <p>{error}</p>}

      {result && (
        <div className="result-container">
          {/* Taller */}
          {result.workshop && (
            <h2 className="workshop">Taller: {result.workshop}</h2>
          )}

          {/* Tabla de items */}
          <table className="budget-table">
            <thead>
              <tr>
                <th>Descripción</th>
                <th>Precio</th>
              </tr>
            </thead>

            <tbody>
              {result.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.description}</td>
                  <td>${item.price.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Resumen */}
          <div className="summary">
            {result.subtotal !== null && (
              <p>
                <strong>Subtotal:</strong> ${result.subtotal.toLocaleString()}
              </p>
            )}

            {result.iva !== null && (
              <p>
                <strong>IVA:</strong> ${result.iva.toLocaleString()}
              </p>
            )}

            {result.discount !== null && (
              <p>
                <strong>Descuento:</strong> ${result.discount.toLocaleString()}
              </p>
            )}

            {result.total !== null && (
              <p className="total">
                <strong>Total:</strong> ${result.total.toLocaleString()}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Estimate;
