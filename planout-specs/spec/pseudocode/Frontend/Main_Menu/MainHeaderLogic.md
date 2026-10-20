Function handleSearchInput(value: string):
  // Debounce logic: wait 300ms before triggering search
  setSearchQuery(value)
  // Trigger search API or filter logic here

Function handleNavClick(tabName: string):
  setActiveTab(tabName)
  if tabName === 'products':
    setIsProductsMenuOpen(!isProductsMenuOpen)
  else if tabName === 'sales':
    // Redirect to sales list page
    window.location.href = '/sales'

Function toggleNotificationMenu():
  setIsNotificationMenuOpen(!isNotificationMenuOpen)

Function toggleProfileMenu():
  setIsProfileMenuOpen(!isProfileMenuOpen)