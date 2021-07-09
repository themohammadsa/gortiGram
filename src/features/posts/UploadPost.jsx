import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Icon,
  useDisclosure,
  ModalHeader,
  ModalFooter,
  Input,
  Button,
  Text,
  Image,
  Center,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { postImage } from './postSlice';
import {
  buttonPost,
  buttonUpload,
  errorText,
  iconNotificationSize,
} from './styles/UploadPostCard';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dashinmohammad';
const CLOUDINARY_PRESET = 'gortigram_image';

export const UploadPost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState('');

  const dispatch = useDispatch();
  const toast = useToast();
  const username = useSelector((state) => state.auth.username);

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

  const postHandler = async (image) => {
    onClose();
    const formData = new FormData();
    const file = image;
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_PRESET);
    const response = await fetch(`${CLOUDINARY_URL}/image/upload`, {
      method: 'POST',
      body: formData,
    });
    const res = await response.json();
    const filename = res.original_filename;
    const url = res.url;
    dispatch(postImage({ filename, url, caption, username }));
    setImage(null);
    toast({
      title: `Post added!`,
      status: 'success',
      isClosable: true,
    });
  };

  return (
    <>
      <Icon as={AiFillPlusCircle} {...iconNotificationSize} onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mx="1rem">
          <ModalHeader>Create a post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              type="text"
              placeholder="Type your caption"
              mb="3"
              height="4rem"
              onChange={(event) => setCaption(event.target.value)}
            />
            <Center>
              <Image
                src={preview}
                mt="5"
                objectFit="cover"
                boxSize={image ? '300px' : '0px'}
              />
            </Center>

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
                <span> Upload Image</span>
              </label>
            </Button>
            <Button
              {...buttonPost}
              disabled={image && caption ? false : true}
              onClick={() => postHandler(image)}
            >
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
