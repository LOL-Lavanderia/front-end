export type Client = { role: "client", cpf: string, enderecos: Enderecos[], telefones: Telefones[]};
export type Employee = { role: "employee", birthDate: string };
export type Role = Client | Employee;

export function isEmployee(user: Usuario): boolean {
  return user.role.role === "employee";
}

export class Usuario {
  constructor(
    public id: string | undefined,
    public email: string,
    public cpf: string,
    public nome: string,
    public senha: string,
    public role: Role,
  ) { }
}

export interface Enderecos {
  id: number;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  cep: number;
  tipo: number;
}

export interface Telefones {
  id: number;
  numero: number;
}

export class Auth {
  constructor(
    public email?: string,
    public password?: string,
  ) { }
}
