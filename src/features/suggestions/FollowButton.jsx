import { Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followUser, unFollowUser } from './suggestionsSlice';

export const FollowButton = ({ profile }) => {
  const dispatch = useDispatch();
  const getSuggestionStatus = useSelector((state) => state.suggestions.status);
  const myUsername = useSelector((state) => state.auth.username);
  const username = profile.username;

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
    if (getSuggestionStatus === 'fulfilled') {
      const myUserFollowedUser = profile.followers?.some(
        (follower) => follower.username === myUsername
      );
      myUserFollowedUser ? setFollow(true) : setFollow(false);
    }
  }, [myUsername, profile?.followers, username, getSuggestionStatus]);

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
