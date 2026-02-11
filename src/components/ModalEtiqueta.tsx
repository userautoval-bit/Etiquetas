import ReactBarcode from 'react-barcode';
import './ModalEtiqueta.css';
import { gerarEtiquetaPdf } from '../pdf/etiquetaPdf';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  dados: any;
}

const ModalEtiqueta = ({ isOpen, onClose, dados }: Props) => {
  if (!isOpen || !dados) return null;

  const totalVolumes = Number(dados.qVol) || 1;

  return (
    <div className="modal-overlay">
      <div className="modal-content">

        <div className="modal-header">
          <h2 className="modal-titulo">Visualização da Etiqueta</h2>
          <button className="btn-close-green" onClick={onClose}>✕</button>
        </div>

        {/* === ETIQUETAS === */}
        <div className="etiquetas-wrapper-scroll">
          {Array.from({ length: totalVolumes }).map((_, index) => (
            <div className="print-page" key={index}>
              <div className="etiqueta-box etiqueta-print">

                {/* REMETENTE */}
                <div className="secao-remetente">
                  <span className="label-topo">REMETENTE</span>
                  <p className="txt-bold">{dados.remetenteNome}</p>

                  <div className="linha-cnpj-barcode-horizontal">
                    <span className="cnpj-texto">
                      CNPJ: {dados.remetenteCNPJ}
                    </span>

                    <ReactBarcode
                      value={String(dados.chaveAcesso)}
                      height={35}
                      width={1.1}
                      displayValue={false}
                    />
                  </div>
                </div>

                {/* DESTINATÁRIO */}
                <div className="secao-destinatario">
                  <span className="label-topo">DESTINATÁRIO</span>
                  <h1 className="dest-nome">{dados.destNome}</h1>

                  <p>
                    {dados.destLgr}, {dados.destNro} - {dados.destBairro}
                  </p>

                  <strong>
                    {dados.destMun} - {dados.destUF} • {dados.destCEP}
                  </strong>
                </div>

                {/* RODAPÉ */}
                <div className="secao-footer">
                  <div className="nf-container">
                    NF: <span className="nf-valor">{dados.nNF}</span>
                  </div>

                  <div className="vol-info">
                    {index + 1}/{totalVolumes} {dados.esp || 'CX'}
                  </div>
                </div>

                <div className="transportadora-nome">
                  {dados.transportadora}
                </div>

              </div>
            </div>
          ))}
        </div>

        <div className="modal-actions">
   
          <button
            className="btn-gerar"
            onClick={() => gerarEtiquetaPdf(dados, totalVolumes)}
          >
            GERAR ETIQUETA
          </button>
        </div>

      </div>
    </div>
  );
};

export default ModalEtiqueta;
