import {
  Box,
  Flex,
  Spacer,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
  MenuGroup,
  MenuDivider,
} from '@chakra-ui/react';
import styles from './styles/header.module.css';
import logotext from '../../assets/logotext.png';
import { useNavigate } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';
import { FiLogIn } from 'react-icons/fi';
import { AiFillHome } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { SearchBar } from '../searchBar/SearchBar';
import {
  iconSize,
  logoImage,
  iconNotificationSize,
} from './styles/headerStyle';
import { UploadPost } from '../../features/posts/UploadPost';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../features/auth/authSlice';

export const Header = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch();

  const name = useSelector((state) => state.auth.name);
  const token = useSelector((state) => state.auth.token);
  const username = useSelector((state) => state.auth.username);

  const logOutHandler = () => {
    dispatch(logOut());
    toast({
      title: `Logged out Succesfully!`,
      status: 'warning',
      isClosable: true,
    });
  };

  return (
    <>
      <Box>
        <Flex mt="1">
          <Box mt="2">
            <Image
              {...logoImage}
              src={logotext}
              onClick={() => navigate('/')}
            />
          </Box>
          <Spacer />
          <Box mt="1.5" className={styles.desktop}>
            <SearchBar />
          </Box>
          <Spacer />
          <UploadPost />
          <Icon
            as={AiFillHome}
            {...iconNotificationSize}
            onClick={() => navigate('/')}
          />

          <Menu>
            <MenuButton>
              <Icon as={FaUserAlt} {...iconSize} />
            </MenuButton>
            {token && (
              <MenuList color="blue.600">
                <MenuGroup title={`Hi ${name}!`} fontWeight="bold">
                  <MenuDivider />
                  <MenuItem onClick={() => navigate(`/profile/${username}`)}>
                    <Icon as={CgProfile} {...iconSize} mr="2" mt="0.5" />
                    Profile
                  </MenuItem>
                  <MenuItem onClick={logOutHandler}>
                    <Icon as={FiLogIn} {...iconSize} mr="2" mt="1" />
                    Log out
                  </MenuItem>
                </MenuGroup>
              </MenuList>
            )}
          </Menu>
        </Flex>
        <Box m="2.5" className={styles.mobile}>
          <SearchBar />
        </Box>
      </Box>
    </>
  );
};
