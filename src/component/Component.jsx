import React, { useState, useEffect } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
            <Accordion key={index}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{question.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <SubComponent 
                  question={question}
                  questionId={index}
                  onAnswerChange={handleAnswerChange}
                  selectedAnswer={answers[`${componentTitle}_${subheading}_${index}`] || ""}
                />
              </AccordionDetails>
            </Accordion>
          ))}
          <Button onClick={handleReset} variant="outlined" color="primary" sx={{ mt: 2 }}>
            Reset All
          </Button>
        </>
      ) : (
        <Typography>Loading questions...</Typography>
      )}
    </div>
  );
};

export default Component;
