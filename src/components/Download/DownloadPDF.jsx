import './DownloadPDF.css';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const DownloadPDF = ({ result, docText, docSave, gradient, type }) => {
  const downloadPDF = () => {
    if (!result) return;

    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text(docText, 10, 10);

    let startY = 20;

    if (type === 'budget') {
      if (result.workshop) {
        doc.setFontSize(12);
        doc.text(`Taller: ${result.workshop}`, 10, startY);
        startY += 10;
      }

      autoTable(doc, {
        startY,

        head: [['Descripción', 'Precio']],

        body: result.items.map((item) => [
          item.description,
          `$${item.price.toLocaleString()}`,
        ]),
      });

      let finalY = doc.lastAutoTable.finalY + 10;

      if (result.subtotal !== null) {
        doc.setFontSize(14);
        doc.text(`Subtotal: $${result.subtotal.toLocaleString()}`, 10, finalY);
        finalY += 8;
      }

      if (result.iva !== null) {
        doc.setFontSize(14);
        doc.text(`IVA: $${result.iva.toLocaleString()}`, 10, finalY);
        finalY += 8;
      }

      if (result.discount !== null) {
        doc.setFontSize(14);
        doc.text(`Descuento: $${result.discount.toLocaleString()}`, 10, finalY);
        finalY += 8;
      }

      if (result.total !== null) {
        doc.setFontSize(15);
        doc.text(`Total: $${result.total.toLocaleString()}`, 10, finalY);
      }
    }

    if (type === 'car-analysis') {
      let body = [];

      if (result.is_car) {
        body.push([
          'Estado del auto',
          result.condition === 'damaged' ? 'Dañado' : 'En buen estado',
        ]);
      }

      if (result.is_car && result.condition === 'damaged') {
        body.push(['Descripción del daño', result.damage_description]);
      }

      autoTable(doc, {
        startY,

        head: [['Campo', 'Resultado']],

        body,
      });
    }

    doc.save(docSave);
  };

  return (
    <button
      onClick={downloadPDF}
      disabled={!result}
      style={{ background: gradient }}
      className="download-button"
    >
      Descargar PDF
    </button>
  );
};

export default DownloadPDF;
