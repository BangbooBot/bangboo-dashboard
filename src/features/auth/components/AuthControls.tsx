import { useCurrentUser } from "../hooks/useCurrentUser";
import { LoginButton } from "./LoginButton";
import { UserMenu } from "./UserMenu";

/** Menu do usuário quando logado; botão de login caso contrário. */
export function AuthControls() {
	const user = useCurrentUser();
	return user ? <UserMenu user={user} /> : <LoginButton />;
}
