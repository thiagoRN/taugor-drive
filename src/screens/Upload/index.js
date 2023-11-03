import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
  PermissionsAndroid,
  Image,
} from 'react-native';
import RNFS from 'react-native-fs';
import {FlatList} from 'react-native-gesture-handler';

function UploadScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [fileName, setFileName] = useState('');
  const [currentPath, setCurrentPath] = useState(RNFS.DocumentDirectoryPath);
  const [folders, setFolders] = useState([]);

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Permissão de armazenamento de aplicativos',
          message:
            'O aplicativo precisa de acesso ao seu armazenamento' +
            'para que você possa criar pastas.',
          buttonNeutral: 'Pergunte-me depois',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Você pode usar armazenamento');
        getAllFolders(currentPath);
      } else {
        console.log('Permissão da câmera negada');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    requestStoragePermission();
  }, []);

  const getAllFolders = path => {
    RNFS.readDir(path) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
      .then(result => {
        console.log('GOT RESULT', result);
        setFolders(result);
      })
      .catch(err => {
        console.log(err.message, err.code);
      });
  };

  const isFolder = name => {
    let itsFolder = name.includes('.');
    return itsFolder;
  };

  const createFolder = () => {
    RNFS.mkdir(currentPath + '/' + folderName)
      .then(res => {
        getAllFolders(currentPath);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const createFile = () => {
    RNFS.writeFile(currentPath + '/' + fileName + '.txt', 'ola como está voce')
      .then(res => {
        getAllFolders(currentPath);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const deleteDir = path => {
    RNFS.unlink(path)
      .then(res => {
        getAllFolders(currentPath);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#e0d8d5',}}>
      <View style={{width: '100%', flexDirection: 'row', margin: 20}}>
        {currentPath == RNFS.DocumentDirectoryPath ? null : (
          <Text
            style={{fontWeight: '700'}}
            onPress={() => {
              setCurrentPath(RNFS.DocumentDirectoryPath);
              getAllFolders(RNFS.DocumentDirectoryPath);
            }}>
            Back
          </Text>
        )}
        <Text style={{marginLeft: 20}}>{currentPath}</Text>
      </View>
      <View style={{marginTop: 50}}>
        <FlatList
          data={folders}
          numColumns={2}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={{
                  width: '50%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 100,
                }}
                onPress={() => {
                  if (!isFolder(item.name)) {
                    setCurrentPath(currentPath + '/' + item.name);
                    getAllFolders(currentPath + '/' + item.name);
                  }
                }}
                onLongPress={() => deleteDir(item.path)}>
                {isFolder(item.name) ? (
                  <View
                    style={{
                      width: '50%',
                      height: '50%',
                      backgroundColor: '#c9c9c9',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                    }}>
                    <Text>file</Text>
                  </View>
                ) : (
                  <Image
                    source={require('../../assets/open-folder.png')}
                    style={{width: 50, height: 50}}
                  />
                )}
                <Text>
                  {item.name.length > 20
                    ? item.name.substring(0, 10) + '....'
                    : item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 20,
          bottom: 50,
          backgroundColor: '#000',
          width: 50,
          heigth: 50,
          borderRadius: 25,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          setModalVisible(true);
        }}>
        <Text style={{color: '#fff', fontSize: 30}}>+</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 20,
          bottom: 130,
          backgroundColor: '#000',
          width: 50,
          heigth: 50,
          borderRadius: 25,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          setModalVisible2(true);
        }}>
        <Text style={{color: '#fff', fontSize: 30}}>cf</Text>
      </TouchableOpacity>

      <Modal
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              width: '90%',
              height: 200,
              borderRadius: 10,
            }}>
            <TextInput
              placeholder="digite o nome da pasta"
              value={folderName}
              onChangeText={txt => setFolderName(txt)}
              style={{
                width: '90%',
                height: 50,
                borderWidth: 1,
                alignSelf: 'center',
                marginTop: 50,
                paddingLeft: 20,
                borderRadius: 10,
              }}
            />
            <TouchableOpacity
              style={{
                marginTop: 20,
                alignSelf: 'center',
                width: '90%',
                height: 50,
                borderRadius: 10,
                backgroundColor: '#000',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                setModalVisible(false);
                createFolder();
              }}>
              <Text style={{color: '#fff', fontSize: 20}}>Criar pasta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        transparent
        visible={modalVisible2}
        onRequestClose={() => {
          setModalVisible2(false);
        }}>
        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              width: '90%',
              height: 200,
              borderRadius: 10,
            }}>
            <TextInput
              placeholder="digite o nome do arquivo"
              value={fileName}
              onChangeText={txt => setFileName(txt)}
              style={{
                width: '90%',
                height: 50,
                borderWidth: 1,
                alignSelf: 'center',
                marginTop: 50,
                paddingLeft: 20,
                borderRadius: 10,
              }}
            />
            <TouchableOpacity
              style={{
                marginTop: 20,
                alignSelf: 'center',
                width: '90%',
                height: 50,
                borderRadius: 10,
                backgroundColor: '#000',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                setModalVisible2(false);
                createFile();
              }}>
              <Text style={{color: '#fff', fontSize: 20}}>Criar arquivo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default UploadScreen;
