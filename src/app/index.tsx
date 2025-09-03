import { ShoppingListItem } from '@components';
import { View } from 'react-native';

export default function Index() {
  return (
    <View className="flex-1">
      <View className="relative flex-1 flex-row items-center justify-around bg-cyan-50">
        <View className="flex-row gap-4">
          <View className="size-8 bg-blue-400 active:scale-150"></View>
          <View className="size-8 bg-orange-400 active:scale-150"></View>
          <View className="size-8 bg-murga"></View>
          <View className="size-8 bg-green-400"></View>
        </View>
      </View>
      <View className="flex-1 bg-cyan-50">
        <ShoppingListItem name="Amar" />
        <ShoppingListItem name="Murga" />
        <ShoppingListItem name="Friend" />
        <ShoppingListItem name="Pal" />
        <ShoppingListItem name="Fo" />
      </View>
    </View>
  );
}
