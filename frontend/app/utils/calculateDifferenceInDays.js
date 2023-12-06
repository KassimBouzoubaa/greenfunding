export const calculateDifferenceInDays = (timestamp1, timestamp2) => {
    const dateFromTimestamp = new Date(timestamp1 * 1000);
    const currentDate = new Date(timestamp2 * 1000);
    const differenceMilliseconds =
      dateFromTimestamp.getTime() - currentDate.getTime();
    return Math.ceil(differenceMilliseconds / (1000 * 3600 * 24));
  };