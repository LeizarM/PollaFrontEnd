
export interface Login {
  codUsuario        ?: number;
  codEmpleado       ?: number;
  login             ?: string;
  password          ?: string;

  //atributos auxiliares
  nombreCompleto?: string;
  cargo?: string;
  token?: string;
  ok?: boolean;
  authoriy?: Authority[];
  npassword?: string;
}


export interface Authority {
  authority?: string;
}


// Converts JSON strings to/from your types
export class Convert {
  public static toLogin(json: string): Login {
    return JSON.parse(json);
  }

  public static loginToJson(value: Login): string {
    return JSON.stringify(value);
  }
}
