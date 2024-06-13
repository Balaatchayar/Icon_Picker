import React, { useState } from 'react';
import styled from 'styled-components';
import IconPicker from './components/IconPicker';
import * as Icons from 'feather-icons-react';

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ffffff; /* White background */
`;

const SmallDiv = styled.div`
  width: 100px;
  height: 100px;
  background-color: #007bff;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 20px;
  cursor: pointer;
`;

const SelectedIconContainer = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const SelectedIcon = styled.div`
  margin-bottom: 10px;
`;

const DoneButton = styled.button`
  background-color: #007bff;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  &:hover {
    background-color: #0056b3;
  }
`;

const Footer = styled.footer`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  color: #888;
`;

const App = () => {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [pickerVisible, setPickerVisible] = useState(false);

  const handleSelectIcon = (icon) => {
    setSelectedIcon(icon);
  };

  const togglePicker = () => {
    setPickerVisible(!pickerVisible);
  };

  const handleDone = () => {
    // Handle what should happen when "Done" is clicked
    console.log('Selected Icon:', selectedIcon);
    // For now, just close the picker
    setPickerVisible(false);
  };

  const renderSelectedIcon = () => {
    if (selectedIcon) {
      const IconComponent = Icons[selectedIcon];
      return (
        <SelectedIconContainer>
          <SelectedIcon>
            <h3>Selected Icon:</h3>
            <IconComponent />
          </SelectedIcon>
          <DoneButton onClick={handleDone}>Done</DoneButton>
        </SelectedIconContainer>
      );
    }
    return null;
  };

  return (
    <AppContainer>
      <SmallDiv onClick={togglePicker}>Select Icon</SmallDiv>
      <IconPicker
        rowsInOnePage={4}
        columnsInOnePage={8}
        iconHeight={50}
        iconWidth={50}
        pickerHeight={500}
        pickerWidth={500}
        onSelectIcon={handleSelectIcon}
        show={pickerVisible}
        onClose={() => setPickerVisible(false)}
      />
      {renderSelectedIcon()}
      <Footer>
        Designed and Developed by{' '}
        <a
          href="https://balaatchayar.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Bala Atchaya R
        </a>
      </Footer>
    </AppContainer>
  );
};

export default App;
