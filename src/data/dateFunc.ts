export const getDateFromDescription = (text: string) => {
    const dateList = [];
    const textToArr = text.split(' ');

    for (const word of textToArr) {
      const wordWithoutSymbols = word.replace(/[,?!-]*/g, '');
      const str = Number(wordWithoutSymbols);
      const date: Date | any = new Date(wordWithoutSymbols);

      if (isNaN(date)) {
        continue;
      } else {
        if (isNaN(str)) {
          dateList.push(wordWithoutSymbols);
        }
      }
    }

    return dateList.join(', ');
  };

export const convertDate = (utc: string) => {
    const date = new Date(utc);
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    };

    return date.toLocaleDateString('en-US', options);
};
