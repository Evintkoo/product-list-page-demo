// API CONTRACTS implementation
export const validateEmail = async (data: { email: string }) => {
  const response = await fetch('/api/users/validate', {
    method: 'POST',
    body: JSON.stringify(data)
  });
  return response.json();
};

export const loginUser = async (data: { email: string, password: string }) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error('Unauthorized');
  return response.json();
};

export const checkAuthStatus = async () => {
  const response = await fetch('/api/auth/me', {
    method: 'GET'
  });
  if (!response.ok) throw new Error('Not logged in');
  return response.json();
};