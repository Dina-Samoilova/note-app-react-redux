import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchNotes } from './NoteAPI';
import { Notes } from '../../data/data';

export interface NoteState {
  notes: Notes[];
  status: 'idle' | 'loading' | 'failed';
  noteForEdit: Notes | null;
  isActive: boolean;
  isArchived: boolean;
  isEdit: boolean;
  isAdd: boolean;
}

const initialState: NoteState = {
  notes: [],
  noteForEdit: null,
  status: 'idle',
  isActive: true,
  isArchived: false,
  isEdit: false,
  isAdd: false,
};

export const init = createAsyncThunk('note/fetch', () => {
  return fetchNotes();
});

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Notes>) => {
      state.notes.push(action.payload);
    },
    edit: (state, action: PayloadAction<Notes>) => {
      state.notes = state.notes.map(note => (
        note.id === action.payload.id
          ? action.payload
          : { ...note }
      ));
    },
    remove: (state, action: PayloadAction<Notes>) => {
      if (window.confirm('Are you sure you want to delete')) {
        state.notes = state.notes.filter(note => note.id !== action.payload.id);
      }
    },
    archive: (state, action: PayloadAction<Notes>) => {
      state.notes = state.notes.map(note => (
        note.id === action.payload.id
          ? {...action.payload, active: !note.active}
          : { ...note }
      ));
    },
    forEdit: (state, action: PayloadAction<Notes>) => {
      state.noteForEdit = action.payload;
    },
    resetNoteForEdit: (state) => {
      state.noteForEdit = null;
    },
    activeTab: (state) => {
      state.isActive = true;
      state.isArchived = false;
    },
    archiveTab: (state) => {
      state.isArchived = true;
      state.isActive = false;
    },
    editing: (state) => {
      state.isEdit = !state.isEdit;
      state.isAdd = false;
    },
    adding: (state) => {
      state.isAdd = !state.isAdd;
      state.isEdit = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(init.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(init.fulfilled, (state, action) => {
        state.status = 'idle';
        state.notes = action.payload.notes;
      })
      .addCase(init.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const {
  add, edit, remove, archive, forEdit, activeTab, archiveTab, editing, adding, resetNoteForEdit
} = notesSlice.actions;
export default notesSlice.reducer;
