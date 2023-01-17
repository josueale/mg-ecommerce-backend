export default interface User {
  is_active: boolean

  name: string;
  lastname: string;

  email: string;
  password: string;

  profile: 'admin' | 'user';

  token: string;
}
