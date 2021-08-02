import { Routes, Route } from 'react-router-dom';
import { SignUp } from '../../pages/signUp/SignUp';
import { Login } from '../../pages/login/Login';
import { Home } from '../../pages/home/Home';
import { PrivateRoute } from './PrivateRoute';
import { Profile } from '../../pages/profile/Profile';

export const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        <PrivateRoute path="/" element={<Home />} />
        <PrivateRoute path="/profile/:username" element={<Profile />} />
      </Routes>
    </>
  );
};
