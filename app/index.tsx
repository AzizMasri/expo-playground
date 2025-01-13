import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-2xl text-primary-300 font-rubik-extrabold">Welcome to the app</Text>
      <Link href="/signin">Signin</Link>
      <Link href="/explore">Explore</Link>
      <Link href="/profile">Profile</Link>
      <Link href="/properties/1">Meeting Rooms</Link>
    </View>
  );
}
