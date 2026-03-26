import { useImageUpload } from '../../hooks/useImageUpload';
import InputImage from '../../components/InputImage';

const AnalysisImage = () => {
  const { result, error, loading } = useImageUpload();

  return (
    <>
      <h1>Verifica el estado de tu auto</h1>
      <section className="container-input">
        <InputImage endpoint="/api/image-analysis" />
      </section>
      {result ? (
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
      ) : null}
    </>
  );
};

export default AnalysisImage;
