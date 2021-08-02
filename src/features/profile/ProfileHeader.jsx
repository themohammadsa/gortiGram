import { Box, Image, Heading, Text, HStack, Link } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { EditProfile } from './EditProfile';
import { FollowersModal } from './FollowersModal';
import { FollowingModal } from './FollowingModal';
import { getProfile } from './profileSlice';
import { FollowButton } from './FollowButton';
import { headerSize, imageProfilePicture } from './styles/ProfileContentCard';

export const ProfileHeader = () => {
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
        <HStack {...headerSize}>
          <Image
            {...imageProfilePicture}
            src={profile.profilePicture}
            fallbackSrc="https://via.placeholder.com/125"
          />

          <Box width={['75%', '75%', '50%']}>
            <Box d="flex" mb="4">
              <Heading mr="10">{profile.username}</Heading>

              {!showFollowButton ? (
                <EditProfile />
              ) : (
                <FollowButton username={username} profile={profile} />
              )}
            </Box>

            <Box d="flex" mb="10">
              <Text mr="10" fontWeight="semibold">
                {profilePosts?.length} posts
              </Text>

              <Box mr="10">
                <FollowersModal profile={profile} />
              </Box>
              <Box mr="10">
                <FollowingModal profile={profile} />
              </Box>
            </Box>

            <Box>
              <Text fontWeight="semibold"> {profile.name} </Text>

              <Text>{profile.bio}</Text>
              <Link
                fontWeight="semibold"
                color="blue.600"
                href={`https://${profile.website}`}
                isExternal
              >
                {profile.website}
              </Link>
            </Box>
          </Box>
        </HStack>
      )}
    </>
  );
};
