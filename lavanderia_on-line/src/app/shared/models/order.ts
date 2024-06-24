import { Roupa } from "./roupa";

export class Order {
	id: string = '';
	time: number = 0;
	status: string = 'Em Aberto';
	value: number = 0;
	closeDate: Date = new Date();
	openDate: Date = new Date();
	roupas: Roupa[] = [];
	clienteId: string = '';

	constructor(time: number, value: number) {

		this.time = time;
		this.value = value;

	}
	addRoupas(roupa: Roupa) {
		this.roupas.push(roupa);
	}
	setStatusOrder(status: string) {
		this.status = status;
	}
}
