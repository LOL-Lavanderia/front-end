import { Roupa } from "./roupa";

export class Order {
	id: number = 0;
	time: number = 0;
	status: string = 'Em Aberto';
	value: number = 0;
	closeDate: Date = new Date();
	openDate: Date = new Date();
	roupas: Roupa[] = [];

	constructor(time: number, value: number) {
		this.id = Math.floor(Math.random() * 1000) + 1;
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
