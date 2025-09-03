import {
  TouchableOpacity,
  Pressable,
  TextInput,
  Alert,
  Text,
  View,
} from 'react-native';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import Fontisto from '@expo/vector-icons/Fontisto';
import Entypo from '@expo/vector-icons/Entypo';
import { Fragment, useState } from 'react';
import { cx } from '@utility';
import dayjs from 'dayjs';

dayjs.extend(LocalizedFormat);

type Props = {
  shoppingItem: ShoppingListItemType;
  onEdit: (value: string) => void;
  onComplete: () => void;
  onDelete: () => void;
};

export const ShoppingListItem = ({
  shoppingItem,
  onComplete,
  onDelete,
  onEdit,
}: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');

  const isCompleted = typeof shoppingItem.completedAt === 'number';

  const handleDelete = () => {
    Alert.alert(
      `Are you sure you want to delete ${shoppingItem.name}?`,
      'Hm, Im not sure',
      [
        {
          onPress: () => {
            onDelete();
          },
          style: 'destructive',
          text: 'Yes',
        },
        {
          style: 'cancel',
          text: 'Cancel',
        },
      ],
    );
  };

  const handleStartEdit = () => {
    Alert.alert(
      `Are you sure you want to edit ${shoppingItem.name}?`,
      'Hm, Im not sure',
      [
        {
          onPress: () => {
            setIsEditing(true);
          },
          style: 'destructive',
          text: 'Yes',
        },
        {
          style: 'cancel',
          text: 'Cancel',
        },
      ],
    );
  };

  const handleFinishEdit = () => {
    onEdit(editValue);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditValue('');
  };

  const handleToggleIsCompleted = () => {
    if (isEditing) {
      return;
    }

    onComplete();
  };

  return (
    <Pressable
      className={cx('border-b border-gray-300 py-4', {
        'opacity-50 bg-gray-240 border-gray-300': isCompleted,
      })}
      onPress={handleToggleIsCompleted}
    >
      <View className="w-full flex-row items-center justify-between px-4">
        <View className="flex-row items-center gap-2">
          <Fontisto
            name={isCompleted ? 'checkbox-active' : 'checkbox-passive'}
            color="black"
            size={24}
          />
          {isEditing ? (
            <TextInput
              className="mb-1 border-b border-primary pr-4 text-xl"
              defaultValue={shoppingItem.name}
              onChangeText={setEditValue}
              placeholder="E.g. Coffee"
            />
          ) : (
            <Text
              className={cx('text-xl italic', {
                'line-through text-gray-500': isCompleted,
              })}
            >
              {shoppingItem.name}
            </Text>
          )}
        </View>

        <View className="flex-row items-center gap-4">
          {isEditing && (
            <Fragment>
              <TouchableOpacity>
                <AntDesign
                  onPress={handleCancelEdit}
                  name="closecircle"
                  color="black"
                  size={24}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <AntDesign
                  onPress={handleFinishEdit}
                  name="rightcircle"
                  color="black"
                  size={24}
                />
              </TouchableOpacity>
            </Fragment>
          )}
          {!isCompleted && !isEditing && (
            <Fragment>
              <TouchableOpacity onPress={handleStartEdit}>
                <Entypo color="black" name="edit" size={24} />
              </TouchableOpacity>

              <TouchableOpacity onPress={handleDelete} activeOpacity={0.6}>
                <FontAwesome5 color="black" name="trash" size={24} />
              </TouchableOpacity>
            </Fragment>
          )}

          {isCompleted && (
            <View className="items-end">
              {shoppingItem.completedAt !== null && (
                <Fragment>
                  <Text>
                    Completed at{' '}
                    {dayjs(shoppingItem.completedAt * 1000).format('LT')}
                  </Text>
                  <Text className="text-xs">
                    {dayjs(shoppingItem.completedAt * 1000).format('L')}
                  </Text>
                </Fragment>
              )}
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
};
