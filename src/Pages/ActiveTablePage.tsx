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
      <div className="flex justify-center">
        <div role="status">
          <svg aria-hidden="true" className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-teal-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="py-2 bg-red-300 text-red-800 text-center">
        Something went wrong. Can't get notes.
      </div>
    );
  }

  return (
    <div className='mb-4'>
      <h4 className='py-2 text-center text-xl tracking-wide font-bold'>Active Notes</h4>
      <Table>
        <thead className="text-center bg-teal-400 border-b-2 border-gray-900">
          <tr>
            {
              tableHeaderActArchv.map(header => (
                <Cell key={header} elementType='th'>
                  {header}
                </Cell>
              ))
            }

            <Cell elementType='th'>
              <div className='flex justify-center space-x-2'>
                <FaArchive />
                <FaTrash />
              </div>
            </Cell>
          </tr>
        </thead>
        <tbody className="text-sm">
          {
            activeNotes.map(note => (
              <tr key={`active-${note.id}`} className="h-11 border-b hover:bg-gray-100">
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
                <td className='px-3 py-2 text-sm'>
                  {getDateFromDescription(note.description)}
                </td>
                <td className='px-3 py-2 flex justify-center'>
                  <div className="flex rounded border">
                    <button
                      type="button"
                      className="p-1 rounded-l hover:bg-teal-300 hover:text-white btn__edit"
                      onClick={() => {
                        dispatch(notesActions.editing());
                        dispatch(notesActions.forEdit(note));
                      }}
                    >
                      <FaPen />
                    </button>
                    <button
                      type="button"
                      className="p-1 border-x hover:bg-teal-300 hover:text-white btn__archived"
                      onClick={() => dispatch(notesActions.archive(note))}
                    >
                      <FaArchive />
                    </button>
                    <button
                      type="button"
                      className="p-1 rounded-r hover:bg-teal-300 hover:text-white btn__delete"
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
