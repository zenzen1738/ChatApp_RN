import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import React, { useState, useLayoutEffect, useEffect } from "react";
import { auth } from "../../firebase";

/*
onSubmitEditing Property
    - Is triggered when you click the txt input submit button (keyboard button)

useLayOutEffect Hook
    - useEffect is asychronous, it waits until the page re-renders then execute
    - useLayOutEffect is sychronous, it doesn't wait for page ren-render
    - used for navigation

*/

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back",
    });
  }, [navigation]);

  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: name,
          photoURL:
            imageUrl ||
            "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png",
        });
      })
      .catch((error) => alert(error));
  };
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Text h3 style={{ marginBottom: 50 }}>
        Create a Signal account
      </Text>

      <View style={styles.inputContainer}>
        <Input placeholder="Full Name" value={name} onChangeText={setName} />
        <Input
          type="Email"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          type="password"
          secureTextEntry
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
        />
        <Input
          placeholder="Image Url"
          value={imageUrl}
          onChangeText={setImageUrl}
          onSubmitEditing={register}
        />
      </View>
      <Button
        onPress={register}
        title="Register"
        containerStyle={styles.button}
      />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});

export default RegisterScreen;
