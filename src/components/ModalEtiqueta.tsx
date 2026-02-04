import ReactBarcode from 'react-barcode';
import './ModalEtiqueta.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  dados: any;
}

const ModalEtiqueta = ({ isOpen, onClose, dados }: Props) => {
  if (!isOpen || !dados) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Visualização da Etiqueta</h2>
          <button className="btn-close-green" onClick={onClose}>✕</button>
        </div>

        <div id="etiqueta-print" className="etiqueta-box">
          <div className="secao-remetente">
            <span className="label-topo">REMETENTE</span>
            <div className="remetente-info">
              <p className="txt-bold">{dados.remetenteNome}</p>
              
              {/* Layout horizontal para CNPJ e Barcode */}
              <div className="linha-cnpj-barcode-horizontal">
                <span className="cnpj-texto">CNPJ: {dados.remetenteCNPJ}</span>
                <div className="barcode-container">
                  <ReactBarcode 
                    value={String(dados.chaveAcesso)} 
                    height={35} 
                    width={1.1}
                    displayValue={false} 
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="secao-destinatario">
            <span className="label-topo">DESTINATÁRIO</span>
            <h1 className="dest-nome">{dados.destNome}</h1>
            <p className="dest-endereco">{dados.destLgr}, {dados.destNro} - {dados.destBairro}</p>
            <div className="dest-cidade-uf">
               <span>{dados.destMun} - {dados.destUF}</span>
               <span className="negrito">{dados.destCEP}</span>
            </div>
          </div>

          <div className="secao-footer">
            <div className="footer-item"><strong>NF:</strong> {dados.nNF}</div>
            <div className="footer-item">{dados.qVol} {dados.esp}</div>
          </div>
          
          <div className="transportadora-nome">
            {dados.transportadora}
          </div>
        </div>

        <div className="modal-footer-acoes">
          <button className="btn-imprimir-destaque" onClick={() => window.print()}>
            🖨️ IMPRIMIR ETIQUETA
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEtiqueta;