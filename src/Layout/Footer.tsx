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
    <div className='container'>
      <h4 className='font-monospace text-center mb-0'>Statistic</h4>
      <Table>
        <thead>
          <tr className="bg-primary bg-opacity-25 text-center">
            {
              tableHeaderStat.map(header => (
                <Cell key={header} elementType='th'>
                  {header}
                </Cell>
              ))
            }
          </tr>
        </thead>
        <tbody className="table-group-divider">
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
