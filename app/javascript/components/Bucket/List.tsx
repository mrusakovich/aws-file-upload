import React from 'react';
import { RouteComponentProps, Link } from '@reach/router';

export const List: React.FC<RouteComponentProps> = () => (
  <div>
    <Link to="/bucket/upload">Go Upload</Link>
  </div>
);
