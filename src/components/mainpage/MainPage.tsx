import { useEffect, useRef, useState } from 'react';
import './ManPage.css';
import { getCzechNumberWord } from '../../czechNumbers';
import { Keyboard } from '../keyboard/Keyboard';

const MainPage = () => {
  const [randomNumber, setRandomNumber] = useState<number>(0);
  const [inputLetters, setInputLetters] = useState<string[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [incorrectIndexes, setIncorrectIndexes] = useState<Set<number>>(
    new Set()
  );

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const fullValue = getCzechNumberWord(randomNumber);
  const wordGroups = fullValue.split(' ');

  const getFlatIndex = (wordIndex: number, letterIndex: number) =>
    wordGroups.slice(0, wordIndex).reduce((acc, word) => acc + word.length, 0) +
    letterIndex;

  const generateRandomNumber = (): number => {
    return Math.floor(Math.random() * 10000);
  };

  useEffect(() => {
    const newNumber = generateRandomNumber();
    setRandomNumber(newNumber);
    const clean = getCzechNumberWord(newNumber).replace(/\s+/g, '');
    setInputLetters(new Array(clean.length).fill(''));
    inputRefs.current = new Array(clean.length).fill(null);
    setIncorrectIndexes(new Set());
  }, []);

  const handleChange = (index: number, value: string) => {
    const updated = [...inputLetters];
    updated[index] = value.slice(-1);
    setInputLetters(updated);
    setUserInput(updated.join(''));
  };

  const handleKeyUp = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const key = e.key;

    if (key === 'Backspace') {
      if (!inputLetters[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else {
      const value = (e.target as HTMLInputElement).value;
      if (value && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const renderInputs = () => {
    return (
      <div className='letter-input-container'>
        {wordGroups.map((word, wordIdx) => (
          <div key={wordIdx} className='letter-input-row'>
            {word.split('').map((_, letterIdx) => {
              const flatIndex = getFlatIndex(wordIdx, letterIdx);
              return (
                <input
                  key={flatIndex}
                  ref={(el: HTMLInputElement | null) => {
                    if (el) inputRefs.current[flatIndex] = el;
                  }}
                  type='text'
                  maxLength={1}
                  className={`letter-input ${
                    incorrectIndexes.has(flatIndex) ? 'incorrect' : ''
                  }`}
                  value={inputLetters[flatIndex] || ''}
                  onChange={(e) => handleChange(flatIndex, e.target.value)}
                  onKeyUp={(e) => handleKeyUp(e, flatIndex)}
                />
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  const handleGenerateNew = () => {
    const target = fullValue.replace(/\s+/g, '');
    if (userInput === target) {
      const newNumber = generateRandomNumber();
      setRandomNumber(newNumber);
      const clean = getCzechNumberWord(newNumber).replace(/\s+/g, '');
      setInputLetters(new Array(clean.length).fill(''));
      inputRefs.current = new Array(clean.length).fill(null);
      setIncorrectIndexes(new Set());
    } else {
      const newIncorrect = new Set<number>();
      for (let i = 0; i < target.length; i++) {
        if (inputLetters[i] !== target[i]) {
          newIncorrect.add(i);
        }
      }
      setIncorrectIndexes(newIncorrect);
    }
  };

  const handleSpecialLetterClick = (letter: string) => {
    const nextIndex = inputLetters.findIndex((val) => val === '');
    if (nextIndex === -1) return;

    const updated = [...inputLetters];
    updated[nextIndex] = letter;
    setInputLetters(updated);
    setUserInput(updated.join(''));

    if (nextIndex < inputRefs.current.length - 1) {
      inputRefs.current[nextIndex + 1]?.focus();
    }
  };

  useEffect(() => {
    const handleEnterKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleGenerateNew();
      }
    };

    window.addEventListener('keydown', handleEnterKey);
    return () => {
      window.removeEventListener('keydown', handleEnterKey);
    };
  }, [userInput, fullValue, inputLetters]);

  return (
    <div className='main-body-container'>
      <div className='random-number'>{randomNumber}</div>
      {renderInputs()}
      <button className='enter-button' onClick={handleGenerateNew}>
        Enter
      </button>
      <Keyboard onLetterClick={handleSpecialLetterClick} />
    </div>
  );
};

export default MainPage;
