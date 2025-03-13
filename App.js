import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { firebase_app } from './src/firebaseConfig'; 
// Import Firebase Authentication functions
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword,} from 'firebase/auth';

export default function App() {
  // Track which screen on (login or register)
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  // State hooks for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Get the Firebase Auth instance
  const auth = getAuth(firebase_app);

  // Handle user login
  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Login Successful', `Welcome, ${userCredential.user.email}!`);
    } catch (error) {
      Alert.alert('Login Failed', error.message);
    }
  };

  // Handle user registration
  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Registration Successful', `Welcome, ${userCredential.user.email}!`);
    } catch (error) {
      Alert.alert('Registration Failed', error.message);
    }
  };

  // If in register mode, show the registration screen
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
          onChangeText={(text) => setEmail(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <Button title="Register" onPress={handleSignUp} />

        <View style={{ marginTop: 10 }}>
          <Button title="Return to Login" onPress={() => setIsRegisterMode(false)} />
        </View>

        <StatusBar style="auto" />
      </View>
    );
  }

  // Otherwise, show the login screen
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Firebase Authentication</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
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

