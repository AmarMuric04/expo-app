import { TouchableOpacity, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { cx } from '@utility';

export default function IdeaScreen() {
  const router = useRouter();

  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center bg-cyan-50">
        <View className="flex-row gap-4">
          <View className="size-8 bg-blue-400 active:scale-150" />
          <View className="size-8 bg-orange-400 active:scale-150" />
          <View className="size-8 bg-purple-400 active:scale-150" />
          <View className="size-8 bg-green-400 active:scale-150" />
        </View>
        <View className="flex-row gap-4">
          <Letter color="blue" letter="A" />
          <Letter color="orange" letter="M" />
          <Letter color="purple" letter="A" />
          <Letter color="green" letter="R" />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          router.navigate('/');
        }}
      >
        <Text>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

function Letter({
  letter,
  color,
}: {
  color: 'orange' | 'purple' | 'green' | 'blue';
  letter: string;
}) {
  return (
    <Text
      className={cx('size-8 text-center font-bold', {
        'text-purple-400': color === 'purple',
        'text-orange-400': color === 'orange',
        'text-green-400': color === 'green',
        'text-blue-400': color === 'blue',
      })}
    >
      {letter}
    </Text>
  );
}
