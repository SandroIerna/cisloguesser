import React from 'react';
import './Keyboard.css';

const QWERTY_ROWS = [
  ['á', 'č', 'ď', 'é', 'ě', 'í', 'ň', 'ó', 'ř', 'š', 'ť', 'ú', 'ů', 'ý', 'ž'],
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
];

const MOBILE_QWERTY_ROWS = [
  ['á', 'č', 'ď', 'é', 'ě', 'í', 'ň', 'ó', 'ř', 'š', 'ť', 'ú', 'ů', 'ý', 'ž'],
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '←'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
];

interface KeyboardProps {
  isMobile: boolean;
  onLetterClick: (letter: string) => void;
  handleBackspace: () => void;
}

export const Keyboard: React.FC<KeyboardProps> = ({
  isMobile,
  onLetterClick,
  handleBackspace,
}) => {
  const handleKeyClick = (key: string) => {
    if (key === '←') {
      handleBackspace();
    } else {
      onLetterClick(key);
    }
  };
  const rows = isMobile ? MOBILE_QWERTY_ROWS : QWERTY_ROWS;
  return (
    <div className='qwerty-keyboard'>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className='keyboard-row'>
          {row.map((key) => (
            <button
              key={key}
              className='keyboard-key'
              onClick={() => handleKeyClick(key)}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};
