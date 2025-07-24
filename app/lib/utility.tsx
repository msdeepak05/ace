import { useRouter } from "next/navigation";
import { Login } from "./path";

export function useLogout() {
  const router = useRouter();

  return () => {
    router.push(Login);
  };
}