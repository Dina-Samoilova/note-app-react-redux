import React from 'react';
import { FaPen, FaArchive, FaTrash } from 'react-icons/fa';
import { Table } from '../Components/Table';
import { Cell } from '../Components/Cell';
import { tableHeaderActArchv } from '../data/data';
import { getDateFromDescription, convertDate } from '../data/dateFunc';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import * as notesActions from '../features/Notes/NoteSlice';

export const ActiveTablePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { notes, status } = useAppSelector(state => state.note);

  const activeNotes = notes.filter(note => note.active);

  if (status === 'loading') {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="alert alert-danger" role="alert">
        Something went wrong. Can't get notes.
      </div>
    );
  }

  return (
    <div className='mb-4'>
      <h4 className='font-monospace text-center mb-0'>Active Notes</h4>
      <Table>
        <thead>
          <tr className="bg-primary bg-opacity-25 text-center">
            {
              tableHeaderActArchv.map(header => (
                <Cell key={header} elementType='th'>
                  {header}
                </Cell>
              ))
            }

            <Cell elementType='th'>
              <FaArchive />
              <FaTrash />
            </Cell>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {
            activeNotes.map(note => (
              <tr key={`active-${note.id}`}>
                {
                  Object.values(note).slice(1, -1).map((info, index) => (
                    <Cell key={`activeNoteValue-${index}`} elementType='td'>
                      {index === 1
                        ? convertDate(info)
                        : info
                      }
                    </Cell>
                  ))
                }
                <td>
                  {getDateFromDescription(note.description)}
                </td>
                <td>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Edit archived delete notes"
                  >
                    <button
                      type="button"
                      className="btn btn-light btn__edit"
                      onClick={() => {
                        dispatch(notesActions.editing());
                        dispatch(notesActions.forEdit(note));
                      }}
                    >
                      <FaPen />
                    </button>
                    <button
                      type="button"
                      className="btn btn-light btn__archived"
                      onClick={() => dispatch(notesActions.archive(note))}
                    >
                      <FaArchive />
                    </button>
                    <button
                      type="button"
                      className="btn btn-light btn__delete"
                      onClick={() => dispatch(notesActions.remove(note))}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </div>
  );
};
