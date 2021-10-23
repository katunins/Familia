import React, { useState } from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from "../interfaces/navigation";
import PostsListScreen from "../screens/posts/postsListScreen";
import PostEditScreen from "../screens/posts/postEditScreen";
import SearchLineComponent from '../components/searchLine';

const Stack = createStackNavigator<RootStackParamList>();

const PostsListStack = () => {

    const [searchText, setSearchText] = useState('')
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          // title: 'Ваши записи',
            headerTitle:(props)=><SearchLineComponent setSearchText={setSearchText} searchText={searchText}/>
        }}
        name="PostsListScreen"
        // component={PostsListScreen}
      >
          {(props)=><PostsListScreen {...props} searchText={searchText}/>}
      </Stack.Screen>
        <Stack.Screen
            options={{
                title: 'Редактирование записи',
            }}
            name="PostEditScreen"
            component={PostEditScreen}
        />
    </Stack.Navigator>
  );
};

export default PostsListStack;
