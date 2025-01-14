import Search from "@/app/components/Search";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { useUser } from "@/contexts/userContext";
import { Link } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const user = useUser();
  return (
    <SafeAreaView className="h-full bg-white">
      <View className="px-5">
        <View className="flex flex-row w-full justify-between items-center mt-5">
          <View className="flex flex-row gap-4">
            <Image source={{ uri: user.current?.avatar }} className="rounded-full size-12"/>
            <View className="flex flex-col justify-between">
              <Text className="font-rubik text-sm text-black-200">Good Morning</Text>
              <Text className="font-rubik-bold text-lg">{user.current?.name}</Text>
            </View>
          </View>
          <Image source={icons.bell} className="size-6"/>
        </View>

        <Search />
      </View>
    </SafeAreaView>
  );
}
