const SuccessfulResult = ({ result }) => {
  return (
    <>
      {result.is_car && (
        <tr>
          <td className="table-label">Estado del auto:</td>

          <td className="table-label-value">
            {result.condition === 'damaged' ? 'Dañado' : 'En buen estado'}
          </td>
        </tr>
      )}

      {result.is_car && result.condition === 'damaged' && (
        <tr>
          <td className="table-label">Descripción del daño:</td>

          <td className="table-label-value">{result.damage_description}</td>
        </tr>
      )}
    </>
  );
};

export default SuccessfulResult;
