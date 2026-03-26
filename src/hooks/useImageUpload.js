import { useState } from 'react';

export const useImageUpload = () => {
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

  const uploadImage = async (endpoint) => {
    if (!image) {
      setError('Selecciona una imagen primero');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const base64 = await convertToBase64(image);

      const req = await fetch(endpoint, {
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

  return {
    image,
    result,
    error,
    loading,
    handleSaveFile,
    uploadImage,
  };
};
