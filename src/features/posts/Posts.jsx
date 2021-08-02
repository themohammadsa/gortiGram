import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PostCard } from './PostCard';
import { getPosts } from './postSlice';

export const Posts = () => {
  const posts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();
  const status = useSelector((state) => state.posts.postCommentStatus);
  const likeStatus = useSelector((state) => state.posts.likePostStatus);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, status, likeStatus]);

  return (
    <>
      <Box>
        {posts &&
          posts.map((post, index) => {
            return (
              <div key={index}>
                <PostCard post={post} />
              </div>
            );
          })}
      </Box>
    </>
  );
};
