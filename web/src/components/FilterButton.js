import React from 'react';

export default function FilterButton({
  buttonText,
  data,
  setData,
  originalRepo,
}) {
  const handler = (e) => {
    e.preventDefault();
    if (buttonText === 'All') {
      return setData(originalRepo);
    }

    let tempData = [...originalRepo];
    // filter array according to language (button text)
    tempData = tempData.filter((repo) => repo.language === buttonText);
    setData(tempData);
  };
  return (
    <div onClick={handler} className="filter-button">
      {buttonText}
    </div>
  );
}
