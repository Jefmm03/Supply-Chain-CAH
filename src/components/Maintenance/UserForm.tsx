

import { useState, useEffect } from 'react';
import { User } from '../../types/Types';

interface UserFormProps {
  userToEdit: User | null;
  onSubmit: (userData: Omit<User, 'id'>) => void;
  onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ userToEdit, onSubmit, onCancel }) => {
  const [userName, setUserName] = useState<string>('');
  const [userAccount, setUserAccount] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [role, setRole] = useState<string>('');

  useEffect(() => {
    if (userToEdit) {
      setUserName(userToEdit.userName);
      setUserAccount(userToEdit.userAccount);
      setEmail(userToEdit.email);
      setRole(userToEdit.rol);
    } else {
      setUserName('');
      setUserAccount('');
      setEmail('');
      setRole('');
    }
  }, [userToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userData: Omit<User, 'id'> = {
      userName,
      userAccount,
      email,
      rol: role,
    };
    onSubmit(userData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">
        {userToEdit ? 'Editar Usuario' : 'Crear Usuario'}
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Nombre de Usuario</label>
        <input
          type="text"
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Cuenta de Usuario</label>
        <input
          type="text"
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          value={userAccount}
          onChange={(e) => setUserAccount(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-700 mb-4">Selecciona un rol:</label>
        <div className="flex space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="role"
              value="Admin"
              className="hidden peer"
              checked={role === 'Admin'}
              onChange={(e) => setRole(e.target.value)}
            />
            <div className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg cursor-pointer peer-checked:bg-blue-500 peer-checked:text-white">
              Admin
            </div>
          </label>

          <label className="inline-flex items-center">
            <input
              type="radio"
              name="role"
              value="Manager"
              className="hidden peer"
              checked={role === 'Manager'}
              onChange={(e) => setRole(e.target.value)}
            />
            <div className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg cursor-pointer peer-checked:bg-blue-500 peer-checked:text-white">
              Manager
            </div>
          </label>

          <label className="inline-flex items-center">
            <input
              type="radio"
              name="role"
              value="User"
              className="hidden peer"
              checked={role === 'User'}
              onChange={(e) => setRole(e.target.value)}
            />
            <div className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg cursor-pointer peer-checked:bg-blue-500 peer-checked:text-white">
              User
            </div>
          </label>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="mr-4 bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
        >
          Cancelar
        </button>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          {userToEdit ? 'Guardar Cambios' : 'Crear Usuario'}
        </button>
      </div>
    </form>
  );
};

export default UserForm;

