import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { db } from "../../firebase";

export default function CustomListItem({ id, chatName, enterChat }) {
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timesstamp", "asc")
      .onSnapshot((snapShot) =>
        setChatMessages(snapShot.docs.map((doc) => doc.data()))
      );

    return unsubscribe;
  }, []);

  return (
    <ListItem key={id} bottomDivider onPress={() => enterChat(id, chatName)}>
      <Avatar
        rounded
        source={{
          uri:
            chatMessages?.[0]?.photoURL ||
            "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png",
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {chatName}
        </ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
}

const styles = StyleSheet.create({});
