import React, { useMemo, useState } from 'react';
import { MdClose } from 'react-icons/md';
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
      className='mb-4'
      onSubmit={handleSubmit}
    >
      {
        !isValid && (
          <div className="py-2 bg-red-300 text-red-800 text-center">
            Please, write information in all fields.
          </div>
        )
      }
      <div className="flex justify-end mb-3">
        <button
          type="button"
          className="p-1 hover:text-red-500 hover:scale-125"
          onClick={handleCloseButton}
        >
          <MdClose />
        </button>
      </div>

      <div className="flex justify-between">
        <div className='block px-2 w-1/3'>
          <label htmlFor="title" className='block text-gray-900 text-base font-medium mb-2'>Title</label>
          <input
            id="title"
            type="text"
            name="title"
            className='shadow border rounded w-full py-2 px-3 text-gray-700 text-sm focus:outline-none focus:shadow-outline focus:shadow-slate-700'
            value={form.title}
            onChange={handleFormChange}
            required
          />
        </div>
        <div className='block px-2 w-1/3'>
          <label htmlFor="description" className='block text-gray-900 text-base font-medium mb-2'>Description</label>
          <textarea
            name="description"
            id="description"
            className='shadow border rounded w-full py-2 px-3 text-gray-700 text-sm focus:outline-none focus:shadow-outline focus:shadow-slate-700'
            rows={1}
            value={form.description}
            onChange={handleFormChange}
            required
          ></textarea>
        </div>
        <div className='block px-2 w-1/3'>
          <label htmlFor="select" className="block text-gray-900 text-base font-medium mb-2">
            Choose Category
          </label>
          <select
            id="select"
            name="category"
            className="shadow border rounded w-full py-2 px-3 text-gray-700 text-sm focus:outline-none focus:shadow-outline focus:shadow-slate-700"
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

        <div className="self-end mb-1">
          <button
            type='submit'
            className='px-4 py-2 border bg-teal-400
                    text-teal-900 tracking-wide rounded-lg hover:bg-teal-500
                    hover:text-white hover:ring ring-teal-300 ring-inset'
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};
