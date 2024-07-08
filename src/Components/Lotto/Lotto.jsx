
import React, { useState, useEffect } from 'react';
import "../Lotto.css";

export default function Lotto({ option }) {
  const [optnum, setOptNum] = useState('');
  const [selectGame, setSelectGame] = useState(Number(option));
  const [userNumbers, setUserNumbers] = useState([]);
  const [commonCount, setCommonCount] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [userInfo, setUserInfo] = useState('');
  const [pcInfo, setPcInfo] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setSelectGame(Number(option)); 
    let fieldsCount;

    switch (Number(option)) {
      case 5:
        fieldsCount = 90;
        break;
      case 6:
        fieldsCount = 45;
        break;
      case 7:
        fieldsCount = 35;
        break;
      default:
        break;
    }

    setOptNum(fieldsCount);
    setUserNumbers(Array(Number(option)).fill(''));
  }, [option]);

  const handleUserNumberChange = (index, value) => {
    const newValue = value.trim();

    if (isNaN(newValue) || !Number.isInteger(Number(newValue))) {
      setErrorMessage('Csak egész számokat lehet megadni!');
      return;
    }

    const intValue = parseInt(newValue, 10);

    if (intValue < 1 || intValue > optnum) {
      setErrorMessage(`Csak 1 és ${optnum} közötti számokat lehet megadni!`);
      return;
    }

    const newUserNumbers = [...userNumbers];
    newUserNumbers[index] = newValue;

    if (hasEmptyValues(newUserNumbers)) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }

    setUserNumbers(newUserNumbers);
    setErrorMessage('');
  };

  const hasEmptyValues = (array) => {
    return array.includes("");
  };

  const compareNumbers = () => {
    const userNums = userNumbers.map(num => parseInt(num, 10)).filter(num => !isNaN(num));
    
    const hasDuplicates = (array) => {
      return new Set(array).size !== array.length;
    };

    if (hasDuplicates(userNums)) {
      setErrorMessage('A számok nem lehetnek azonosak!');
      return;
    }
    
    const uniqueNumbers = new Set();
    while (uniqueNumbers.size < selectGame) {
      const randomNumber = Math.floor(Math.random() * optnum) + 1;
      uniqueNumbers.add(randomNumber);
    }

    const sortedNumbers = [...uniqueNumbers].sort((a, b) => a - b);
    const commonNums = userNums.filter(num => sortedNumbers.includes(num));
    setCommonCount(commonNums.length);
    setUserInfo(userNumbers.join(', '))
    setPcInfo(sortedNumbers.join(', '));
    setIsDisabled(true);
  };

  const resetGame = () => {
    setUserNumbers(Array(selectGame).fill(''));
    setIsDisabled(true);
    setUserInfo('');
    setPcInfo('');
    setCommonCount(null);
    setErrorMessage('');
  };

  return (
    <div className='container'>
      <h2>Lottó - {selectGame}</h2>
      <div className='user-inputs'>
        {userNumbers.map((num, index) => (
          <input
            id={`field-${index}`}
            className='input-field'
            key={index}
            type="text"
            value={num}
            onChange={(e) => handleUserNumberChange(index, e.target.value)}
          />
        ))}
      </div>
      <p className="error-message">{errorMessage}</p>
      <button onClick={compareNumbers} disabled={isDisabled}>Ellenőrzés</button>
      <button onClick={resetGame}>Új játék</button>
      <p className='values'>Játékos számai: {userInfo}</p>
      <p className='values'>Nyerő számok: {pcInfo}</p>
      <p className='values'>Találatok: {commonCount}</p>
    </div>
  );
}
