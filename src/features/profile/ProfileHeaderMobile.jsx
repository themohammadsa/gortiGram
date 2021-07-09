import {
  Box,
  Image,
  Heading,
  Text,
  Link,
  VStack,
  Flex,
  Center,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { EditProfile } from './EditProfile';
import { FollowersModal } from './FollowersModal';
import { FollowingModal } from './FollowingModal';
import { getProfile } from './profileSlice';
import { FollowButton } from './FollowButton';
import {
  headerSizeMobile,
  imageProfilePictureMobile,
} from './styles/ProfileContentCard';

export const ProfileHeaderMobile = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profile);
  const profilePosts = useSelector((state) => state.profile.profilePosts);
  const editProfile = useSelector((state) => state.profile.postProfileStatus);
  const followStatus = useSelector((state) => state.profile.followUserStatus);
  const unFollowStatus = useSelector(
    (state) => state.profile.unFollowUserStatus
  );
  const myUsername = useSelector((state) => state.auth.username);
  const [showFollowButton, setShowFollowButton] = useState(false);

  useEffect(() => {
    if (username === myUsername) setShowFollowButton(false);
    else setShowFollowButton(true);
    dispatch(getProfile({ username }));
  }, [
    username,
    dispatch,
    editProfile,
    followStatus,
    unFollowStatus,
    myUsername,
  ]);

  return (
    <>
      {profile && (
        <Box>
          <VStack {...headerSizeMobile}>
            <Box alignSelf="center" >
              <Flex alignSelf="flex-start" mb="1rem">
                <Image
                  {...imageProfilePictureMobile}
                  src={profile.profilePicture}
                  fallbackSrc="https://via.placeholder.com/125"
                />
                <Box>
                  <Heading mb="0.5rem">{profile.username}</Heading>
                  {!showFollowButton ? (
                    <EditProfile />
                  ) : (
                    <FollowButton username={username} profile={profile} />
                  )}
                </Box>
              </Flex>

              <Box>
                <Text fontWeight="semibold"> {profile.name} </Text>

                <Text>{profile.bio}</Text>
                <Link
                  fontWeight="semibold"
                  color="blue.600"
                  href={profile.website}
                  isExternal
                >
                  {profile.website}
                </Link>
              </Box>
            </Box>
            <Center mb="10" d="flex" justifyContent="space-around" width="100%">
              <Text fontWeight="semibold">{profilePosts?.length} posts</Text>
              <Box>
                <FollowersModal profile={profile} />
              </Box>
              <Box>
                <FollowingModal profile={profile} />
              </Box>
            </Center>
          </VStack>
        </Box>
      )}
    </>
  );
};
