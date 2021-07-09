import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  ModalHeader,
  ModalFooter,
  Input,
  Button,
  Icon,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { BiComment } from 'react-icons/bi';
import { iconNotificationSize, buttonPost } from './styles/PostCardStyle';
import { postComment } from '../posts/postSlice';
import { buttonLike } from './styles/LikeButtonCard';

export const PostCommentModal = ({ post, username }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const postId = post._id;

  const postHandler = () => {
    dispatch(postComment({ postId, username, comment }));
    onClose();
  };

  return (
    <>
      <Button {...buttonLike} onClick={onOpen}>
        <Icon as={BiComment} {...iconNotificationSize} />
        Comment
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mx="1rem">
          <ModalHeader>Comment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              type="text"
              placeholder="Add a comment.."
              mb="3"
              height="3rem"
              onChange={(event) => setComment(event.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button {...buttonPost} onClick={postHandler}>
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
