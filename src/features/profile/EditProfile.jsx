import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Center,
  Image,
  useDisclosure,
  ModalHeader,
  ModalFooter,
  Input,
  Button,
  Text,
  FormLabel,
  Box,
  FormControl,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postProfile } from './profileSlice';
import { buttonPost, errorText, buttonUpload } from './styles/EditProfileCard';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dashinmohammad';
const CLOUDINARY_PRESET = 'gortigram_image';

export const EditProfile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [bio, setBio] = useState('');
  const [website, setWebsite] = useState('');
  const [error, setError] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');

  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.username);
  const toast = useToast();

  const uploadHandler = (event) => {
    const image = event.target.files[0];
    const type = ['image/jpeg', 'image/png'];
    if (image && type.includes(image.type)) {
      setImage(image);
      const imageReader = new FileReader();
      imageReader.readAsDataURL(image);
      imageReader.onload = function () {
        setPreview(imageReader.result);
      };
      setError('');
    } else {
      setImage(null);
      setError('Please upload images of file type: .png or .jpeg');
    }
  };

  const updateHandler = async () => {
    onClose();
    setError('');
    if (bio.length > 150) {
      setError('Bio length should be less than 150 chars');
    } else if (website.length > 100) {
      setError('Website length should be less than 100 chars');
    } else if (image) {
      const formData = new FormData();
      const file = image;
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_PRESET);
      const response = await fetch(`${CLOUDINARY_URL}/image/upload`, {
        method: 'POST',
        body: formData,
      });
      const res = await response.json();
      const profilePicture = res.url;
      dispatch(postProfile({ bio, website, profilePicture, username }));
    }
    dispatch(postProfile({ bio, website, username }));
    setImage(null);
    toast({
      title: `Profile updated!`,
      status: 'success',
      isClosable: true,
    });
  };

  return (
    <>
      <Button onClick={onOpen}>Edit Profile</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mx="1rem">
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="bio" mb="5">
              <FormLabel>Bio</FormLabel>
              <Input
                type="text"
                placeholder="Enter your bio"
                mb="3"
                height="3rem"
                onChange={(event) => setBio(event.target.value)}
              />
            </FormControl>
            <FormControl id="website" mb="5">
              <FormLabel>Website</FormLabel>
              <Input
                type="text"
                placeholder="Enter your website"
                mb="3"
                height="3rem"
                onChange={(event) => setWebsite(event.target.value)}
              />
            </FormControl>
            {image && (
              <Box>
                <Text fontWeight="semibold">Profile Picture</Text>
                <Center>
                  <Image
                    src={preview}
                    mt="5"
                    objectFit="cover"
                    borderRadius="50%"
                    boxSize="300px"
                  />
                </Center>
              </Box>
            )}
            <Text {...errorText}>{error}</Text>
          </ModalBody>

          <ModalFooter>
            <Button {...buttonUpload}>
              <label>
                <input
                  type="file"
                  style={{ height: '0', width: '0' }}
                  onChange={uploadHandler}
                />
                <span> Upload Profile Picture</span>
              </label>
            </Button>
            <Button
              {...buttonPost}
              disabled={bio || website ? false : true}
              onClick={updateHandler}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
