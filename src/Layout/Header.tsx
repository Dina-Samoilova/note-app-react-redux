import React from 'react';
import Classname from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import * as notesActions from '../features/Notes/NoteSlice';

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isActive, isArchived } = useAppSelector(state => state.note);

  return (
    <header className="bg-primary bg-opacity-50 bg-gradient shadow-sm mb-4">
      <div className="container">
        <h1 className="font-monospace text-center mb-0">
          NOTES
        </h1>

        <ul className='nav nav-tabs border-bottom border-success'>
          <li className='nav-item'>
            <button
              type='button'
              className={Classname(
                'nav-link',
                { 'active': isActive },
                { 'text-success': !isActive },
              )}
              onClick={() => dispatch(notesActions.activeTab())}
            >
              Active
            </button>
          </li>
          <li className='nav-item'>
            <button
              type='button'
              className={Classname(
                'nav-link',
                { 'active': isArchived },
                { 'text-success': !isArchived },
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
