import { Usuario } from "./usuario/usuario";

export interface PedidoDTO {
    id: number;
    value: number;
    openDate: Date;
  }
  
  export interface RelatorioReceitaResponse {
    pedidos: PedidoDTO[];
    totalReceita: number;
  }

  export interface RelatorioClientesResponse {
    clientes: Usuario[]
  }

  