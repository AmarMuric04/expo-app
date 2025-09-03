import { TouchableOpacity, Alert, Text, View } from 'react-native';
import { useState } from 'react';

type Props = {
  name: string;
};

export default function ShoppingListItem({ name }: Props) {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleDelete = () => {
    Alert.alert(`Are you sure you want to delete ${name}?`, 'Hm, Im not sure', [
      {
        style: 'destructive',
        onPress: () => {},
        text: 'Yes',
      },
      {
        onPress: () => {},
        style: 'cancel',
        text: 'Cancel',
      },
    ]);
  };

  return (
    <View className="border-b border-primary py-4">
      <View className="w-full flex-row items-center justify-between px-4">
        <Text className="text-xl font-medium italic">{name}</Text>

        <TouchableOpacity
          className="rounded-md bg-secondary px-3 py-2"
          onPress={handleDelete}
          activeOpacity={0.6}
        >
          <Text className="font-bold uppercase text-white">delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
