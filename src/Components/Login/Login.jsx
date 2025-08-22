import React, { useState } from 'react';
import { Button, Input } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Swal from 'sweetalert2';
import { $api } from '../../utils';
import { Alert } from '../../utils/Alert';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async () => {
    try {
      const response = await $api.post(`/auth/login`, { username: username, password: password })
      if (response?.data?.code === 200) {
        Alert("Muvaffaqiyatli qo'shildi", "success");
        localStorage.setItem('accessToken', response?.data?.accessToken)
        navigate('/')
      } else {
        Alert(`login yoki parol xato`, "error")
      }
    } catch (error) {
      console.log(error)
      Alert(`Xatolik: ${error}`, "error");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] px-4">
      <div className="w-full max-w-sm bg-white rounded-xl p-6 shadow-md">
        <h2 className="text-center text-2xl font-bold text-black mb-6">Kirish</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Login
            </label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={handleKeyPress}
              // placeholder="Admin"
              className="text-black"
              crossOrigin={undefined}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Parol
            </label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                // placeholder="Admin123"
                className="text-black"
                crossOrigin={undefined}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black"
              >
                {showPassword ? (
                  <VisibilityOffIcon className="h-5 w-5" />
                ) : (
                  <VisibilityIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          <Button
            onClick={handleLogin}
            className="w-full bg-black text-white font-semibold py-2 rounded hover:bg-gray-800"
          >
            Kirish
          </Button>
        </div>
      </div>
    </div>
  );
}
