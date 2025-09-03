import { TouchableOpacity, Alert, View, Text } from 'react-native';

export default function Index() {
  const handleDelete = () => {
    Alert.alert('Are you sure you want to delete this?', 'Hm, Im not sure', [
      {
        onPress: () => console.log('<3'),
        style: 'default',
        text: 'Yes',
      },
      {
        onPress: () => console.log('x'),
        style: 'destructive',
        text: 'Cancel',
      },
    ]);
  };

  return (
    <View className="flex-1 flex-row justify-around items-center relative bg-cyan-50">
      <View className="flex-row gap-4">
        <View className="bg-blue-400 size-8 active:scale-150"></View>
        <View className="bg-orange-400 size-8 active:scale-150"></View>
        <View className="bg-murga size-8"></View>
        <View className="bg-green-400 size-8"></View>
      </View>

      <TouchableOpacity
        className="bg-black px-3 py-2 rounded-md"
        onPress={handleDelete}
        activeOpacity={0.6}
      >
        <Text className="text-white font-bold uppercase">delete</Text>
      </TouchableOpacity>
    </View>
  );
}
