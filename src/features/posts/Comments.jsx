import { Box, Button, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { buttonLink } from './styles/PostCardStyle';

export const Comments = ({ post }) => {
  const navigate = useNavigate();
  const [viewComments, setViewComments] = useState(false);
  const totalComments = post.comments.length;

  return (
    <>
      <Box>
        {totalComments > 1 && (
          <Button
            {...buttonLink}
            color="gray.400"
            onClick={() => setViewComments(!viewComments)}
          >
            View all {totalComments} comments
          </Button>
        )}
        <Box>
          <Button
            {...buttonLink}
            mr="0.5rem"
            onClick={() => navigate(`/profile/${post.comments[0].username}`)}
          >
            {post.comments[0]?.username}
          </Button>
          <Text style={{ display: 'inline-block' }}>
            {post.comments[0]?.comment}
          </Text>
        </Box>

        {viewComments &&
          post.comments.map((comment, index) => {
            return (
              <div key={index}>
                <Box width="95%">
                  <Text>
                    <Button
                      {...buttonLink}
                      mr="0.5rem"
                      onClick={() => navigate(`/profile/${comment.username}`)}
                    >
                      {comment.username}
                    </Button>
                    {comment.comment}
                  </Text>
                </Box>
              </div>
            );
          })}
      </Box>
    </>
  );
};
