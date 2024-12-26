import {StatusBar, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../constants/Colors';
import TopHeader from '../../components/TopHeader';
import Entypo from 'react-native-vector-icons/Entypo';
import {Controller, useForm} from 'react-hook-form';
import {Button, TextInput} from 'react-native-paper';
import Sizes from '../../constants/Sizes';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

GoogleSignin.configure({
  webClientId:
    '359660646476-fbf2plrcvd77s405d0l7i3n7cp47ehu9.apps.googleusercontent.com',
});

// Somewhere in your code
async function onGoogleButtonPress() {
  // Check if your device supports Google Play
  console.log('google invoked');
  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
  // Get the users ID token
  console.log('google has', GoogleSignin.hasPlayServices());
  const signInResult = await GoogleSignin.signIn();

  firestore()
    .collection('Users')
    .add({
      name: signInResult.user.name,
      email: signInResult.user.email,
      photo: signInResult.user.photo,
    })
    .then(() => {
      console.log('User added!');
      ToastAndroid.show('User added!', ToastAndroid.LONG);
    });

  // Try the new style of google-sign in result, from v13+ of that module
  idToken = signInResult.data?.idToken;
  if (!idToken) {
    // if you are using older versions of google-signin, try old style result
    idToken = signInResult.idToken;
  }
  if (!idToken) {
    throw new Error('No ID token found');
  }

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(
    signInResult.data.idToken,
  );

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}
const Login = () => {
  const [state, setState] = useState({
    loading: false,
  });

  console.log('google', GoogleSignin.configure({}));
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const navigation = useNavigation();

  const onSubmit = data => {
    console.log(data);
    navigation.navigate('Dashboard');
  };

  return (
    <>
      {/* <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.backgroundColor}
      /> */}
      <TopHeader showBackIcon={false} titile={'Login'} />
      <View style={styles.container}>
        {/* welcome text container */}
        <View style={styles.welcomeTextContainer}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}>
            <Text style={styles.welcomeTextTittle}>Welcome to Login</Text>
            <Entypo name="hand" size={24} color={'orange'} />
          </View>
          <Text style={{color: Colors.TEXT1, fontSize: 16}}>
            Please Enter your email and password to login
          </Text>
        </View>
        {/* text input for email */}
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="please enter your email"
              label={'Email'}
              error={errors.email}
              mode="outlined"
            />
          )}
          name="email"
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'invalid email address',
            },
          }}
        />
        {/* text input for password */}
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="please enter your password"
              label={'Password'}
              error={errors.password}
              mode="outlined"
              secureTextEntry={true}
            />
          )}
          name="password"
          rules={{
            required: 'Password is required',
          }}
        />

        <GoogleSigninButton
          style={{width: 192, height: 48}}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={() => {
            setState({loading: true});
            onGoogleButtonPress()
              .then(async () => {
                console.log('Signed in with Google!');
              })
              .catch(error => {
                console.error(error);
              })
              .finally(() => {
                setState({loading: false});

                navigation.navigate('Dashboard');
              });
          }}
          disabled={false}
        />
        {/* login button */}

        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          style={{
            width: Sizes.wp('90%'),
            alignSelf: 'center',
            marginVertical: 10,
          }}>
          Login
        </Button>
      </View>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 5,

    backgroundColor: Colors.backgroundColor,
  },
  welcomeTextContainer: {},
  welcomeTextTittle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.PRIMARY,
  },
  input: {
    backgroundColor: Colors.white,
    marginVertical: 10,
    width: Sizes.wp('90%'),
    alignSelf: 'center',
  },
});
