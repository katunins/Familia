import React, {useEffect, useState} from 'react';
import styles from './styles';
import {Pressable, Text, View} from 'react-native';
import RelativeElement from './relativeElement';
import globalStyles from '../styles/styles';
import {IRelative} from '../interfaces/store';
import {NavigationParams, NavigationProp, NavigationScreenProp} from 'react-navigation';
import {InitialRelativeObj} from "../helpers/utils";

interface IProps {
    relativesArr: IRelative[];
    editMode: boolean;
    navigation: NavigationScreenProp<any>;
}

const RelativeListComponent: React.FunctionComponent<IProps> =
    ({
         relativesArr,
         editMode,
         navigation,
     }) => {
        const addNewRelative = () => {
            navigation.navigate('relativeStack', {
                screen: 'RelativeFormScreen',
                params: {
                    relativeData: InitialRelativeObj,
                    navigationScreenBack: 'UserScreen'
                }
            })
        }

        return (
            <View style={[globalStyles.marginLine, styles.relativeContainer]}>
                {/*<Text style={styles.editDescription}>Ближайшие родственники</Text>*/}
                {relativesArr.map((item, index) => (
                    <RelativeElement
                        key={index}
                        id={item.id}
                        name={item.name}
                        // @ts-ignore
                        type={item.type}
                        editMode={editMode}
                        userPic={item.userPic}
                    />
                ))}

                <Pressable onPress={addNewRelative} style={[styles.plusButtonWrapper]}>
                    <Text style={styles.plus}>+</Text>
                    <Text style={styles.textUnderPlus}>
                        Добавьте родственников
                    </Text>
                </Pressable>
                {/*)}*/}
            </View>
        );
    };

export default RelativeListComponent;
