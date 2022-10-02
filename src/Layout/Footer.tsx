import React from 'react';
import { Table } from '../Components/Table';
import { Cell } from '../Components/Cell';
import { tableHeaderStat, Category } from '../data/data';
import { useAppSelector } from '../app/hooks';

export const Footer:React.FC = () => {
  const { notes } = useAppSelector(state => state.note);

  const activeNotes = notes.filter(note => note.active);
  const archivedNotes = notes.filter(note => !note.active);

  return (
    <div className='container mx-auto px-5 overflow-x-auto'>
      <h4 className='py-2 text-center text-xl tracking-wide font-bold'>Statistic</h4>
      <Table>
        <thead className="text-center bg-teal-400 border-b-2 border-gray-900">
          <tr>
            {
              tableHeaderStat.map(header => (
                <Cell key={header} elementType='th'>
                  {header}
                </Cell>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            Object.values(Category).map(category => (
              <tr key={category} className='text-center'>
                <Cell elementType='td'>
                  {category}
                </Cell>
                <Cell elementType='td'>
                  {activeNotes.filter(note => note.category === category).length}
                </Cell>
                <Cell elementType='td'>
                  {archivedNotes.filter(note => note.category === category).length}
                </Cell>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </div>
  );
};
