// // File: src/app/components/PrivateRoute.tsx
// import React, { ReactNode, useContext } from 'react';
// import { Navigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';

// interface PrivateRouteProps {
//   children: ReactNode;
// }

// const PrivateRoute = ({ children }: PrivateRouteProps) => {
//   const authContext = useContext(AuthContext);

//   if (!authContext) {
//     return <Navigate to="/admin/login" />;
//   }

//   const { isAuthenticated, loading } = authContext;

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return isAuthenticated ? children : <Navigate to="/admin/login" />;
// };

// export default PrivateRoute;