export const Stats = ({ errorCounts, rowTimes }) => {
  const getTotalTime = () => {
    let total = 0;
    rowTimes.forEach((time) => {
      total += time;
    });
    return total.toFixed(2);
  };

  return (
    <div>
      <div className="mt-4 text-red-600">
        <h2 className="text-xl font-bold">Error Counts:</h2>
        <ul>
          <li>Punctuation Marks: {errorCounts.punctuation_marks}</li>
          <li>Letters: {errorCounts.letters}</li>
          <li>Enters: {errorCounts.enters}</li>
          <li>Spaces: {errorCounts.spaces}</li>
        </ul>
      </div>
      <div className="mt-4 text-blue-600">
        <h2 className="text-xl font-bold">Row Times:</h2>
        <ul>
          {Array.from(rowTimes.entries()).map(([index, time]) => (
            <li key={index}>
              Row {index + 1}: {time.toFixed(2)} seconds
            </li>
          ))}
        </ul>
        <p className="mt-2 font-bold">Total Time: {getTotalTime()} seconds</p>
      </div>
    </div>
  );
};
