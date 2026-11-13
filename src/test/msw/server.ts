import { setupServer } from "msw/node";
import { handlers } from "./handlers";

/** Servidor MSW dos testes. Sobrescreva respostas por teste com `server.use(...)`. */
export const server = setupServer(...handlers);
