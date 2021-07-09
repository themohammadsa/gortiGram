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
import styles from './styles/profileHeader.module.css';

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
          <VStack className={styles.mobile} {...headerSizeMobile}>
            <Flex alignSelf="flex-start">
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
            <Center mb="10" d="flex" justifyContent="space-around">
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
