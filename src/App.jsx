import { useState } from 'react';

import './App.css';

function App() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSaveFile = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleUploadImage = async () => {
    if (!image) {
      setError('Selecciona una imagen primero');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const base64 = await convertToBase64(image);

      const req = await fetch('/api/image-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageBase64: base64,
        }),
      });

      const res = await req.json();

      console.log('Respuesta backend:', res);

      setResult(res);
    } catch (error) {
      console.error(error);
      setError('Error al analizar la imagen');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container">
      <section className="container-input">
        <div className="div-input">
          <label htmlFor="uploadImage">
            Por favor, carga la imagen a analizar:
          </label>
          <input type="file" id="uploadImage" onChange={handleSaveFile} />
        </div>
        <div>
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="preview"
              style={{ maxWidth: '300px' }}
            />
          )}
        </div>
        <button className="button" onClick={handleUploadImage}>
          Analizar imagen
        </button>
      </section>
      <section className="container-all-results">
        <h3>Resultado: </h3>
        <div>
          {loading ? (
            <p>Cargando...</p>
          ) : error ? (
            <p style={{ color: 'red' }}>{error}</p>
          ) : result ? (
            <div className="container-result">
              <div className="container-result-image">
                <p className="result-p"> La imagen: </p>
                {result.is_car ? (
                  <p>Es un auto</p>
                ) : (
                  <p>Lo siento, la imagen cargada, no es un auto.</p>
                )}
              </div>

              {result.is_car && (
                <>
                  <div className="container-result-state">
                    <p className="result-p">Estado del auto: </p>
                    {result.condition === 'damaged' ? (
                      <p>Dañado</p>
                    ) : (
                      <p>En buen estado</p>
                    )}
                  </div>

                  <div>
                    {result.condition === 'damaged' && (
                      <>
                        <p className="result-p">Descripción del daño:</p>
                        <p>{result.damage_description}</p>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}

export default App;
