import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Text,
  Button,
  Center,
  Divider,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../../components/loader/Loader';
import { loginUser, checkUserLoginStatus } from '../../features/auth/authSlice';
import {
  boxCard,
  errorText,
  linkButton,
  primaryButton,
  secondaryButton,
} from './styles/loginCard';

export const Login = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch();
  const { state } = useLocation();

  const loginStatus = useSelector((state) => state.auth.loginStatus);
  const errorMessage = useSelector((state) => state.auth.errorMessage);

  const guestHandler = () => {
    setEmail('guest@guest.com');
    setPassword('helloguest');
  };

  const loginValidation = () => {
    !(email.length > 4) && setError('Please check the email');
    !(password.length >= 2) && setError('Please check the password');
  };

  const clickHandler = async () => {
    setLoader(true);
    setError('');
    loginValidation();
    const checkInput = email.length > 4 && password.length >= 2;

    if (checkInput) {
      dispatch(loginUser({ email, password }));
    }
  };

  useEffect(() => {
    dispatch(checkUserLoginStatus());
    if (loginStatus === 'fulfilled') {
      setLoader(false);
      navigate(state?.from ? state.from : '/');
    } else {
      setError(errorMessage);
    }
  }, [errorMessage, loginStatus, navigate, state?.from, dispatch, toast]);

  return (
    <>
      {loader ? (
        <Center h="35rem">
          <Loader />
        </Center>
      ) : (
        <Box {...boxCard}>
          <Box width="100%" m="auto">
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
                placeholder="More than 6 characters"
                value={password}
                isRequired
                onChange={(event) => setPassword(event.target.value)}
              />
            </FormControl>

            {error && <Text {...errorText}>{error}</Text>}

            <Button {...primaryButton} onClick={clickHandler}>
              Log In
            </Button>

            <Box d="flex" alignItems="center">
              <Divider />
              <Text textAlign="center" ml="2" mr="2">
                or
              </Text>
              <Divider />
            </Box>

            <Button {...secondaryButton} onClick={() => navigate('/signup')}>
              Sign Up
            </Button>

            <Text mt="2">
              feel free to
              <Button {...linkButton} onClick={guestHandler}>
                Login as a guest!
              </Button>
            </Text>
          </Box>
        </Box>
      )}
    </>
  );
};
