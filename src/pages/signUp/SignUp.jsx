import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Text,
  Button,
  useToast,
} from '@chakra-ui/react';
import {
  boxCard,
  errorText,
  linkButton,
  primaryButton,
} from './styles/signUpCard';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../features/auth/authSlice';

export const SignUp = () => {
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loader, setLoader] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const createUserStatus = useSelector((state) => state.auth.createUserStatus);
  const errorMessage = useSelector((state) => state.auth.errorMessage);

  const signUpValidation = () => {
    !(name.length > 2) && setError('Please check the name');
    !(username.length > 4) && setError('Please check the username');
    !(email.length > 4) && setError('Please check the email');
    !(password.length >= 2) && setError('Please check the password');
  };

  const clickHandler = async () => {
    setError('');
    signUpValidation();

    const checkInput =
      name.length > 2 &&
      email.length > 4 &&
      password.length >= 2 &&
      username.length > 4;

    if (checkInput) {
      dispatch(createUser({ name, email, password, username }));
      setLoader(true);
    }
  };

  useEffect(() => {
    if (createUserStatus === 'fulfilled') {
      toast({
        title: `SignUp Succesful!`,
        status: 'success',
        isClosable: true,
      });
      setLoader(false);
      navigate('/login');
    } else if (createUserStatus === 'error') {
      setError(errorMessage);
      setLoader(false);
    }
  }, [errorMessage, createUserStatus, navigate, toast]);

  return (
    <>
      <Box {...boxCard}>
        <Box width="100%" m="auto">
          <FormControl id="name" mb="5">
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              isRequired
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </FormControl>

          <FormControl id="username" mb="5">
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </FormControl>

          <FormControl id="email" mb="5">
            <FormLabel>Email Address</FormLabel>
            <Input
              type="email"
              value={email}
              isRequired
              onChange={(event) => setEmail(event.target.value)}
            />
          </FormControl>

          <FormControl id="password" mb="5">
            <FormLabel>Password </FormLabel>
            <Input
              type="password"
              value={password}
              placeholder="More than 6 characters"
              isRequired
              onChange={(event) => setPassword(event.target.value)}
            />
          </FormControl>

          {error && <Text {...errorText}>{error}</Text>}

          <Button
            {...primaryButton}
            onClick={clickHandler}
            isLoading={loader ? true : false}
          >
            Create Account
          </Button>

          <Text>
            Already have an account?
            <Button {...linkButton} onClick={() => navigate('/login')}>
              Log in
            </Button>
          </Text>
        </Box>
      </Box>
    </>
  );
};
