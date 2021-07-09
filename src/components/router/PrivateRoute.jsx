import { useSelector } from 'react-redux';
import { Route, Navigate, useLocation } from 'react-router-dom';

export function PrivateRoute({ path, ...props }) {
  const token = useSelector((state) => state.auth.token);
  const fromURL = useLocation();

  return token ? (
    <Route {...props} />
  ) : (
    <Navigate state={{ from: fromURL.pathname }} replace to="/login" />
  );
}
