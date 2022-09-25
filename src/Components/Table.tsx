import React from 'react';

type Props = {
  children: React.ReactNode,
};

export const Table: React.FC<Props> = ({ children }) => {
  return (
    <table className="table table-hover shadow">
      {children}
    </table>
  );
};
