import React from 'react';

type Props = {
  children: React.ReactNode,
  elementType: 'th' | 'td',
  paddX?: string,
  paddY?: string,
  fontSize?: string,
  fontWeight?: string,
  borderBottom?: string,
};

export const Cell: React.FC<Props> = ({
  children,
  elementType,
  paddX,
  paddY,
  fontSize,
  fontWeight,
  borderBottom,
}) => {
  const style = {
    padding: `${paddY} ${paddX}`,
    fontSize,
    fontWeight,
    borderBottom,
    width: 'max-content',
  };

  return (
    <>
      {elementType === 'th'
        ? (
          <th className='px-2 py-1 text-base' style={style}>
            {children}
          </th>
        )
        : (
          <td className='px-3 py-2 text-sm' style={style}>
            {children}
          </td>
      )}
    </>
  );
};
