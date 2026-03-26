import './Estimate.css';
import { useImageUpload } from '../../hooks/useImageUpload';
import InputImage from '../../components/InputImage';
import { FaWpforms } from 'react-icons/fa';

const Estimate = () => {
  const { image, result, error, loading, handleSaveFile, uploadImage } =
    useImageUpload();

  console.log('RESULT EN PADRE:', result);

  return (
    <div className="estimate-border">
      <div className="estimate-container">
        <div className="estimate-title">
          <FaWpforms className="card-icon estimate" />
          <h1>Verifica tu presupuesto</h1>
        </div>

        <InputImage
          endpoint="/api/estimate-image"
          gradient="linear-gradient(135deg, #5ea065, #87cd8d)"
          image={image}
          handleSaveFile={handleSaveFile}
          uploadImage={uploadImage}
        />

        {loading && (
          <p
            style={{
              color: 'green',
              background: 'white',
              padding: '0.5rem',
              borderRadius: '0.2rem',
            }}
          >
            Procesando...
          </p>
        )}

        {error && (
          <p
            style={{
              color: 'red',
              background: 'white',
              padding: '0.5rem',
              borderRadius: '0.2rem',
            }}
          >
            {error}
          </p>
        )}

        {result && (
          <section className="container-all-results">
            <h3>Presupuesto:</h3>

            <div className="result-container">
              {result.workshop && (
                <h2 className="workshop">Taller: {result.workshop}</h2>
              )}

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
                      <td className="table-label">{item.description}</td>
                      <td className="table-label-value">
                        ${item.price.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="summary">
                {result.subtotal !== null && (
                  <p>
                    <strong>Subtotal:</strong> $
                    {result.subtotal.toLocaleString()}
                  </p>
                )}

                {result.iva !== null && (
                  <p>
                    <strong>IVA:</strong> ${result.iva.toLocaleString()}
                  </p>
                )}

                {result.discount !== null && (
                  <p>
                    <strong>Descuento:</strong> $
                    {result.discount.toLocaleString()}
                  </p>
                )}

                {result.total !== null && (
                  <p className="total">
                    <strong>Total:</strong> ${result.total.toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Estimate;
