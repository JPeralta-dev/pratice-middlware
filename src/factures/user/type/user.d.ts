declare global {
  namespace Express {
    interface Request {
      user?: {
        username: string;
        type: string;
        iat: number;
        exp: number;
      };
    }
  }
}

export {};
/**
 * Este es un tipado para incluir por medio de la Reques una propiedad en este caso
 * es el user y alogunos atrivutos.
 * Pero ademas hacemos cosas interesantes como por ejemplo declararlo de manera global
 * pra asi el lenguaje entienda que es en todo lados del proyecto y lo hacemos en el espacio
 * original de Express es decir no estamos creando uno nuevo si no modificando ya la existente
 * agregandole a la interfaz Request una propiedad antes vista.
 */
