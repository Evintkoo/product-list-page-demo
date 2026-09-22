/**
 * Hook to manage user authentication state for the Main Menu.
 * Orchestrates the API call to verify session and maps data for UI consumption.
 */
function useUserSession() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkSession() {
      try {
        const response = await fetch('/api/auth/me');
        
        if (response.ok) {
          const data = await response.json();
          
          // Mapping rule: name -> name
          setUser({
            name: data.name,
            id: data.id
          });
        } else {
          // Redirect to Login if session is invalid or expired
          window.location.href = '/login';
        }
      } catch (error) {
        console.error("Session verification failed", error);
        window.location.href = '/login';
      } finally {
        setIsLoading(false);
      }
    }

    checkSession();
  }, []);

  return { user, isLoading };
}