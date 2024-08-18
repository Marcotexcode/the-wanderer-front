import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { PrivateRouteProps } from '../types';

const ProtectedRoute: React.FC<PrivateRouteProps> = ({ children }): ReactElement => {
  const hasCreatedCharacter = localStorage.getItem('hasCreatedCharacter');
  
  if (hasCreatedCharacter === 'true') {
    return <Navigate to="/map" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
