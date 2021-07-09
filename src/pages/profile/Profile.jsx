import '../../App.css';
import { Box, Center } from '@chakra-ui/react';
import { ProfileContent } from '../../features/profile/ProfileContent';
import { ProfileHeader } from '../../features/profile/ProfileHeader';
import { ProfileHeaderMobile } from '../../features/profile/ProfileHeaderMobile';

export const Profile = () => {
  return (
    <>
      <Box>
        <Center className="desktop">
          <ProfileHeader />
        </Center>

        <Center className="mobile">
          <ProfileHeaderMobile />
        </Center>

        <Center>
          <ProfileContent />
        </Center>
      </Box>
    </>
  );
};
