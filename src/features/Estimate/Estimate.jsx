import './Estimate.css';
import { useImageUpload } from '../../hooks/useImageUpload';
import InputImage from '../../components/InputImage/InputImage';
import { FaWpforms } from 'react-icons/fa';
import SuccessfulResult from './SuccessfulResult';

const Estimate = () => {
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
          clearData={clearData}
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

        {result && !result.is_budget && (
          <p
            style={{
              color: 'red',
              background: 'white',
              padding: '0.5rem',
              borderRadius: '0.2rem',
            }}
          >
            La imagen no parece ser un presupuesto válido.
          </p>
        )}

        {result && result.is_budget && <SuccessfulResult result={result} />}
      </div>
    </div>
  );
};

export default Estimate;
