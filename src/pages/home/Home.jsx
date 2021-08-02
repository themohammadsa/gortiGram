import '../../App.css';
import { Box, Flex, Spacer } from '@chakra-ui/react';
import { Posts } from '../../features/posts/Posts';
import { Suggestions } from '../../features/suggestions/Suggestions';

export const Home = () => {
  return (
    <>
      <Box width="97%" className="mobile">
        <Suggestions />
      </Box>
      <Flex mt="3rem">
        <Box width={['100%', '100%', '60%', '65%']}>
          <Posts />
        </Box>
        <Spacer />
        <Box width={['40%', '40%', '40%', '40%', '27%']} className="desktop">
          <Suggestions />
        </Box>
      </Flex>
    </>
  );
};
