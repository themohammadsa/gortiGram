import { Box, Button, Center, Image, Text } from '@chakra-ui/react';
import { boxSize, buttonLink, imageProfile } from './styles/PostCardStyle';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { LikesModal } from './LikesModal';
import { useNavigate } from 'react-router-dom';
import { PostCommentModal } from './PostCommentModal';
import { Comments } from './Comments';
import { LikeButton } from './LikeButton';

export const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();
  const username = useSelector((state) => state.auth.username);

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
        <Box d="flex" m="1rem">
          <Image
            {...imageProfile}
            src={post.profilePicture}
            fallbackSrc="https://via.placeholder.com/125"
          />

          <Button
            {...buttonLink}
            onClick={() => navigate(`/profile/${post.username}`)}
          >
            {post.username}{' '}
          </Button>
        </Box>

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
