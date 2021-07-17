import React, { useCallback, useState } from 'react';

const TestRenderer = () => {
  const [count, setCount] = useState(0);

  const onClick = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  return (
    <div>
      <div>여행기분떡상하기</div>
      <div>
        <span>{count}</span>
      </div>
      <br />
      <button type="button" onClick={onClick}>
        상승!
      </button>
    </div>
  );
};

export default TestRenderer;
