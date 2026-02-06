import { PDFDocument, StandardFonts } from 'pdf-lib';

export async function testePdf() {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([300, 200]);

  const font = await pdf.embedFont(StandardFonts.HelveticaBold);

  page.drawText('PDF OK!', {
    x: 50,
    y: 100,
    size: 24,
    font,
  });

  const bytes = await pdf.save();

  const url = URL.createObjectURL(
    new Blob([new Uint8Array(bytes)], { type: 'application/pdf' })
  );

  window.open(url);
}
