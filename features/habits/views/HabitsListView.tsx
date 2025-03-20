import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
// import firestore from '@react-native-firebase/firestore';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { Header } from '@/components';

import { HabitFormModal } from '../components';
import { CreateHabitRequestDto, Habit } from '../types';

const HabitsListView = () => {
  const [habitForAction, setHabitForAction] = useState<Partial<Habit> | null>(
    null
  );

  const handleHabitAction = (habit: Habit | CreateHabitRequestDto) => {
    console.log(habit, '--create habit');
  };

  // const addDocument = () => {
  //   firestore()
  //     .collection('Posts')
  //     .add({
  //       title: 'Best post ever',
  //       content: 'Post about something lorem ipsum and etc',
  //     })
  //     .then((res) => {
  //       console.log(res, 'document was created');
  //       debugger;
  //     })
  //     .catch((err) => {
  //       console.log(err, 'document created error');
  //       debugger;
  //     });
  // };

  return (
    <View>
      <Header
        title="Habits"
        enableGoBack={false}
        renderRightBlock={
          <TouchableOpacity hitSlop={12} onPress={() => setHabitForAction({})}>
            <MaterialIcons name="add" size={24} color="black" />
          </TouchableOpacity>
        }
      />

      {/* <Button onPress={addDocument}>Create some data in firestore</Button> */}

      <HabitFormModal
        habit={habitForAction}
        onClose={() => setHabitForAction(null)}
        onSave={handleHabitAction}
      />
    </View>
  );
};

export default HabitsListView;
