/**
 * Main Header component for the Lumi ERP system.
 * Consumes the user session data to render the navigation menu.
 */
function MainMenu() {
  const { user, isLoading } = useUserSession();

  if (isLoading) {
    return <HeaderSkeleton />;
  }

  return (
    <nav className="main-header">
      <div className="logo">Lumi ERP</div>
      <div className="user-profile">
        <span>Welcome, {user.name}</span>
      </div>
    </nav>
  );
}