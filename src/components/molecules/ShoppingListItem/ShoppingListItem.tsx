import {
  TouchableOpacity,
  Pressable,
  TextInput,
  Alert,
  Text,
  View,
} from 'react-native';
import { useEffect, Fragment, useState, useRef } from 'react';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import Fontisto from '@expo/vector-icons/Fontisto';
import Entypo from '@expo/vector-icons/Entypo';
import { cx } from '@utility';
import dayjs from 'dayjs';

dayjs.extend(LocalizedFormat);

type Props = {
  shoppingItem: ShoppingListItemType;
  onEdit: (value: string) => void;
  onIncomplete: () => void;
  onComplete: () => void;
  onDelete: () => void;
};

export const ShoppingListItem = ({
  shoppingItem,
  onIncomplete,
  onComplete,
  onDelete,
  onEdit,
}: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');

  const inputRef = useRef<TextInput | null>(null);

  const isCompleted = typeof shoppingItem.completedAt === 'number';

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

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
    if (editValue === '') {
      return;
    }

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

    if (shoppingItem.completedAt) {
      onIncomplete();
    }

    if (!shoppingItem.completedAt) {
      onComplete();
    }
  };

  return (
    <Pressable
      className={cx('border-b border-primary/50 h-16 justify-center flex-1', {
        'opacity-50 bg-gray-240': isCompleted,
      })}
      onPress={handleToggleIsCompleted}
    >
      <View className="flex-row items-center justify-between px-4">
        <View className="flex-1 flex-row items-center gap-2">
          <Fontisto
            name={isCompleted ? 'checkbox-active' : 'checkbox-passive'}
            color="black"
            size={24}
          />
          {isEditing && (
            <TextInput
              className="mb-1.5 flex-1 border-b pr-4 text-xl mr-8"
              defaultValue={shoppingItem.name}
              onChangeText={setEditValue}
              placeholder="E.g. Coffee"
              ref={inputRef}
            />
          )}

          {!isEditing && (
            <Text
              className={cx('text-xl flex-1', {
                'line-through text-black/70': isCompleted,
              })}
              numberOfLines={1}
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
