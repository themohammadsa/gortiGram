import { Box, Button, Image, Text, Flex, Spacer } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { buttonLink, imageProfile } from './styles/SuggestionCard';
import { FollowButton } from './FollowButton';

export const SuggestionPost = ({ profile }) => {
  const navigate = useNavigate();

  return (
    <>
      <Flex mb="1.5rem">
        <Image
          {...imageProfile}
          src={profile.profilePicture}
          fallbackSrc="https://via.placeholder.com/125"
        />

        <Box d="flex" flexDirection="column">
          <Button
            {...buttonLink}
            onClick={() => navigate(`/profile/${profile.username}`)}
          >
            {profile.username}
          </Button>
          <Text color="gray.500" fontSize="0.8rem">
            Followed by {profile.followers.length}
          </Text>
        </Box>
        <Spacer />

        <FollowButton profile={profile} />
      </Flex>
    </>
  );
};
