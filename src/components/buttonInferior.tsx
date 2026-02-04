import { XMLParser } from 'fast-xml-parser';

interface Props {
  file: File | null;
  onDadosExtraidos: (dados: any) => void;
}

function ButtonInferior({ file, onDadosExtraidos }: Props) {

  const handleProcessarXML = () => {
    if (!file) {
      alert("Por favor, selecione um arquivo XML primeiro!");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const xmlText = e.target?.result as string;

      // Configuração para capturar atributos (como o Id="NFe...") e remover prefixos (ns1:)
      const parser = new XMLParser({
        ignoreAttributes: false, // IMPORTANTE: para pegar o Id da chave
        attributeNamePrefix: "", // Remove o prefixo @_ dos atributos
        removeNSPrefix: true     // Remove o ns1: das tags
      });

      try {
        const result = parser.parse(xmlText);
        
        // Caminho flexível para NF-e processada ou apenas a NF-e
        const inf = result.nfeProc?.NFe?.infNFe || result.NFe?.infNFe || result.infNFe;

        if (inf) {
          const dadosParaEtiqueta = {
            // Captura o atributo Id da tag infNFe (Chave de Acesso)
            chaveAcesso: inf.Id || "", 

            // REMETENTE
            remetenteNome: inf.emit?.xNome || "Não encontrado",
            remetenteCNPJ: inf.emit?.CNPJ || inf.emit?.CPF || "",

            // DESTINATÁRIO
            destNome: inf.dest?.xNome || "Não encontrado",
            destLgr: inf.dest?.enderDest?.xLgr || "",
            destNro: inf.dest?.enderDest?.nro || "",
            destBairro: inf.dest?.enderDest?.xBairro || "",
            destMun: inf.dest?.enderDest?.xMun || "",
            destUF: inf.dest?.enderDest?.UF || "",
            destCEP: inf.dest?.enderDest?.CEP || "",

            // DADOS NF E VOLUMES
            nNF: inf.ide?.nNF || "",
            qVol: inf.transp?.vol?.qVol || "1",
            esp: inf.transp?.vol?.esp || "VOL",
            
            // Transportadora (na sua imagem costuma ser o próprio emitente se for frete próprio)
            transportadora: inf.transp?.transporta?.xNome || inf.emit?.xNome
          };

          console.log("Dados extraídos com sucesso:", dadosParaEtiqueta);
          onDadosExtraidos(dadosParaEtiqueta);
        } else {
          alert("Estrutura da NF-e não encontrada no arquivo.");
        }
      } catch (err) {
        console.error("Erro ao fazer o parse do XML:", err);
        alert("Erro ao ler o arquivo XML. Verifique o formato.");
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="pg-btn-inferior">
      <button className="btn-inferior" onClick={handleProcessarXML}>
        <span className="sptx-inferior">Visualizar Modelo</span>
      </button>
    </div>
  );
}

export default ButtonInferior;