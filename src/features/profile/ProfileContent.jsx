import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPostFromUsername } from './profileSlice';
import { PostCard } from '../posts/PostCard';
import { Box } from '@chakra-ui/react';
import { boxSize } from './styles/ProfileContentCard';

export const ProfileContent = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const profilePosts = useSelector((state) => state.profile.profilePosts);
  const status = useSelector((state) => state.posts.postCommentStatus);

  useEffect(() => {
    dispatch(getPostFromUsername({ username }));
  }, [username, dispatch, status]);

  return (
    <>
      <Box {...boxSize}>
        {profilePosts &&
          profilePosts.map((post, index) => {
            return (
              <div key={index}>
                <Box>
                  <PostCard post={post} />
                </Box>
              </div>
            );
          })}
      </Box>
    </>
  );
};
