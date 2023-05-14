import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Modal,
  ActivityIndicator,
} from 'react-native';
import firestore, {firebase} from '@react-native-firebase/firestore';
import Input from './Common/Input';
const SignupTask = ({navigation}) => {
  const [email, SetEmail] = useState();
  const [pass, SetPass] = useState();
  const [number, SetNumber] = useState();
  const [username, SetUsername] = useState();
  const [repass, SetRepass] = useState();
  const [txtemail, SetTxtEmail] = useState();
  const [txtpass, SetTxtPass] = useState();
  const [greaterpass, SetGreaterpass] = useState();
  const [txtnumber, SetTxtNumber] = useState();
  const [txtusername, SetTxtUsername] = useState();
  const [txtrepass, SetTxtRepass] = useState();
  const [emailrgx, SetEmailrgx] = useState();
  const [matchpass, SetMatchPass] = useState();
  const [task, setTask] = useState();
  const [company, setCompany] = useState();
  const [users, setUsers] = useState();
  const [selected, setSelected] = useState();
  const [modelvisible, setModelvisible] = useState(null);
  const {width, height} = Dimensions.get('window');
  const logup = async () => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
      if (!email) {
        SetTxtEmail(true);
        SetEmailrgx(false);
        return;
      } else {
        SetTxtEmail(false);
      }
      SetEmailrgx(true);
      return;
    } else {
      SetEmailrgx(false);
    }

    if (!email) {
      SetTxtEmail(true);
      return;
    } else {
      SetTxtEmail(false);
    }

    if (!username) {
      SetTxtUsername(true);
      return;
    } else {
      SetTxtUsername(false);
    }

    if (!number) {
      SetTxtNumber(true);
      return;
    } else {
      SetTxtNumber(false);
    }

    if (!(number > 5)) {
      SetGreaterpass(true);
    } else {
      SetGreaterpass(false);
    }

    if (!pass) {
      SetTxtPass(true);
      return;
    } else {
      SetTxtPass(false);
    }
    if (!repass) {
      SetTxtRepass(true);
      return;
    } else {
      SetTxtRepass(false);
    }

    if (pass !== repass) {
      SetMatchPass(true);
      return;
    } else {
      SetMatchPass(false);
    }
    if (company !== true) {
      setSelected(true);
    } else {
      if (users == true) {
        setSelected(false);
      }
    }
    if (users !== true) {
      setSelected(true);
    } else {
      if (company == true) {
        setSelected(false);
      }
    }
    if (company == true) {
      const Merchand = await firestore()
        .collection('Unverified')
        .where('email', '==', email)
        .get();

      if (!Merchand.empty) {
        setTask(true);
        return;
      }

      firestore().collection('Unverified').add({
        email: email,
        pass: pass,
        repass: repass,
        number: number,
        username: username,
      });
      setModelvisible(true);
      setTimeout(() => {
        setModelvisible(false);
        navigation.goBack();
        alert('Successfuly login');
      }, 5000);
    } else {
      const Users = await firestore()
        .collection('Users')
        .where('email', '==', email)
        .get();

      if (!Users.empty) {
        setTask(true);
        return;
      }
      if (users == true) {
        firestore().collection('Users').add({
          email: email,
          pass: pass,
          repass: repass,
          number: number,
          username: username,
        });
        setSelected(false);
        setModelvisible(true);
        setTimeout(() => {
          setModelvisible(false);
          navigation.goBack();

          alert('Successfuly login');
        }, 5000);
      }
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={styles.containerstyle}>
      <View style={styles.container}>
        <Image
          source={{
            uri: 'https://play-lh.googleusercontent.com/vBQEUKhetnbbHC3_RxYZyM8-qKK7y-buAW-49HAj-zfU2jWD-UDvYvfk9CGwRy25dw',
          }}
          style={{
            height: 80,
            width: 80,
            borderRadius: 50,
            bottom: 20,
            marginTop: 50,
          }}
        />
        <View>
          <Text style={styles.txt}>SIGNUP</Text>
        </View>
      </View>
      {task ? (
        <View style={{justifyContent: 'center'}}>
          <Text style={{color: 'red'}}>
            YOU HAVE ALREADY SIGNUP SO TRY ANOTHER EMAIL
          </Text>
        </View>
      ) : null}
      <Input plceholder={'ENTER EMAIL'} onchangeText={SetEmail} Value={email} />
      {txtemail ? (
        <View style={{}}>
          <Text style={{color: 'red'}}>enter email</Text>
        </View>
      ) : null}
      {emailrgx ? (
        <>
          <Text style={{color: 'red'}}>enter valid email</Text>
        </>
      ) : null}
      <Input
        plceholder={'ENTER USERNAME'}
        onchangeText={SetUsername}
        Value={username}
      />
      {txtusername ? (
        <>
          <Text style={{color: 'red'}}>ENTER USERNAME</Text>
        </>
      ) : null}
      <Input
        plceholder={'PHONE NO'}
        onchangeText={SetNumber}
        Value={number}
        type={'numeric'}
      />
      {greaterpass ? (
        <>
          <Text style={{color: 'red'}}>PHONE NO SHOULD BE GREATER 5</Text>
        </>
      ) : null}
      {txtnumber ? (
        <>
          <Text style={{color: 'red'}}>PHONE NO</Text>
        </>
      ) : null}
      <Input
        plceholder={'ENTER PASSWORD'}
        numaric={true}
        onchangeText={SetPass}
        Value={pass}
      />
      {txtpass ? (
        <>
          <Text style={{color: 'red'}}>ENTER PASSWORD</Text>
        </>
      ) : null}
      <Input
        plceholder={'ENTER SAME PASSWORD'}
        numaric={true}
        onchangeText={SetRepass}
        Value={repass}
      />
      {txtrepass ? (
        <>
          <Text style={{color: 'red'}}>ENTER SAME PASSWORD</Text>
        </>
      ) : null}
      {matchpass ? (
        <>
          <Text style={{color: 'red'}}>PASSWORD NOT SAME</Text>
        </>
      ) : null}
      <View style={{marginTop: 10, flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => {
            setUsers(false);
            setCompany(true);
          }}
          style={{
            height: 20,
            width: 20,
            backgroundColor: company == true ? 'black' : '#FFF',
            borderRadius: 50,
            right: 10,
            top: 2,
            borderWidth: 2,
            borderColor: company == true ? '#FFF' : 'black',
          }}></TouchableOpacity>
        <View>
          <Text style={{fontSize: 17, color: 'black'}}>Signup as Company</Text>
        </View>
      </View>
      <View style={{marginTop: 10, flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => {
            setUsers(true);
            setCompany(false);
          }}
          style={{
            height: 20,
            width: 20,
            backgroundColor: users == true ? 'black' : '#FFF',
            borderRadius: 50,
            right: 10,
            top: 2,
            borderWidth: 2,
            borderColor: users == true ? '#FFF' : 'black',
          }}></TouchableOpacity>
        <View>
          <Text style={{fontSize: 17, color: 'black'}}>Signup as User</Text>
        </View>
      </View>
      {selected ? (
        <>
          <Text style={{color: 'red', top: 5, fontWeight: 'bold'}}>
            Select Any one options
          </Text>
        </>
      ) : null}

      <TouchableOpacity style={styles.button} onPress={logup}>
        <Text style={styles.txt}>SIGNUP</Text>
      </TouchableOpacity>
      {/* {/* <Text style={styles.txt}>or</Text> */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{height: 50}}>
        <Text style={styles.txt1}>GO_BACK</Text>
      </TouchableOpacity>

      <Modal visible={modelvisible} transparent>
        <View style={styles.modelmain}>
          <View style={styles.Modelcontain}>
            <ActivityIndicator animating size={'large'} color="navy" />
            <Text style={styles.Andicator}>Wait..</Text>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerstyle: {
    flex: 1,
    height: '100%',
    borderWidth: 20,
    borderStyle: 'dotted',
  },
  button: {
    height: '8%',
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#FFF',
    borderRadius: 20,
    elevation: 10,
    alignSelf: 'center',
    bottom: 30,
  },
  txt: {
    fontSize: 20,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center',
  },
  txt1: {
    fontSize: 18,
    textDecorationLine: 'underline',
    color: 'black',
    alignSelf: 'center',
  },

  container: {alignItems: 'center', justifyContent: 'center'},
  modelmain: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  Modelcontain: {
    height: 200,
    width: 250,
    backgroundColor: 'white',
    elevation: 100,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Andicator: {color: 'navy', fontSize: 16, marginTop: 10},
});
export default SignupTask;
