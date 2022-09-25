import React from 'react';

type Props = {
  children: React.ReactNode,
  elementType: string
};

export const Cell: React.FC<Props> = ({ children, elementType }) => {
  return (
    <>
      {elementType === 'th'
        ? (
          <th>
            {children}
          </th>
        )
        : (
          <td>
            {children}
          </td>
      )}
    </>
  );
};
