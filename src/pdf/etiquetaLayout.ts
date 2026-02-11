// src/pdf/etiquetaLayout.ts

/**
 * Todas as medidas estão em MILÍMETROS (mm)
 * Este arquivo define o CONTRATO do layout da etiqueta no PDF
 */

// =========================
// Página
// =========================
export const PAGE = {
  width: 210,   // A4 retrato
  height: 297,
};

// =========================
// Margens da página
// =========================
export const PAGE_MARGIN = {
  top: 10,
  bottom: 10,
  left: 10,
  right: 10,
};

// Área útil da página
export const PAGE_CONTENT = {
  width: PAGE.width - PAGE_MARGIN.left - PAGE_MARGIN.right,   // 190
  height: PAGE.height - PAGE_MARGIN.top - PAGE_MARGIN.bottom, // 277
};

// =========================
// Etiquetas por página
// =========================
export const LABELS_PER_PAGE = 2;

// Espaço vertical entre etiquetas
export const LABEL_GAP = 5;

// =========================
// Dimensão da etiqueta
// =========================
export const LABEL = {
  width: PAGE_CONTENT.width, // 190
  height: (PAGE_CONTENT.height - LABEL_GAP) / LABELS_PER_PAGE, // 136
};

// =========================
// Borda da etiqueta
// =========================
export const LABEL_BORDER = {
  lineWidth: 0.8, // espessura visual da borda
};

// =========================
// Grid interno da etiqueta
// =========================
export const LABEL_SECTIONS = {
  remetente: {
    height: 30,
    padding: {
      top: 4,
      left: 4,
      right: 4,
      bottom: 2,
    },
  },

  destinatario: {
    height: 60,
    padding: {
      top: 4,
      left: 4,
      right: 4,
      bottom: 4,
    },
  },

  rodape: {
    height: 30,
    padding: {
      top: 4,
      left: 4,
      right: 4,
      bottom: 2,
    },
  },

  transportadora: {
    height: 16,
    padding: {
      top: 2,
      left: 4,
      right: 4,
      bottom: 2,
    },
  },
};

// =========================
// Tipografia (referência)
// =========================
export const FONTS = {
  small: 8,
  normal: 10,
  medium: 12,
  large: 18,
  xlarge: 28,
  nf: 32,
};

// =========================
// Barcode
// =========================
export const BARCODE = {
  height: 18,
  marginTop: 4,
  marginBottom: 2,
};

// =========================
// Helpers de cálculo
// =========================

/**
 * Retorna a posição Y inicial de uma etiqueta
 * com base no índice dentro da página (0 ou 1)
 */
export function getLabelStartY(labelIndex: number): number {
  return (
    PAGE_MARGIN.top +
    labelIndex * (LABEL.height + LABEL_GAP)
  );
}
