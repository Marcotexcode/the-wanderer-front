import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style/Character.css';
import { useCharacterScript } from './script/Character';

function Character() {

  const navigate = useNavigate();
  const {
    name, setName,
    characterClass, setCharacterClass,
    strength,
    life,
    totalPoints,
    handleCharacterCreation,
    handleStrengthChange,
    handleLifeChange
  } = useCharacterScript(navigate);

  return (
    <div className="character-container">
      <div className="character-card">
      <form onSubmit={handleCharacterCreation}>
        <label htmlFor="name">Nome</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="class">Classe</label>
        <input
          id="class"
          type="text"
          value={characterClass}
          onChange={(e) => setCharacterClass(e.target.value)}
        />
        <label htmlFor="strength">Forza</label>
        <input
          id="strength"
          type="number"
          value={strength}
          onChange={handleStrengthChange}
          min="0"
          max={totalPoints + strength}
        />
        <label htmlFor="life">Vita</label>
        <input
          id="life"
          type="number"
          value={life}
          onChange={handleLifeChange}
          min="0"
          max={totalPoints + life}
        />
        <p>Punti: {totalPoints}/30</p>
        {totalPoints === 0 && <p>Non ci sono più punti disponibili da dividere.</p>}
        <button type="submit">Create Character</button>
      </form>
      </div>
    </div>
  );
}

export default Character;