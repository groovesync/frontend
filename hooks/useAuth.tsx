import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("backendToken");

    if (!token) {
      router.push("/");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  return isAuthenticated;
};

export default useAuth;
