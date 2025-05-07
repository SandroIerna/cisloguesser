import React from 'react';
import './Keyboard.css';

const QWERTY_ROWS = [
  ['á', 'č', 'ď', 'é', 'ě', 'í', 'ň', 'ó', 'ř', 'š', 'ť', 'ú', 'ů', 'ý', 'ž'],
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
];

interface KeyboardProps {
  onLetterClick: (letter: string) => void;
}

export const Keyboard: React.FC<KeyboardProps> = ({ onLetterClick }) => {
  return (
    <div className='qwerty-keyboard'>
      {QWERTY_ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className='keyboard-row'>
          {row.map((letter) => (
            <button
              key={letter}
              className='keyboard-key'
              onClick={() => onLetterClick(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};
