import './AnalysisImage.css';
import { useImageUpload } from '../../hooks/useImageUpload';
import InputImage from '../../components/InputImage/InputImage';
import { FaCar } from 'react-icons/fa';
import SuccessfulResult from './SuccessfulResult';
import DownloadPDF from '../../components/Download/DownloadPDF';

const AnalysisImage = () => {
  const {
    image,
    result,
    error,
    loading,
    handleSaveFile,
    uploadImage,
    clearData,
  } = useImageUpload();

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
            clearData={clearData}
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
                <SuccessfulResult result={result} />
              </tbody>
            </table>
            {result.is_car ? (
              <DownloadPDF
                result={result}
                docText="Análisis"
                docSave="análisis.pdf"
                gradient="linear-gradient(135deg, #3a98ad, #57c3d9)"
                type="car-analysis"
              />
            ) : (
              ''
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default AnalysisImage;
