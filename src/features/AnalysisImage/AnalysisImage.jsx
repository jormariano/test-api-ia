import './AnalysisImage.css';
import { useImageUpload } from '../../hooks/useImageUpload';
import InputImage from '../../components/InputImage';
import { FaCar } from 'react-icons/fa';

const AnalysisImage = () => {
  const { image, result, error, loading, handleSaveFile, uploadImage } =
    useImageUpload();

  console.log('RESULT EN PADRE:', result);

  return (
    <div className="analysis-border">
      <div className="analysis-container">
        <div className="analysis-title">
          <FaCar className="card-icon car" />

          <h1>Verifica el estado de tu auto</h1>
        </div>

        <section className="container-input">
          <InputImage
            endpoint="/api/image-analysis"
            gradient="linear-gradient(135deg, #3a98ad, #57c3d9)"
            image={image}
            handleSaveFile={handleSaveFile}
            uploadImage={uploadImage}
          />
        </section>

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
            <h3>Análisis:</h3>

            <table className="result-table">
              <tbody>
                <tr>
                  <td className="table-label">La imagen:</td>

                  <td className="table-label-value">
                    {result.is_car ? 'Es un auto' : 'No es un auto'}
                  </td>
                </tr>

                {result.is_car && (
                  <tr>
                    <td className="table-label">Estado del auto:</td>

                    <td className="table-label-value">
                      {result.condition === 'damaged'
                        ? 'Dañado'
                        : 'En buen estado'}
                    </td>
                  </tr>
                )}

                {result.is_car && result.condition === 'damaged' && (
                  <tr>
                    <td className="table-label">Descripción del daño:</td>

                    <td className="table-label-value">
                      {result.damage_description}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>
        )}
      </div>
    </div>
  );
};

export default AnalysisImage;
