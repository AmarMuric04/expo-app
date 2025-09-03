import { TouchableOpacity, Alert, Text, View } from 'react-native';

type Props = {
  name: string;
};

export default function ShoppingListItem({ name }: Props) {
  const handleDelete = () => {
    Alert.alert(`Are you sure you want to delete ${name}?`, 'Hm, Im not sure', [
      {
        onPress: () => {},
        style: 'default',
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
    <View className="border-b border-murga py-2">
      <View className="w-full flex-row items-center justify-between px-4">
        <Text>{name}</Text>

        <TouchableOpacity
          className="rounded-md bg-murga px-3 py-2"
          onPress={handleDelete}
          activeOpacity={0.6}
        >
          <Text className="font-bold uppercase text-white">delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
