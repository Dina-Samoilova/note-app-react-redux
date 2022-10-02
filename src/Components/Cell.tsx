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
          <th className='px-2 py-1 text-base'>
            {children}
          </th>
        )
        : (
          <td className='px-3 py-2 text-sm'>
            {children}
          </td>
      )}
    </>
  );
};
