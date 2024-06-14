import React, { useState, useRef, ChangeEvent } from "react";
import { Image, Modal, Typography } from "antd";
// models
import { SuccessErrorCallback } from "@app/models/callbacks";
// constants
import imageSrc from "../../images/default-avatar.jpg";
// hooks
import { updateUserFirebase } from "../../externalFeeds/firebase.utils";
// redux
import { actions } from "../login/redux";
// components
import ImageCrop from "./ImageCrop";
import { UserState } from "../login/redux/interfaces";
import { useDispatch } from "react-redux";

import { Styled } from "./ImageInput.styled";

const { Title, Text } = Typography;

interface ImageInputProps {
  user: UserState;
}

const ImageInput: React.FC<ImageInputProps> = ({ user }) => {
  const [submittedMsg, setSubmittedMsg] = useState<string>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const imageRef = useRef<Blob | null>();
  const imageBase64Ref = useRef<string | ArrayBuffer | null>();
  const [imageChanging, setImageChanging] = useState<boolean>(false);
  const tempImg = useRef<string>("");

  const dispatch = useDispatch();

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleImageOk = () => {
    const callback: SuccessErrorCallback = (success) => {
      if (success) {
        toggleModal();

        // updateImage To Firestore from ImageBase64
        // @ts-ignore
        submitImageToFirebase(imageBase64Ref.current);

        dispatch(actions.updateUserDetails());
      }
    };
    if (imageRef.current) {
      updateImage(imageRef?.current, callback);
    }
  };

  const updateImage = (image: Blob | null, callback: SuccessErrorCallback) => {
    const promise = new Promise((resolve) => {
      if (!image) {
        return;
      }
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(image);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        imageBase64Ref.current = reader.result;
        resolve(imageBase64Ref.current);
      };
    });
    promise.then(() => {
      callback({ success: "Image Comverted" });
    });
  };

  const updateProfileAvatar = (image: Blob | null) => {
    imageRef.current = image;
  };

  const submitImageToFirebase = async (imageValue: string) => {
    try {
      const response = await updateUserFirebase(user, { avatar: imageValue });
      if (response) {
        setSubmittedMsg("Profile Updated Successfully!");
      }
    } catch (error) {
      setSubmittedMsg(error as string);
    }
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file: File | null = event.target.files ? event.target.files[0] : null;

    if (!file) {
      return;
    }
    getBase64FromImage(file)
      .then((result) => {
        // @ts-ignore
        tempImg.current = result;

        setImageChanging(true);
        toggleModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getBase64FromImage = (file: File) => {
    return new Promise((resolve) => {
      let baseURL: ArrayBuffer | string = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        baseURL = reader.result ?? "";
        resolve(baseURL);
      };
    });
  };
  return (
    <span>
      <Title>User Avatar</Title>
      {submittedMsg && <Text>{submittedMsg}</Text>}
      <Styled.ImageWrapper>
        <Image
          src={user.avatar || imageSrc}
          onClick={toggleModal}
          preview={false}
          alt="Avatar"
        />
      </Styled.ImageWrapper>
      <Styled.ImageInputWrapper>
        <label htmlFor="file" className="action-btn">
          Change Image
        </label>
        <input
          id="file"
          type="file"
          name="file"
          className="sr-only"
          onChange={(e) => handleImageChange(e)}
        />
      </Styled.ImageInputWrapper>
      <Modal visible={isModalOpen} onCancel={toggleModal} onOk={handleImageOk}>
        <Title>Update User Avatar</Title>
        <ImageCrop
          src={imageChanging && tempImg.current ? tempImg.current : user.avatar}
          onCropComplete={updateProfileAvatar}
        />
      </Modal>
    </span>
  );
};

export default ImageInput;
