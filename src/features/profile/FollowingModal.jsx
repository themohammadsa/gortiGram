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
import { buttonLink, imageProfile } from './styles/FollowersModalCard';

export const FollowingModal = ({ profile }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  return (
    <>
      <Button onClick={onOpen} {...buttonLink} mb="0.2rem">
        {profile?.following.length} following
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mx="1rem" pb="1rem">
          <ModalHeader>Following</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {profile?.following.map((followingUser, index) => {
              return (
                <div key={index}>
                  <Box d="flex" mb="1.5rem">
                    <Image
                      {...imageProfile}
                      src={followingUser.profilePicture}
                    />
                    <Button
                      {...buttonLink}
                      alignSelf="center"
                      onClick={() => {
                        navigate(`/profile/${followingUser.username}`);
                        onClose();
                      }}
                    >
                      {followingUser.username}
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
