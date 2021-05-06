import React, { Fragment } from 'react';
import Form from './BoardForm';
import Boards from './Boards';

export default function Dashboard() {
  return (
    <Fragment>
      <Boards />
      <Form />
    </Fragment>
  );
}