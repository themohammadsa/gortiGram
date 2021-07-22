import {
  InputLeftElement,
  Input,
  InputGroup,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Image,
  ModalHeader,
  Box,
  Button,
  Text,
  Center,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearSearch, searchUser } from '../../features/profile/profileSlice';
import { buttonLink, errorText, imageProfile } from './styles/SearchCard';
import { Loader } from '../loader/Loader';

export const SearchBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const result = useSelector((state) => state.profile.searchUser);
  const resultStatus = useSelector((state) => state.profile.searchUserStatus);
  const [searchValue, setSearchValue] = useState('');
  const [loader, setLoader] = useState(false);

  const searchHandler = (event) => {
    if (event.key === 'Enter') {
      dispatch(searchUser({ searchValue }));
      setLoader(true);
      onOpen();
      setSearchValue('');
    }
  };

  const clearHandler = () => {
    dispatch(clearSearch());
    setSearchValue('');
  };

  useEffect(() => {
    if (resultStatus === 'fulfilled') {
      setLoader(false);
    }
  }, [resultStatus]);

  return (
    <>
      <InputGroup>
        <InputLeftElement
          children={<BiSearchAlt2 color="2b6cb0" />}
          fontSize="1.2rem"
          ml="0.2rem"
        />
        <Input
          pr={'4.5rem'}
          type="text"
          value={searchValue}
          focusBorderColor="blue.600"
          placeholder="Search for users"
          onChange={(event) => setSearchValue(event.target.value)}
          onKeyUp={searchHandler}
        />
      </InputGroup>

      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent mx="1rem" pb="2rem">
          <ModalHeader>Search Results</ModalHeader>
          <ModalCloseButton onClick={clearHandler} />
          <ModalBody>
            {loader && (
              <Center pt="2rem" pb="2rem" m="auto">
                <Loader />
              </Center>
            )}
            {!loader && result?.length === 0 && (
              <Text {...errorText}>No such user found! </Text>
            )}
            {result &&
              result.map((user, index) => {
                return (
                  <div key={index}>
                    <Box d="flex">
                      <Image {...imageProfile} src={user.profilePicture} />
                      <Button
                        {...buttonLink}
                        alignSelf="center"
                        onClick={() => {
                          navigate(`/profile/${user.username}`);
                          onClose();
                        }}
                      >
                        {user.username}
                      </Button>
                    </Box>
                  </div>
                );
              })}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
