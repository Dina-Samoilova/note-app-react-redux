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
    <div className='container'>
      {
        isActive && (
          <>
            <ActiveTablePage />
            {(!isAdd && !isEdit) && (
              <div className="d-flex justify-content-end mb-4">
                <button
                  type='button'
                  className="btn btn-primary btn__create"
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
