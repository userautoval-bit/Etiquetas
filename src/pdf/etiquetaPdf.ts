import jsPDF from 'jspdf';
import JsBarcode from 'jsbarcode';

interface EtiquetaDados {
  remetenteNome: string;
  remetenteCNPJ: string;

  destNome: string;
  destLgr: string;
  destNro: string;
  destBairro: string;
  destMun: string;
  destUF: string;
  destCEP: string;

  transportadora: string;
  chaveAcesso: string;
  nNF: number | string;
}

const txt = (v: any) => String(v ?? '');

export function gerarEtiquetaPdf(
  dados: EtiquetaDados,
  quantidade: number = 1
    
) {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'

    
  });


  const PAGE_HEIGHT = 297;
  const LABEL_HEIGHT = 135;
  const MARGIN = 10;
  const GAP = 7;

  let y = MARGIN;

  for (let i = 0; i < quantidade; i++) {
    desenharEtiqueta(pdf, dados, i + 1, quantidade, MARGIN, y);

    if (y + LABEL_HEIGHT * 2 + GAP <= PAGE_HEIGHT) {
      y += LABEL_HEIGHT + GAP;
    } else {
      pdf.addPage();
      y = MARGIN;
    }
  }

  const blob = pdf.output('blob');
const url = URL.createObjectURL(blob);
window.open(url);
}

function desenharEtiqueta(
  pdf: jsPDF,
  dados: EtiquetaDados,
  volumeAtual: number,
  totalVolumes: number,
  x: number,
  y: number
) {
  const width = 190;
  const height = 135;

  pdf.setLineWidth(0.6);
  pdf.rect(x, y, width, height);

  let cy = y + 10;

  // =============================
  // REMETENTE
  // =============================

  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.text('REMETENTE', x + 6, cy);
  cy += 8;

  pdf.setFontSize(14);
  pdf.text(txt(dados.remetenteNome), x + 6, cy);
  cy += 9;


 // =============================
// CNPJ + BARCODE LADO A LADO
// =============================

pdf.setFontSize(12);
pdf.setFont('helvetica', 'normal');

// CNPJ (lado esquerdo)
pdf.text(`CNPJ: ${txt(dados.remetenteCNPJ)}`, x + 6, cy);

// Criar barcode
const canvas = document.createElement('canvas');

JsBarcode(canvas, txt(dados.chaveAcesso), {
  format: 'CODE128',
  displayValue: false,
  height: 17,
  width: 0.7,
  margin: 0
});

const barcodeImg = canvas.toDataURL('image/png');

// Barcode lado direito
pdf.addImage(barcodeImg, 'PNG', x + 95, cy - 6, 85, 14);

cy += 20;


// =============================
// LINHA TRACEJADA SEPARADORA
// =============================
pdf.setDrawColor(0);
pdf.setLineWidth(0.5);

// Define padrão tracejado (4px traço, 2px espaço)
pdf.setLineDashPattern([2, 2], 0);

// Desenha linha horizontal
pdf.line(x + 5, cy, x + width - 5, cy);

// Volta para linha normal (remove tracejado)
pdf.setLineDashPattern([], 0);

cy += 8;

  // =============================
  // DESTINATÁRIO
  // =============================

  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.text('DESTINATÁRIO', x + 6, cy);
  cy += 10;

  pdf.setFontSize(30);
  pdf.setFont('helvetica', 'bold');

  const nomeQuebrado = pdf.splitTextToSize(
    txt(dados.destNome),
    width - 12
  );

  pdf.text(nomeQuebrado, x + 6, cy);
  cy += nomeQuebrado.length * 11;

  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'normal');

  const enderecoLinha = `${txt(dados.destLgr)}, ${txt(dados.destNro)} - ${txt(dados.destBairro)}`;
  pdf.text(enderecoLinha, x + 6, cy);
  cy += 8;

  const cidadeLinha = `${txt(dados.destMun)} - ${txt(dados.destUF)} • ${txt(dados.destCEP)}`;
  pdf.text(cidadeLinha, x + 6, cy);

  // =============================
  // RODAPÉ
  // =============================

  const footerY = y + height - 18;

  pdf.setFontSize(28);
  pdf.setFont('helvetica', 'bold');
  pdf.text(`NF: ${txt(dados.nNF)}`, x + 6, footerY);

  pdf.setFontSize(18);
  pdf.text(`${volumeAtual}/${totalVolumes} CX`, x + width - 50, footerY);

  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'normal');
  pdf.text(txt(dados.transportadora), x + 6, footerY + 10);
}
