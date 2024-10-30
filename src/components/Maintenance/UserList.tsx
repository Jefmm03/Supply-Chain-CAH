

import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import UserForm from './UserForm';
import { User } from '../../types/Types';
import LoadingSpinner from '../../Shared/LoadingSpinner';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchUsers = async () => {
      try {
        const response = await fetch('https://localhost:7290/api/user/List');
        const data = await response.json();
        setUsers(data);
      } catch  {
        setError('Error fetching users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleSubmit = async (userData: Omit<User, 'id'>) => {
    try {
      if (editingUser) {
        await fetch(`https://localhost:7290/api/User/Edit/${editingUser.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        });
      } else {
        await fetch('https://localhost:7290/api/User/New', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        });
      }
      setShowForm(false);
      setEditingUser(null);
      const response = await fetch('https://localhost:7290/api/user/List');
      const data = await response.json();
      setUsers(data);
    } catch  {
      setError('Error creating or updating user');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="w-full h-screen flex flex-col p-4 overflow-hidden">
      {showForm ? (
        <UserForm
          userToEdit={editingUser}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <div className="flex space-x-2">
              <button
                className="bg-green-500 text-white px-4 py-2 mb-4 rounded m-4 font-medium"
                onClick={() => setShowForm(true)}
              >
                Crear Nuevo Usuario
              </button>

              <button
                className="bg-yellow-400 text-white px-4 py-2 mb-4 rounded m-4 font-medium"
                onClick={() => navigate('/home')}
              >
                Regresar
              </button>
            </div>

            <h2 className="text-2xl font-bold text-center flex-1">User List</h2>

            <div className="w-24"></div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">User Name</th>
                  <th className="px-4 py-2 border">User Account</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Rol</th>
                  <th className="px-4 py-2 border">Created At</th>
                  <th className="px-4 py-2 border">Updated At</th>
                  <th className="px-4 py-2 border">Created By</th>
                  <th className="px-4 py-2 border">Updated By</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-4 py-2 border">{user.userName}</td>
                    <td className="px-4 py-2 border">{user.userAccount}</td>
                    <td className="px-4 py-2 border">{user.email}</td>
                    <td className="px-4 py-2 border">{user.rol}</td>
                    <td className="px-4 py-2 border">{user.createdAt}</td>
                    <td className="px-4 py-2 border">{user.updatedAt}</td>
                    <td className="px-4 py-2 border">{user.createdBy}</td>
                    <td className="px-4 py-2 border">{user.updatedBy}</td>
                    <td className="px-4 py-2 border">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                        onClick={() => handleEdit(user)}
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default UserList;
