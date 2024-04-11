import { Component } from '@angular/core';

// classe que representa as peças de roupa
export class itemRoupa {
  nome: string;
  valor: number;
  prazo: string;
}

@Component({
  selector: 'app-pedido-online',
  templateUrl: './pedido-online.component.html',
  styleUrls: ['./pedido-online.component.css']
})
export class PedidoOnlineComponent {

// prazo = quantidade de dias
  itens: itemRoupa[] = [
    { nome: "Blusa", valor: 5.50, prazo: "1" },
    { nome: "Calça", valor: 7.00, prazo: "1" },
    { nome: "Calcinha", valor: 2.00, prazo: "1" },
    { nome: "Camisa", valor: 7.00, prazo: "1" },
    { nome: "Camiseta", valor: 3.00, prazo: "1" },
    { nome: "Casaco", valor: 10.00, prazo: "2" },
    { nome: "Cueca", valor: 2.00, prazo: "1" },
    { nome: "Gravata", valor: 1.00, prazo: "1" },
    { nome: "Jaqueta", valor: 10.00, prazo: "2" },
    { nome: "Meia", valor: 1.00, prazo: "1" },
    { nome: "Moletom", valor: 9.50, prazo: "2" },
    { nome: "Pijama", valor: 12.00, prazo: "1" },
    { nome: "Regata", valor: 3.00, prazo: "2" },
    { nome: "Roupa de Banho", valor: 6.00, prazo: "1" },
    { nome: "Saia", valor: 5.00, prazo: "1" },
    { nome: "Shorts", valor: 5.00, prazo: "1" },
    { nome: "Suéter", valor: 12.00, prazo: "3" },
    { nome: "Terno", valor: 25.00, prazo: "3" },
    { nome: "Vestido", valor: 10.00, prazo: "2" }
  ];

  // Item selecionado pelo usuário
  itemSelecionado: itemRoupa;

  // Quantidade de itens a serem adicionados ao carrinho
  quantidade: number = 1;

  // Lista de itens adicionados ao carrinho
  itensPedido: { item: itemRoupa, quantidade: number }[] = [];

  // Total de itens no carrinho
  totalPedido: number = 0;

  constructor() { }

  // Função para adicionar um item ao carrinho
  adicionarItemPedido() {

    if (!this.itemSelecionado) {
      alert("Por favor, selecione uma peça de roupa");
      return;
    }

    if (this.quantidade === 0) {
      alert("Por favor, insera a quantidade de peças");
      return;
    }
    let itemPedido = { item: this.itemSelecionado, quantidade: this.quantidade };
    this.itensPedido.push(itemPedido);
    this.totalPedido += this.itemSelecionado.valor * this.quantidade;
  }

  // Função para remover um item do carrinho
  removerItemPedido(index: number) {
    let itemRemovido = this.itensPedido[index];
    this.itensPedido.splice(index, 1);
    this.totalPedido -= itemRemovido.item.valor * itemRemovido.quantidade;
  }

  // modal pedido aprovado /
  aceitar: boolean = false;
  recusar: boolean = false;

  fecharModal(event: Event) {
    event.preventDefault();
    this.aceitar = false;
    location.reload();
  }

  fecharModalRecusado(event: Event) {
    event.preventDefault();
    this.recusar = false;
    location.reload();
  }

}
