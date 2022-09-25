import React, { useEffect } from 'react';
import { Header } from './Layout/Header';
import { Main } from './Layout/Main';
import { Footer } from './Layout/Footer';
import { useAppDispatch } from './app/hooks';
import * as notesActions from './features/Notes/NoteSlice';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(notesActions.init());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}

export default App;
