
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { loginSuccess, loginFailure } from '../../Redux/Slices/AuthSlice';
import { AppDispatch } from '../../Redux/store';

const Login = () => {
  const [useraccount, setUseraccount] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const usernameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (usernameInputRef.current) {
      usernameInputRef.current.focus();
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await fetch(`https://localhost:7290/api/UserAuth/Login/${useraccount}/${password}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud de autenticación');
      }

      const result = await response.json();

      if (result) {
        const { token, userAccount, userName, userRole } = result;

        const decoded = jwtDecode<JwtPayload>(token);
        if (decoded.exp && decoded.exp * 1000 > Date.now()) {
          dispatch(loginSuccess({ token, userAccount, userName, userRole }));
          navigate('/home');
        } else {
          setError('El token ha expirado. Por favor, inicie sesión de nuevo.');
        }
      } else {
        setError('Usuario o contraseña incorrectos.');
        dispatch(loginFailure('Usuario o contraseña incorrectos.'));
      }
    } catch (error) {
      console.error('Error en la autenticación:', error);
      setError('Error al intentar iniciar sesión. Por favor, intente de nuevo.');
      dispatch(loginFailure('Error al intentar iniciar sesión.'));
    }
  };


  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleLogin();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm lg:max-w-md xl:max-w-lg 2xl:max-w-lg">
        <div className="mx-auto mb-6 text-center">
          <img src="/logo-main.png" alt="Company Logo" className="h-20 mx-auto" />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center">Access Account</h2>
        <form onSubmit={(e) => e.preventDefault()} onKeyDown={handleKeyDown}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="useraccount">
              User Account
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="useraccount"
              type="text"
              placeholder="User name"
              value={useraccount}
              onChange={(e) => setUseraccount(e.target.value)}
              ref={usernameInputRef}
              autoComplete="off" // Cambia esto para evitar autocompletar emails
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
          <div className="flex items-center justify-center">
            <button
              className="bg-red-600 hover:bg-red-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleLogin}
            >
              Enter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

