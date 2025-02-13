import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function PublicRoute({ element, restricted, ...rest }) {
  const { currentUser } = useAuth();

  // If the user is logged in and this is a restricted route, redirect them to the home page
  if (currentUser && restricted) {
    return <Navigate to="/" />;
  }

  // If the user is not logged in, render the public element
  return element;
}