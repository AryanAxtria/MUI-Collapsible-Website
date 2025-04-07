import React, { useState, useEffect } from 'react';
import { Typography, Button } from '@mui/material';
import SubComponent from './SubComponent';

const Component = ({ componentTitle, jsonFile, answers, setAnswers, subheading, setSubheading }) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const questionsModule = await import(`../assets/${jsonFile}.json`);

        if (questionsModule.default && Array.isArray(questionsModule.default.questions)) {
          setQuestions(questionsModule.default.questions);
          setSubheading(questionsModule.default.subheading || '');
        } else {
          console.error('Invalid JSON structure: "questions" array missing');
        }
      } catch (error) {
        console.error('Error loading questions:', error);
      }
    };

    loadQuestions();
  }, [jsonFile, setSubheading]);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [`${componentTitle}_${subheading}_${questionId}`]: answer
    }));
  };

  const handleReset = () => {
    setAnswers(prev => {
      const newAnswers = { ...prev };
      Object.keys(newAnswers).forEach(key => {
        if (key.startsWith(`${componentTitle}_${subheading}_`)) {
          delete newAnswers[key];
        }
      });
      return newAnswers;
    });
  };

  return (
    <div className="component-questions">
      {questions.length > 0 ? (
        <>
          {questions.map((question, index) => (
            <div key={index} className="question-item">
              {/* <Typography variant="h6">{question.question}</Typography> */}
              <SubComponent
                question={question}
                questionId={index}
                onAnswerChange={handleAnswerChange}
                selectedAnswer={answers[`${componentTitle}_${subheading}_${index}`] || ""}
              />
            </div>
          ))}
          <div className='reset-button'>
          <Button  onClick={handleReset} variant="outlined" color="primary" sx={{ mt: 2 }}>
            Reset All
          </Button>
          </div> 
        </>
      ) : (
        <Typography>Loading questions...</Typography>
      )}
    </div>
  );
};

export default Component;
