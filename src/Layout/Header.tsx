import React from 'react';
import Classname from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import * as notesActions from '../features/Notes/NoteSlice';

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isActive, isArchived } = useAppSelector(state => state.note);

  return (
    <header className="bg-teal-400 mb-2">
      <div className="container mx-auto px-5">
        <h1 className="text-center text-2xl text-gray-900 font-bold tracking-widest">
          NOTES
        </h1>

        <ul className='flex'>
          <li>
            <button
              type='button'
              className={Classname(
                'w-24 text-lg px-3 rounded-t',
                { 'text-white bg-teal-500 hover:bg-teal-600 border-t border-r border-l': isActive },
                { 'text-teal-900 hover:bg-teal-300': !isActive },
              )}
              onClick={() => dispatch(notesActions.activeTab())}
            >
              Active
            </button>
          </li>
          <li>
            <button
              type='button'
              className={Classname(
                'w-24 text-lg px-3 rounded-t',
                { 'text-white bg-teal-500 hover:bg-teal-600 border-t border-r border-l': isArchived },
                { 'text-teal-900 hover:bg-teal-300': !isArchived },
              )}
              onClick={() => dispatch(notesActions.archiveTab())}
            >
              Archived
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};
