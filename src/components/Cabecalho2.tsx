import { Link } from 'react-router-dom'
import { usersControllerFindOne } from '../api/orval/users/users'
import { useEffect, useState } from 'react'
import type { User } from '../utils/UserType'

export function Cabecalho2() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await usersControllerFindOne('id'); 

        if (response.status === 200 && response.data) {
          const userData = response.data as User;
          setUser(userData);
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

  return (
    <header className="bg-[#212b41] flex justify-between items-center pr-14 pl-14 pt-7 pb-7 md:pr-32 md:pl-32 md:pt-10 md:pb-14">
      <h1 className="text-white text-5xl md:text-7xl font-semibold font-Sans-serif">CO-OP</h1>
      <div className="flex justify-around items-center gap-10">
        <div className="flex justify-around items-center gap-4">
          <Link to="/perfil" className="">
            {user?.avatarUrl ? (
              <img src={user.avatarUrl} alt="User Avatar" />
            ) : (
              <div className="w-10 h-10 bg-gray-500 rounded-full" />
            )}
            {user?.username && (
              <span className="text-white text-xl font-jost ml-2">{user.username}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
