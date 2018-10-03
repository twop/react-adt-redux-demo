import * as React from 'react';

type Props = {
  errText: string;
};

export const Err: React.SFC<Props> = ({ errText }) => (
  <h4 style={{ color: 'red' }}>{errText}</h4>
);
