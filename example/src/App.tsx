import { useEffect, useState } from 'react';
import FlipNumbers from 'react-flip-numbers';

export default function App() {
  const [timeRemaining, setTimeRemaining] = useState(10000);

  useEffect(() => {
    const timer = setInterval(() => setTimeRemaining((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <FlipNumbers play color="#fff" background="#333333" fontSize={50} gap={8} numbers={`${timeRemaining}`} />
  );
}
