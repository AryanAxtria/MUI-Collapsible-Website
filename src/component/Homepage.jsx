import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button, Divider, Box, IconButton } from '@mui/material';
import { FaDatabase } from "react-icons/fa";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EmployeeIdModal from './EmployeeIdModal';
import Configs from './Configs';
import Component from './Component';

const HomePage = () => {
  const [openComponent, setOpenComponent] = useState(null);
  const [openSubcategory, setOpenSubcategory] = useState({});
  const [empId, setEmpId] = useState('');
  const [answers, setAnswers] = useState({});
  const [subheading, setSubheading] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleComponentClick = (componentId) => {
    setOpenComponent(prevOpen => prevOpen === componentId ? null : componentId);
    if (openComponent === componentId) {
      setOpenSubcategory({});
    }
  };

  const handleSubcategoryClick = (componentId, subcategoryTitle) => {
    setOpenSubcategory(prev => ({
      ...prev,
      [componentId]: prev[componentId] === subcategoryTitle ? null : subcategoryTitle
    }));
  };

  const handleSubmit = () => {
    setIsModalOpen(true);
  };

  const handleEmployeeIdSubmit = (userEmpId) => {
    setEmpId(userEmpId);
    const submissionData = {
      empId: userEmpId,
      answers
    };
    console.log('Submission Data:', submissionData);
    localStorage.setItem('submission_data', JSON.stringify(submissionData));
    alert('Submission successful!');
    setAnswers({});
  };

  return (
    <Box className="home-container" p={3}>
      <Box display="flex" alignItems="center" mb={2}>
        <FaDatabase style={{ fontSize: 40, marginRight: 10 }} />
        <Typography variant="h4" fontWeight="bold">Data Quality Index</Typography>
      </Box>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        Comprehensive Assessment of Data Quality for Improved Decision-Making
      </Typography>

      <Divider sx={{ my: 2 }} />

      {Configs.map(config => (
        <Accordion key={config.id} expanded={openComponent === config.id} onChange={() => handleComponentClick(config.id)}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel-${config.id}-content`} id={`panel-${config.id}-header`}>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
              {config.icon}
              <Box ml={1}>{config.title}</Box>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {config.subcategories.map(subcategory => (
              <Box key={subcategory.title} mb={2}>
                <Typography variant="subtitle1" sx={{ cursor: 'pointer', fontWeight: 'bold' }} onClick={() => handleSubcategoryClick(config.id, subcategory.title)}>
                  {subcategory.title}
                </Typography>
                {openSubcategory[config.id] === subcategory.title && (
                  <Component
                    componentTitle={config.title}
                    jsonFile={subcategory.jsonFile}
                    answers={answers}
                    setAnswers={setAnswers}
                    subheading={subheading}
                    setSubheading={setSubheading}
                  />
                )}
              </Box>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}

      <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 3 }}>
        Submit
      </Button>

      <EmployeeIdModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleEmployeeIdSubmit}
      />
    </Box>
  );
};

export default HomePage;
