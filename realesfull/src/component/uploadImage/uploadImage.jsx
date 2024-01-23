
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCloudUpload, AiOutlineDelete } from "react-icons/ai";
import { Button, Group } from "@mantine/core";
import { useUserDetailContext } from "../../Context/userDetailContext";
import './uploadImage.css';
// propertyDetails
const UploadImage = ({
  propertyDetails,
  setPropertyDetails,
  nextStep,
  prevStep,
}) => {
  const [imageURL, setImageURL] = useState(propertyDetails?.image);
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const {userDetails:{flag}   } = useUserDetailContext();

  const handleUpload = () => {
    widgetRef.current?.open();
  };

  const handleEditImage = () =>{
    setPropertyDetails((prev) => ({ ...prev, image: imageURL }));
  }

  const handleDelete = () => {
    setImageURL("");
  };

  const handleNext = () => {
    setPropertyDetails((prev) => ({ ...prev, image: imageURL }));
    nextStep();
  };
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dcdhklrjc",
        uploadPreset: "vx0dyjgc",
        maxFiles: 1,
      },
      (err, result) => {
        if (result.event === "success") {
          setImageURL(result.info.secure_url);
        }
      }
    );
  }, []);

  return (
    <div className="flexColCenter uploadWrapper">
      {!imageURL ? (
        <div className="flexColCenter uploadZone" onClick={handleUpload}>
          <AiOutlineCloudUpload size={50} color="grey" />
          <span>Upload Image</span>
        </div>
      ) : (
        <div className="uploadedImage flexColCenter">
          <img src={imageURL} alt="" />
          <div className="imageActions flexCenter" >
            <Button variant="outline"   onClick={handleUpload}>
            <span > Re-upload </span>
            </Button>
            <Button variant="outline" onClick={handleDelete}>
              <AiOutlineDelete /> <span > Delete </span>
            </Button>
            {(flag && imageURL)? 
              <Button variant="outline"   onClick={handleEditImage}>
            <span > Conform </span>
            </Button> : null
            }
            {flag? <span style={{color:'red'}}> Plese Click on conform to save the New image </span> : null}
          </div>
        </div>
      )}
{ !flag?(
      <Group position="center" mt={"xl"}>
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={handleNext} disabled={!imageURL}>
          Next
        </Button>
      </Group>) :
      null  }
    </div>
  );
};

export default UploadImage;
