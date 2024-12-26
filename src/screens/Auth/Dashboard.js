import {
  PermissionsAndroid,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useState} from 'react';
import TopHeader from '../../components/TopHeader';
import Colors from '../../constants/Colors';
import {ActivityIndicator, Button, TextInput} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import ImageCropPicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';

const Dashboard = () => {
  const [state, setState] = useState({
    inputField: '',
  });
  const [imageUploading, setImageUploading] = useState(false);
  const [picUrl, setPicUrl] = useState('');
  const navigation = useNavigation();

  async function addImageToFirestore(path, mime) {
    try {
      await firestore()
        .collection('Images')
        .add({
          name: 'Jane Doe',
          age: 25,
          path: path,
          mime: mime,
        })
        .then(() => {
          ToastAndroid.show('Image added!', ToastAndroid.LONG);
        });
    } catch (error) {
      console.error('Error adding document: ', error);
      ToastAndroid.show('Failed to add image!', ToastAndroid.LONG);
    }
  }

  const uploadePhoto = async (path, mime) => {
    try {
      setImageUploading(true);
      //   const uplode = await uploadFile({
      //     filePath: {path: path},
      //     fileLocation: `public/${Date.now()}`,
      //     contentType: mime,
      //   });

      await addImageToFirestore(path, mime);
      setImageUploading(false);

      //   setPicUrl(uplode.fileURL);
      console.log('in file url');
    } catch (error) {
      setImageUploading(false);
    }
  };

  const TakePhotofromGallery = async () => {
    try {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Demo App',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
        },
      );
      const image = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });

      const croppedImage = await ImageCropPicker.openCropper({
        path: image?.uri,
        cropping: true,
      });

      uploadePhoto(croppedImage.path, croppedImage.mime);
    } catch (error) {
      console.log(error);
      ToastAndroid.show('Something went wrong', ToastAndroid.LONG);
    }
  };

  return (
    <>
      <TopHeader titile={'Dashboard'} />

      <View
        style={{
          flexGrow: 1,
          backgroundColor: Colors.backgroundColor,
        }}>
        <Text>Dashboard</Text>
        <TextInput
          label="Name"
          value={state.inputField}
          mode="outlined"
          style={{
            backgroundColor: Colors.white,
            marginHorizontal: 20,
            marginVertical: 10,
          }}
          onChangeText={text => setState({inputField: text})}
        />

        <Button
          mode="contained"
          style={{
            marginHorizontal: 20,
            marginVertical: 10,
          }}
          onPress={() => TakePhotofromGallery()}>
          Upload
        </Button>

        <Button
          mode="contained"
          style={{
            marginHorizontal: 20,
            marginVertical: 10,
          }}
          onPress={() => {
            navigation.navigate('GoogleMap');
          }}>
          Go To Google Maps
        </Button>
      </View>
    </>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});
