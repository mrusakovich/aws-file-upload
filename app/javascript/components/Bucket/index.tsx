import React from 'react';
import { Router, RouteComponentProps, Redirect } from '@reach/router';
import { Upload } from './Upload';
import { List } from './List';

export const Bucket: React.FC<RouteComponentProps> = () => (
  <Router>
    <List path="list" />
    <Upload path="upload" />
    <Redirect from="/" to="upload" noThrow />
  </Router>
);
