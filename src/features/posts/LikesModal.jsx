import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Image,
  useDisclosure,
  ModalHeader,
  Box,
  Button,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { buttonLink, imageProfile } from './styles/PostCardStyle';

export const LikesModal = ({ post }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const likesNumber = post.likes.length;

  return (
    <>
      <Button onClick={onOpen} {...buttonLink} mb="0.2rem">
        {likesNumber} likes
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mx="1rem" pb="1rem">
          <ModalHeader>{likesNumber} likes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {post.likes.map((likedUser, index) => {
              return (
                <div key={index}>
                  <Box d="flex" mb="1.5rem">
                    <Image {...imageProfile} src={likedUser.profilePicture} />
                    <Button
                      {...buttonLink}
                      alignSelf="center"
                      onClick={() => navigate(`/profile/${likedUser.username}`)}
                    >
                      {likedUser.username}
                    </Button>
                  </Box>
                </div>
              );
            })}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
