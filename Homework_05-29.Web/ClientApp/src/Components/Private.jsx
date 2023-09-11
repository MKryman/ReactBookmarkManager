import { Navigate } from 'react-router-dom';
import { AuthorizeUser } from '../AuthorizeUserContext';

const Private = ({ children }) => {
    const { user } = AuthorizeUser();

    return user ? children : <Navigate to="/login" />
}

export default Private;