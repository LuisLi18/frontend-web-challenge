/** Respuesta cruda de la API /user.json. NO contiene doc ni teléfono. */
export interface UserApi {
  name: string;
  lastName: string;
  /** Formato DD-MM-YYYY. */
  birthDay: string;
}

/** Datos que llena el usuario en el form del Landing. */
export interface UserFormData {
  docType: DocType;
  docNumber: string;
  phone: string;
  acceptsPrivacy: boolean;
  acceptsComms: boolean;
}

export type DocType = 'DNI' | 'CE';

/** Usuario completo persistido en el store = form + API + edad. */
export interface User extends UserApi {
  docType: DocType;
  docNumber: string;
  phone: string;
  /** Calculada desde birthDay en el momento del submit. */
  age: number;
}
