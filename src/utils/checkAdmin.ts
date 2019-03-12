function checkAdmin(user: any): any {
  if (user.access_level !== 'admin')
    throw new Error('User must have admin access level');
  return user;
}

export default checkAdmin;
