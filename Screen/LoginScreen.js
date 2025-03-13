import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { firebase_app } from '../src/firebaseConfig';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export default function LoginScreen({ onLoginSuccess }) {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth(firebase_app);

  // Handle user login (navigates to HomeScreen on success)
  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Login Successful', `Welcome, ${userCredential.user.email}!`, [
        { text: 'OK', onPress: onLoginSuccess },
      ]);
    } catch (error) {
      Alert.alert('Login Failed', error.message);
    }
  };

  // Handle user registration (returns to login screen on success)
  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Registration Successful', `Welcome, ${userCredential.user.email}!`, [
        // Instead of calling onLoginSuccess, we just switch back to the login screen:
        { text: 'OK', onPress: () => setIsRegisterMode(false) },
      ]);
    } catch (error) {
      Alert.alert('Registration Failed', error.message);
    }
  };

  if (isRegisterMode) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Register with Firebase</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Button title="Register" onPress={handleSignUp} />
        <View style={{ marginTop: 10 }}>
          <Button title="Return to Login" onPress={() => setIsRegisterMode(false)} />
        </View>
        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Firebase Authentication</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      <View style={{ marginTop: 10 }}>
        <Button title="Go to Register" onPress={() => setIsRegisterMode(true)} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 18,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  input: {
    width: '80%',
    height: 40,
    padding: 8,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
  },
});

