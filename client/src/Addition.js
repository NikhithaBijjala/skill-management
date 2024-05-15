import React, { useState, useEffect } from 'react';

const Addition = () => {
  const [name, setName] = useState('');
  const [skill, setSkill] = useState('');
  const [suggestedSkills, setSuggestedSkills] = useState([]);
  const [dbSkills, setDbSkills] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetchSkillsFromDatabase();
  }, []);

  const fetchSkillsFromDatabase = () => {
    const fakeSkillsFromDatabase = ['JavaScript', 'React', 'Node.js', 'HTML', 'CSS'];
    setSuggestedSkills(fakeSkillsFromDatabase);
    setDbSkills(fakeSkillsFromDatabase)
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSkillChange = (event) => {
    const value = event.target.value;
    setSkill(value);
    if (!value){
        setSuggestedSkills(dbSkills);
    }
    else{
        const filteredSkills = suggestedSkills.filter((skill) =>
        skill.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestedSkills(filteredSkills);
    }
  };

  const handleAddition = () => {
    if (skill.trim() !== '') {
      if (!skills.includes(skill)) {
        setSkills([...skills, skill]);
        setSuggestedSkills(dbSkills);
      }
      setSkill('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAddition();
    }
  };

  return (
    <div>
      <label>
        Name:
        <input type="text" value={name} onChange={handleNameChange} />
      </label>
      <br />
      <label>
        Skills:
        <input
          type="text"
          value={skill}
          onChange={handleSkillChange}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleAddition}>Add</button>
      </label>
      <br />
      <p>Suggestions based on your input:</p>
      <ul>
        {suggestedSkills.map((suggestedSkill, index) => (
          <li key={index}>{suggestedSkill}</li>
        ))}
      </ul>
      <br />
      <p>Skills added:</p>
      <ul>
        {skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </div>
  );
};

export default Addition;
