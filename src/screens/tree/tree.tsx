import React, {useState} from "react";
import {ScrollView} from "react-native";
import {useSelector} from "react-redux";
import {userSelector} from "../../store/selectors";
import {itemFromUser} from "../../helpers/tree";
import styles from "./styles";
import TreeComponent from "./treeGenerator";


const TreeScreen: React.FunctionComponent = () => {

    const user = useSelector(userSelector)
    const [scrollDirection, setScrollDirection] = useState('')

    return (
        <ScrollView
            style={{minWidth: '100%', backgroundColor: 'white'}} horizontal={true} centerContent={true}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={scrollDirection !== 'vertical'}
            onScrollBeginDrag={() => setScrollDirection('horizontal')}
        >
            <ScrollView
                centerContent={true} showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.itemWrapper}
                // scrollEnabled={scrollDirection !== 'horizontal'}
                // onScrollBeginDrag={() => setScrollDirection('vertical')}
            >
                <TreeComponent rootUser={itemFromUser(user)}/>
            </ScrollView>
        </ScrollView>
    )
}
export default TreeScreen
