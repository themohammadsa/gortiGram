import { Box, Center } from '@chakra-ui/react';
import { ProfileContent } from '../../features/profile/ProfileContent';
import { ProfileHeader } from '../../features/profile/ProfileHeader';
import { ProfileHeaderMobile } from '../../features/profile/ProfileHeaderMobile';
import styles from '../../features/profile/styles/profileHeader.module.css';

export const Profile = () => {
  return (
    <>
      <Box>
        <Center className={styles.desktop}>
          <ProfileHeader />
        </Center>

        <Center className={styles.mobile}>
          <ProfileHeaderMobile />
        </Center>

        <Center>
          <ProfileContent />
        </Center>
      </Box>
    </>
  );
};
