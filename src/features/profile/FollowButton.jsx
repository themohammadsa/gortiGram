import { Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followUser, unFollowUser } from './profileSlice';

export const FollowButton = ({ username, profile }) => {
  const dispatch = useDispatch();
  const getProfileStatus = useSelector(
    (state) => state.profile.getProfileStatus
  );
  const myUsername = useSelector((state) => state.auth.username);
  const [follow, setFollow] = useState(false);
  const [unfollowLoader, setUnFollowLoader] = useState(false);
  const [followLoader, setFollowLoader] = useState(false);

  const followHandler = () => {
    dispatch(followUser({ myUsername, username }));
    setFollowLoader(true);
    setUnFollowLoader(false);
  };

  const unFollowHandler = () => {
    dispatch(unFollowUser({ myUsername, username }));
    setUnFollowLoader(true);
    setFollowLoader(false);
  };

  useEffect(() => {
    if (getProfileStatus === 'fulfilled') {
      const myUserFollowedUser = profile.followers?.some(
        (follower) => follower.username === myUsername
      );
      myUserFollowedUser ? setFollow(true) : setFollow(false);
    }
  }, [myUsername, profile?.followers, username, getProfileStatus]);

  return (
    <>
      {!follow ? (
        <Button onClick={followHandler} isLoading={followLoader ? true : false}>
          Follow
        </Button>
      ) : (
        <Button
          onClick={unFollowHandler}
          isLoading={unfollowLoader ? true : false}
        >
          Unfollow
        </Button>
      )}
    </>
  );
};
