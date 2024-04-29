import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Simulating authentication logic
    if (email === 'kataikhoboko7@gmail.com' && password === '2000911Katai') {
      // Authentication successful
      console.log('Login successful');
      navigation.navigate('Dashbord');
    } else {
      // Authentication failed
      console.log('Login failed. Incorrect email or password.');
      // You can display an error message to the user
    }
  };

  const handleForgotPassword = () => {
    // Add your forgot password logic here
    console.log('Forgot password clicked');
    // Example: Navigate to a forgot password screen
  };

  const handleCreateAccount = () => {
    // Add your create account logic here
    console.log('Create new account clicked');
    // Example: Navigate to a create account screen
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Mobile number or email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.separator} />
      <TouchableOpacity style={styles.createAccountButton} onPress={handleCreateAccount}>
        <Text style={styles.buttonText}>Create new account</Text>
      </TouchableOpacity>
      <View style={styles.languageContainer}>
        <Text style={styles.languageText}>English (US)</Text>
        <Text style={styles.languageText}>Sesotho</Text>
        <Text style={styles.languageText}>More languages...</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  formContainer: {
    width: '80%',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  loginButton: {
    backgroundColor: '#1877f2',
    borderRadius: 5,
    paddingVertical: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: '#1877f2',
    textAlign: 'right',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    width: '80%',
    marginVertical: 20,
  },
  createAccountButton: {
    backgroundColor: '#42b72a',
    borderRadius: 5,
    paddingVertical: 10,
    marginVertical: 10,
  },
  languageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  languageText: {
    color: '#1877f2',
    marginHorizontal: 10,
  },
});

export default Login;
