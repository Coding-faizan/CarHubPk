import { Pressable, View, Text } from "react-native";

export default function AdItem({ ad, onSelect }) {
  return (
    <Pressable onPress={onSelect}>
      <Image source={{ uri: ad.imageUri }} />
      <View>
        <Text>{ad.title}</Text>
        <Text>{ad.price}</Text>
      </View>
    </Pressable>
  );
}
