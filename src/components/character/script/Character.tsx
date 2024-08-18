// characterLogic.js
import axios from 'axios';
import  { useState, useEffect } from 'react';
import { NavigateFunction } from 'react-router-dom';


export const useCharacterScript = (navigate: NavigateFunction) => {
  const [name, setName] = useState('');
  const [characterClass, setCharacterClass] = useState('');
  const [strength, setStrength] = useState(0);
  const [life, setLife] = useState(0);
  const [totalPoints, setTotalPoints] = useState(30);
  const [token, setToken] = useState('');

  useEffect(() => {
    const userToken = localStorage.getItem('token');
    if (userToken) {
      setToken(userToken);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleCharacterCreation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name && characterClass && strength && life) {
      try {
        const response = await axios.post('http://localhost:3001/character-create', 
          { name, characterClass, strength, life },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data) {
          localStorage.setItem('hasCreatedCharacter', 'true');
          navigate('/map');
        } else {
          console.log('Character creation failed: Invalid response');
        }
      } catch (error) {
        console.error('Error during character creation:', error);
      }
    } else {
      console.log('Please fill in all fields');
    }
  };

  const handleStrengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStrength = parseInt(e.target.value);
    if (newStrength >= 0 && newStrength <= totalPoints + strength) {
      const pointsUsed = newStrength - strength;
      setStrength(newStrength);
      setTotalPoints(totalPoints - pointsUsed);
    }
  };

  const handleLifeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLife = parseInt(e.target.value);
    if (newLife >= 0 && newLife <= totalPoints + life) {
      const pointsUsed = newLife - life;
      setLife(newLife);
      setTotalPoints(totalPoints - pointsUsed);
    }
  };

  return {
    name, setName,
    characterClass, setCharacterClass,
    strength, setStrength,
    life, setLife,
    totalPoints,
    handleCharacterCreation,
    handleStrengthChange,
    handleLifeChange
  };
};
