import React, { useMemo, useState } from 'react';
import { Notes } from '../data/data'
import { useAppSelector, useAppDispatch } from '../app/hooks';
import * as notesActions from '../features/Notes/NoteSlice';

export const Form: React.FC = () => {
  const dispatch = useAppDispatch();
  const { noteForEdit, isAdd, isEdit, notes } = useAppSelector(state => state.note);
  const [isValid, setIsValid] = useState(true);

  const [form, setForm] = useState({
    title: noteForEdit?.title || '',
    description: noteForEdit?.description || '',
    category: noteForEdit?.category || '',
  });

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement
  | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    setIsValid(true);

    switch (name) {
      case 'title':
        setForm({
          ...form,
          title: value,
        });
        break;

      case 'description':
        setForm({
          ...form,
          description: value,
        });
        break;

      case 'category':
        setForm({
          ...form,
          category: value,
        });
        break;

      default:
        break;
    }
  };

  const resetForm = () => {
    setForm({
      title: '',
      description: '',
      category: '',
    });

    setIsValid(true);
  };

  const validation = useMemo(() => {
    return (form.title.trim().length > 0
      && form.description.trim().length > 0
      && form.category !== ''
    );
  }, [form]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validation) {
      if (isAdd) {
        const dateCreation: Date = new Date();

        const newNote: Notes = {
          id: notes.length + 1,
          title: form.title,
          createdAt: dateCreation.toISOString(),
          category: form.category,
          description: form.description,
          active: true,
        }

        dispatch(notesActions.add(newNote));
        dispatch(notesActions.adding());
      }

      if (isEdit && noteForEdit) {
        const editNote = {
          ...noteForEdit,
          title: form.title,
          description: form.description,
          category: form.category,
        }

        dispatch(notesActions.edit(editNote));
        dispatch(notesActions.editing());
      }

      resetForm();
      dispatch(notesActions.resetNoteForEdit());

    } else {
      setIsValid(false);
    }
  };

  const handleCloseButton = () => {
    if (isAdd) {
      dispatch(notesActions.adding());
    }

    if (isEdit) {
      dispatch(notesActions.editing());
    }

    resetForm();
    setIsValid(true);
    dispatch(notesActions.resetNoteForEdit());
  };

  return (
    <form
      className='row g-3 align-items-end mb-4'
      onSubmit={handleSubmit}
    >
      {
        !isValid && (
          <div className="alert alert-danger" role="alert">
            Please, write information in all fields.
          </div>
        )
      }
      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="btn-close" aria-label="Close"
          onClick={handleCloseButton}
        ></button>
      </div>

      <div className='col-3'>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className='form-control'
          value={form.title}
          onChange={handleFormChange}
          required
        />
      </div>
      <div className='col-4'>
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          className='form-control'
          rows={1}
          value={form.description}
          onChange={handleFormChange}
          required
        ></textarea>
      </div>
      <div className='col-3'>
        <label htmlFor="select" className="col-form-label">
          Choose Category
        </label>
        <select
          id="select"
          name="category"
          className="form-select"
          aria-label="category"
          value={form.category}
          onChange={handleFormChange}
          required
        >
          <option value="">Choose Category</option>
          <option value="Task">Task</option>
          <option value="Random Thought">Random Thought</option>
          <option value="Idea">Idea</option>
        </select>
      </div>

      <div className="col-2 d-flex justify-content-end">
        <button
          type='submit'
          className='btn btn-primary'
        >
          Submit
        </button>
      </div>
    </form>
  );
};
