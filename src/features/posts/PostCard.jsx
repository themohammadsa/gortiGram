import {
  Box,
  Button,
  Center,
  Image,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
  Icon,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import { FiMoreVertical } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import {
  boxSize,
  buttonLink,
  iconSize,
  imageProfile,
} from './styles/PostCardStyle';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { LikesModal } from './LikesModal';
import { useNavigate } from 'react-router-dom';
import { PostCommentModal } from './PostCommentModal';
import { Comments } from './Comments';
import { LikeButton } from './LikeButton';
import { deletePost } from './postSlice';

export const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.username);

  const deleteHandler = () => {
    const postId = post._id;
    dispatch(deletePost({ postId }));
    toast({
      title: `Post deleted!`,
      status: 'success',
      isClosable: true,
    });
  };

  useEffect(() => {
    const hasUserLiked = post.likes.some(
      (likedUser) => likedUser.username === username
    );
    if (hasUserLiked) setLiked(true);
    else setLiked(false);
  }, [post.likes, username]);

  return (
    <>
      <Box {...boxSize}>
        <Flex m="1rem">
          <Image
            {...imageProfile}
            src={post.profilePicture}
            fallbackSrc="https://via.placeholder.com/125"
          />

          <Button
            {...buttonLink}
            onClick={() => navigate(`/profile/${post.username}`)}
          >
            {post.username}
          </Button>
          <Spacer />

          {username === post.username && (
            <Menu>
              <MenuButton>
                <Icon as={FiMoreVertical} {...iconSize} />
              </MenuButton>

              <MenuList color="blue.600" minW="2rem">
                <MenuItem mr="1rem" onClick={deleteHandler}>
                  <Icon as={MdDelete} {...iconSize} mr="0.5rem" />
                  Delete Post
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>

        <Center>
          <Image objectFit="cover" src={post.url} boxSize="100%" />
        </Center>

        <Box ml="1rem">
          <Box mb="1rem">
            <LikeButton liked={liked} post={post} username={username} />
            <PostCommentModal post={post} username={username} />
          </Box>

          <LikesModal post={post} />

          <Box>
            <Text>
              <Button
                {...buttonLink}
                mr="0.5rem"
                onClick={() => navigate(`/profile/${post.username}`)}
              >
                {post.username}
              </Button>
              {post.caption}
            </Text>
          </Box>

          <Comments post={post} />
        </Box>
      </Box>
    </>
  );
};
