import React, { useState } from 'react';
import styled from 'styled-components';
import * as Icons from 'feather-icons-react';

const PickerContainer = styled.div`
  display: ${(props) => (props.show ? 'block' : 'none')};
  width: ${(props) => props.width}px; /* Adjusted width */
  max-height: ${(props) => props.height}px;
  overflow: hidden; /* Ensure no overflow */
  position: absolute;
  background-color: #f0f0f0; /* Cement white background */
  border-radius: 16px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 10;
`;

const ContentWrapper = styled.div`
  padding: 20px;
`;

const Heading = styled.h2`
  color: #333;
  font-family: 'Poppins', sans-serif;
  text-align: center;
  margin-bottom: 20px;
`;

const IconGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
  grid-gap: 20px;
  max-height: ${(props) => props.maxHeight}px; 
  overflow-y: auto; /* Add scrollbar */
`;

const Icon = styled.div`
  width: ${(props) => props.iconWidth}px;
  height: ${(props) => props.iconHeight}px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: #007bff; /* Solid blue background */
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    background-color: #0056b3; /* Darker blue on hover */
  }
  & > svg {
    color: #ffffff; 
  }
`;

const CenteredView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const PaginationControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
`;

const Arrow = styled.span`
  cursor: pointer;
  user-select: none;
  margin: 0 10px;
  color: #007bff;
  &:hover {
    color: #0056b3;
  }
`;

const PageText = styled.span`
  font-weight: bold;
  color: #000;
  margin-right: 5px;
`;

const PageIndicator = styled.span`
  font-weight: ${(props) => (props.isCurrent ? 'bold' : 'normal')};
  color: ${(props) => (props.isCurrent ? '#000' : '#aaa')};
`;

const Button = styled.button`
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
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const IconPicker = ({
  rowsInOnePage,
  columnsInOnePage,
  iconHeight,
  iconWidth,
  pickerHeight = 500, 
  pickerWidth = 500, 
  onSelectIcon,
  show,
  onClose,
}) => {
  const [page, setPage] = useState(0);
  const [viewingIcon, setViewingIcon] = useState(null);

  const iconsArray = Object.keys(Icons);

  const iconsPerPage = rowsInOnePage * columnsInOnePage;
  const totalPages = Math.ceil(iconsArray.length / iconsPerPage);

  const handleIconClick = (icon) => {
    setViewingIcon(icon);
  };

  const handleBack = () => {
    setViewingIcon(null);
  };

  return (
    <PickerContainer width={pickerWidth} height={pickerHeight} show={show}>
      <ContentWrapper>
        {viewingIcon ? (
          <CenteredView>
            <Heading>Select App Icon</Heading>
            <Icon iconWidth={iconWidth} iconHeight={iconHeight}>
              {React.createElement(Icons[viewingIcon])}
            </Icon>
            <div style={{ marginTop: '20px' }}>
              <Button onClick={handleBack}>Done</Button>
            </div>
          </CenteredView>
        ) : (
          <>
            <Heading>Select App Icon</Heading>
            <IconGrid columns={columnsInOnePage} iconWidth={iconWidth} iconHeight={iconHeight} maxHeight={pickerHeight - 180}>
              {iconsArray
                .slice(page * iconsPerPage, (page + 1) * iconsPerPage)
                .map((icon) => (
                  <Icon key={icon} iconWidth={iconWidth} iconHeight={iconHeight} onClick={() => handleIconClick(icon)}>
                    {React.createElement(Icons[icon])}
                  </Icon>
                ))}
            </IconGrid>
            <PaginationControls>
              {page > 0 && <Arrow onClick={() => setPage(page - 1)}>{'<'}</Arrow>}
              <PageText>Page</PageText>
              <PageIndicator isCurrent={true}>{page + 1}</PageIndicator>
              <PageIndicator isCurrent={false}> of {totalPages}</PageIndicator>
              {page < totalPages - 1 && <Arrow onClick={() => setPage(page + 1)}>{'>'}</Arrow>}
            </PaginationControls>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <Button onClick={onClose}>Cancel</Button>
            </div>
          </>
        )}
      </ContentWrapper>
    </PickerContainer>
  );
};

export default IconPicker;
