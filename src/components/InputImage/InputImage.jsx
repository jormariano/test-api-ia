import './InputImage.css';

const InputImage = ({
  gradient,
  endpoint,
  image,
  handleSaveFile,
  uploadImage,
  clearData,
}) => {
  return (
    <div className="upload-image">
      <h3 className="upload-title">Cargar imagen</h3>
      <label className="file-label">
        Seleccionar archivo
        <input type="file" onChange={handleSaveFile} className="file-input" />
      </label>
      <div className="preview-container">
        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="preview"
            className="preview-image"
          />
        )}
      </div>
      <button
        disabled={!image}
        className="analyze-button"
        style={{ background: gradient }}
        onClick={() => uploadImage(endpoint)}
      >
        Analizar imagen
      </button>
      {image && (
        <button className="clear-button" onClick={clearData}>
          Borrar imagen
        </button>
      )}
    </div>
  );
};

export default InputImage;
