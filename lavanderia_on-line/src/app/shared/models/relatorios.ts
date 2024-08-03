export interface PedidoDTO {
    id: number;
    value: number;
  }
  
  export interface RelatorioReceitaResponse {
    pedidos: PedidoDTO[];
    totalReceita: number;
  }

  