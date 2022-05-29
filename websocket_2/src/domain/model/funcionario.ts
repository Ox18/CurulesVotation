export interface FuncionarioModel {
	id: string;
	nombre: string;
	partido: string;
	foto: string;
	email: string;
	disponible?: boolean;
	admin?: boolean;
	user_id?: string;
}
