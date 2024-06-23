export type Client = { role: "client", cpf: string, address: Address[], phone: Phone[]};
export type Employee = { role: "employee", birthDate: string };
export type Role = Client | Employee;

export function isEmployee(user: Usuario): boolean {
  return user.role.role === "employee";
}

export class Usuario {
  constructor(
    public id: string | undefined,
    public email: string,
    public name: string,
    public password: string,
    public role: Role,
  ) { }
}

export interface Address {
  id: number;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  cep: number;
  tipo: number;
}

export interface Phone {
  id: number;
  numero: number;
}

export class Auth {
  constructor(
    public email?: string,
    public password?: string,
  ) { }
}
