import {
  TouchableOpacity,
  TextInput,
  FlatList,
  View,
  Text,
} from 'react-native';
import { ShoppingListItem } from '@components/molecules';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState, useMemo } from 'react';
import dayjs from 'dayjs';

const initialList: ShoppingListItemType[] = [
  {
    completedAt: null,
    updatedAt: null,
    name: 'Tea',
    id: '0',
  },
  {
    completedAt: null,
    updatedAt: null,
    name: 'Coffee',
    id: '1',
  },
  {
    completedAt: null,
    updatedAt: null,
    name: 'Milk',
    id: '2',
  },
  {
    completedAt: null,
    updatedAt: null,
    name: 'Milk',
    id: '3',
  },
  {
    completedAt: null,
    updatedAt: null,
    name: 'Milk',
    id: '4',
  },
  {
    completedAt: null,
    updatedAt: null,
    name: 'Milk',
    id: '5',
  },
  {
    completedAt: null,
    updatedAt: null,
    name: 'Milk',
    id: '6',
  },
  {
    completedAt: null,
    updatedAt: null,
    name: 'Milk',
    id: '7',
  },
  {
    completedAt: null,
    updatedAt: null,
    name: 'Milk',
    id: '8',
  },
  {
    completedAt: null,
    updatedAt: null,
    name: 'Milk',
    id: '9',
  },
  {
    completedAt: null,
    updatedAt: null,
    name: 'Milk',
    id: '10',
  },
  {
    completedAt: null,
    updatedAt: null,
    name: 'Milk',
    id: '11',
  },
  {
    completedAt: null,
    updatedAt: null,
    name: 'Milk',
    id: '12',
  },
  {
    completedAt: null,
    updatedAt: null,
    name: 'Milk',
    id: '13',
  },
];

export default function HomeScreen() {
  const [shoppingList, setShoppingList] =
    useState<ShoppingListItemType[]>(initialList);

  const [searchValue, setSearchValue] = useState('');
  const [appliedSearchValue, setAppliedSearchValue] = useState('');

  const [isSearching, setIsSearching] = useState(false);

  const filteredShoppingList = useMemo(() => {
    if (appliedSearchValue === '' || !isSearching) {
      return shoppingList;
    }
    return shoppingList.filter(item =>
      item.name.toLowerCase().includes(appliedSearchValue.toLowerCase()),
    );
  }, [shoppingList, appliedSearchValue, isSearching]);

  const handleComplete = (id: string) => {
    setShoppingList(prev => {
      const completedItem = prev.findIndex(
        prevShoppingItem => prevShoppingItem.id === id,
      );

      const newPrev = [...prev];
      newPrev[completedItem] = {
        ...prev[completedItem],
        completedAt: dayjs().unix(),
        updatedAt: dayjs().unix(),
      };

      return newPrev;
    });
  };

  const handleIncomplete = (id: string) => {
    setShoppingList(prev => {
      const completedItem = prev.findIndex(
        prevShoppingItem => prevShoppingItem.id === id,
      );

      const newPrev = [...prev];
      newPrev[completedItem] = {
        ...prev[completedItem],
        updatedAt: dayjs().unix(),
        completedAt: null,
      };

      return newPrev;
    });
  };

  const handleDelete = (id: string) => {
    setShoppingList(prev =>
      prev.filter(prevShoppingItem => prevShoppingItem.id !== id),
    );
  };

  const handleSearch = () => {
    setAppliedSearchValue(searchValue);
  };

  const handleEdit = ({ value, id }: { value: string; id: string }) => {
    setShoppingList(prev => {
      const completedItemIndex = prev.findIndex(
        prevShoppingItem => prevShoppingItem.id === id,
      );

      const newPrev = [...prev];
      newPrev[completedItemIndex] = {
        ...prev[completedItemIndex],
        name: value,
      };

      return newPrev;
    });
  };

  return (
    <View className="flex-1 bg-primary/50">
      <View className="relative">
        <TextInput
          className="m-3 rounded-full border border-primary/50 bg-white p-4"
          onSubmitEditing={handleSearch}
          onChangeText={setSearchValue}
          placeholder="E.g. Coffee"
          returnKeyType="done"
          value={searchValue}
        />
        <TouchableOpacity
          onPress={() => {
            setIsSearching(true);
            handleSearch();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-primary p-3"
        >
          <FontAwesome
            activeOpacity={0.6}
            name="search"
            color="white"
            className=""
            size={18}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        renderItem={({ item }) => (
          <ShoppingListItem
            onEdit={(value: string) => {
              handleEdit({ id: item.id, value });
            }}
            onIncomplete={() => {
              handleIncomplete(item.id);
            }}
            onComplete={() => {
              handleComplete(item.id);
            }}
            onDelete={() => {
              handleDelete(item.id);
            }}
            shoppingItem={item}
          />
        )}
        data={filteredShoppingList.sort((a, b) => {
          if (a.completedAt && b.completedAt) {
            return a.completedAt - b.completedAt;
          }

          if (a.completedAt && !b.completedAt) {
            return 1;
          }

          if (!a.completedAt && b.completedAt) {
            return -1;
          }

          return 0;
        })}
        ListEmptyComponent={
          <View className="flex-1 items-center text-center">
            <Text>No items match these filters.</Text>
          </View>
        }
        contentContainerClassName="mb-1"
        className="flex-1"
      />
    </View>
  );
}
