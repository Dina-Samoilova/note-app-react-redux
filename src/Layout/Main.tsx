import React from 'react';
import { ActiveTablePage } from '../Pages/ActiveTablePage';
import { ArchivedTablePage } from '../Pages/ArchivedTablePage';
import { Form } from './Form';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import * as notesActions from '../features/Notes/NoteSlice';

export const Main: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    isActive, isArchived, isAdd, isEdit,
  } = useAppSelector(state => state.note);

  return (
    <div className='container mx-auto px-5 overflow-x-auto'>
      {
        isActive && (
          <>
            <ActiveTablePage />
            {(!isAdd && !isEdit) && (
              <div className="flex justify-end mb-4">
                <button
                  type='button'
                  className="px-4 py-2 border bg-teal-400
                    text-teal-900 tracking-wide rounded-lg hover:bg-teal-500
                    hover:text-white hover:ring ring-teal-300 ring-inset"
                  onClick={() => dispatch(notesActions.adding())}
                >
                  Create Note
                </button>
              </div>
           )}
          </>
        )
      }
      {
        isArchived && (
          <ArchivedTablePage />
        )
      }

      {
        (isAdd || isEdit) && (
          <Form />
        )
      }
    </div>
  );
};
