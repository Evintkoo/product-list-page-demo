/**
 * Hook to manage the authenticated user state for the Main Menu.
 * Handles initial session verification and logout operations.
 */
function useUserSession() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // On page load, verify session
  useEffect(() => {
    async function checkSession() {
      try {
        const response = await fetch("/auth/me");
        if (response.ok) {
          const userData = await response.json();
          // Mapping rule: name -> name
          setUser({
            id: userData.id,
            name: userData.name,
            email: userData.email,
            role: userData.role
          });
        } else {
          redirectToLogin();
        }
      } catch (error) {
        redirectToLogin();
      } finally {
        setIsLoading(false);
      }
    }
    checkSession();
  }, []);

  // Handle Logout
  async function handleLogout() {
    try {
      await fetch("/auth/logout", { method: "POST" });
      redirectToLogin();
    } catch (error) {
      console.error("Logout failed", error);
    }
  }

  return { user, isLoading, handleLogout };
}

function redirectToLogin() {
  window.location.href = "/login";
}