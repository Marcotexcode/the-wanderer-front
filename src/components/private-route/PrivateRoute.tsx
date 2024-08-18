import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { PrivateRouteProps } from '../types';

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }): ReactElement => {
  const token = localStorage.getItem('token');
  return token ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;