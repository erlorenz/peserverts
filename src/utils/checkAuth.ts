function checkAuth(user: any): any {
  if (!user) throw new Error('Invalid token');
  return user;
}

export default checkAuth;
