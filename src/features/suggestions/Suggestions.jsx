import { Box, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSuggestions } from './suggestionsSlice';
import { SuggestionPost } from './SuggestionPost';
import { textHeading } from './styles/SuggestionCard';

export const Suggestions = () => {
  const dispatch = useDispatch();
  const suggestions = useSelector((state) => state.suggestions.suggestions);
  const followStatus = useSelector(
    (state) => state.suggestions.followUserStatus
  );
  const unFollowStatus = useSelector(
    (state) => state.suggestions.unFollowUserStatus
  );

  useEffect(() => {
    dispatch(getSuggestions());
  }, [dispatch, followStatus, unFollowStatus]);

  return (
    <>
      <Box ml="1rem">
        <Text {...textHeading}>Suggestions For You</Text>
        {suggestions &&
          suggestions.map((profile, index) => {
            return (
              <div key={index}>
                <SuggestionPost profile={profile} />
              </div>
            );
          })}
      </Box>
    </>
  );
};
