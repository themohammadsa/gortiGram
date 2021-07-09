import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import { Button, Icon } from '@chakra-ui/react';
import { dislikePost, likePost } from './postSlice';
import { useDispatch } from 'react-redux';
import { buttonLike, iconNotificationSize } from './styles/LikeButtonCard';
import { useState } from 'react';

export const LikeButton = ({ liked, post, username }) => {
  const postId = post._id;
  const dispatch = useDispatch();
  const [likeLoader, setLikeLoader] = useState(false);
  const [dislikeLoader, setDislikeLoader] = useState(false);

  const likeHandler = () => {
    dispatch(likePost({ username, postId }));
    setLikeLoader(true);
    setDislikeLoader(false);
  };

  const dislikeHandler = () => {
    dispatch(dislikePost({ username, postId }));
    setDislikeLoader(true);
    setLikeLoader(false);
  };

  return (
    <>
      {!liked ? (
        <Button
          {...buttonLike}
          onClick={() => likeHandler()}
          isLoading={likeLoader ? true : false}
        >
          <Icon as={AiOutlineLike} {...iconNotificationSize} />
          Like
        </Button>
      ) : (
        <Button
          {...buttonLike}
          onClick={() => dislikeHandler()}
          isLoading={dislikeLoader ? true : false}
        >
          <Icon as={AiFillLike} {...iconNotificationSize} />
          Like
        </Button>
      )}
    </>
  );
};
