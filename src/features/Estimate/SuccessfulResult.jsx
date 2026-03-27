import DownloadPDF from '../../components/Download/DownloadPDF';

const SuccessfulResult = ({ result }) => {
  return (
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

      <DownloadPDF
        result={result}
        docText="Presupuesto"
        docSave={`${result.workshop || 'presupuesto'}.pdf`}
        gradient="linear-gradient(135deg, #5ea065, #87cd8d)"
        type="budget"
      />
    </section>
  );
};

export default SuccessfulResult;
