export const fetchNotes = async () => {
    const response = await fetch('./StartNotes.json');

    const notesFromFile = await response.json();

    return notesFromFile;
  };
