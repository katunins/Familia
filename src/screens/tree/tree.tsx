import React from "react";
import {ScrollView, View} from "react-native";
import styles from "./styles";
import {IItemTree} from "./item";
import LineBlockComponent from "./lineBlock";
import globalStyles from "../../styles/styles";

interface IProps {
    parents: IItemTree[][]
    roots: IItemTree[],
    children: IItemTree[]
}

const TreeScreen: React.FunctionComponent = () => {
    const items: IProps = {
        parents: [],
        roots: [
            {
                uri: 'uploads/617ab0ccd34665ca9cce580f/IMG_3709__1637494506219.PNG',
                name: 'Павел Катунин'
            },
            {
                uri: 'uploads/617ab0ccd34665ca9cce580f/IMG_2387__1636353122027.JPG',
                name: 'Ирина Катунина'
            }
        ],
        children: []
    }
    const scale = 1
    return (
        <ScrollView horizontal={true} contentContainerStyle={[styles.horizontalContainer, { flex: 1}]}>
            <ScrollView>
                {/*Дедушки и Бабушки*/}
                {items.parents.map((item, index) => <View style={globalStyles.row}>
                        <LineBlockComponent
                            items={item} scale={scale}
                            bottomHorizontalLine={item.length > 1}
                            bottomVerticalLine={item.length > 0}/>

                    </View>
                )}

                {/*Пользователь и супруга*/}
                <LineBlockComponent
                    items={items.roots} scale={scale}
                    topVerticalLine={true}
                    // bottomVerticalLine={items.roots.length > 1}
                    bottomHorizontalLine={items.roots.length>1}
                />
                {/*<LineBlockComponent items={items.children} scale={scale}/>*/}
            </ScrollView>
        </ScrollView>
    )
}

export default TreeScreen
