import { Container, Modal, Stepper } from '@mantine/core';
import React, { useState, useEffect } from 'react';
import AddLocation from '../AddLocation/AddLocation';
import { useMyContext } from '../../Context/Contex';
import UploadImage from '../uploadImage/uploadImage';
import BasicDetails from '../BasicDetails/BasicDetails';
import Facilities from '../Facilities/Facilities';
import './AddProp.css';

function AddPropertyModel({ opened, setOpened }) {
  // userContext
  const { user } = useMyContext();
  const email = user?.tokenObject?.email;
  // console.log(email,"emais ")
  const [active, setActive] = useState(0);
  const [orientation, setOrientation] = useState(window.innerWidth <= 700 ? 'vertical' : 'horizontal');

  const [propertyDetails, setPropertyDetails] = useState({
    title: '',
    description: '',
    price: 0,
    country: '',
    city: '',
    address: '',
    image: null,
    facilities: {
      bedrooms: 0,
      parkings: 0,
      bathrooms: 0,
    },
    userEmail: email,
  });

  const nextStep = () => {
    setActive((current) => (current < 4 ? current + 1 : current));
  };

  const prevStep = () => {
    setActive((current) => (current > 0 ? current - 1 : 0));
  };

  useEffect(() => {
    const handleResize = () => {
      setOrientation(window.innerWidth <= 700 ? 'vertical' : 'horizontal');
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Modal opened={opened} onClose={() => setOpened(false)} size={'90rem'}>
      <Container h={'40rem'} w={'100%'}>
        <Stepper active={active} onStepClick={setActive} orientation={orientation}>
          <Stepper.Step label="Location " description="Location Details">
            <AddLocation nextStep={nextStep} propertyDetails={propertyDetails} setPropertyDetails={setPropertyDetails} />
          </Stepper.Step>
          <Stepper.Step label="Upload" description="Images">
            <UploadImage nextStep={nextStep} prevStep={prevStep} propertyDetails={propertyDetails} setPropertyDetails={setPropertyDetails} />
          </Stepper.Step>
          <Stepper.Step label="Basic Details" description="fill Out Details">
            <BasicDetails nextStep={nextStep} prevStep={prevStep} propertyDetails={propertyDetails} setPropertyDetails={setPropertyDetails} />
          </Stepper.Step>
          <Stepper.Step label="Last step" description="Other Details ">
            <Facilities prevStep={prevStep} propertyDetails={propertyDetails} setPropertyDetails={setPropertyDetails} setOpened={setOpened} setActiveStep={setActive} />
          </Stepper.Step>
          <Stepper.Completed></Stepper.Completed>
        </Stepper>
      </Container>
    </Modal>
  );
}

export default AddPropertyModel;
