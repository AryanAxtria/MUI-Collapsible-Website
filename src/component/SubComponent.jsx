import React from 'react';
import { Typography, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel } from '@mui/material';

const SubComponent = ({ question, questionId, onAnswerChange, selectedAnswer }) => {
  return (
    <div className="subcomponent">
      <FormControl component="fieldset">
        <FormLabel component="legend" >{question.question}</FormLabel>
        <RadioGroup
          aria-label={question.subheading}
          name={`question-${question.subheading}-${question.id}`}
          value={selectedAnswer}
          onChange={(e) => onAnswerChange(questionId, e.target.value)}
          sx={{
            display: 'flex',
            flexDirection: 'row',   
            justifyContent:'space-evenly',
            width: '100%',     
            gap:13.5,
          }}
        >
          {question.options.map((option, index) => (
            <FormControlLabel
              key={index}
              value={option}
              control={<Radio />}
              label={option}
              sx={{
                textAlign:'center',
              }}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default SubComponent;
