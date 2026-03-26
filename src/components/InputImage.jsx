import './InputImage.css';
import { useImageUpload } from '../hooks/useImageUpload';

const InputImage = ({ endpoint }) => {
  const { image, handleSaveFile, uploadImage } = useImageUpload();
  return (
    <div className="upload-card">
      <h3 className="upload-title">Cargar imagen</h3>

      {/* Input file estilizado */}
      <label className="file-label">
        Seleccionar archivo
        <input type="file" onChange={handleSaveFile} className="file-input" />
      </label>

      {/* Preview */}
      <div className="preview-container">
        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="preview"
            className="preview-image"
          />
        )}
      </div>

      {/* Botón */}
      <button
        disabled={!image}
        className="analyze-button"
        onClick={() => uploadImage(endpoint)}
      >
        Analizar imagen
      </button>
    </div>
  );
};

export default InputImage;
