import { useEffect, useState } from 'react';
import type { User } from '../../utils/UserType';
import { authControllerGetProfile } from '../../api/orval/auth/auth';

export function UserProfile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const token = localStorage.getItem('token');
        const response = await authControllerGetProfile({
          headers: { Authorization: `Bearer ${token}` }
        });

        console.log('response.data:', response.data);

        if (response.status === 200 && response.data) {
          setUser(response.data as User);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        setUser(null);
      }
    }
    fetchUser();
  }, []);

  if (!user) return <p>Usuário não encontrado</p>;

  return (
    <div>
      <p>{user.username}</p>
      <p>{user.email}</p>
    </div>
  );
}
