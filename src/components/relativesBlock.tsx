import React from "react";
import {FlatList} from "react-native";
import styles from "./styles";
import {getRelativeUri} from "../helpers/utils";
import FastImage from "react-native-fast-image";
import {IRelative} from "../interfaces/store";

interface IProps {
    relatives: string[]
    selectRelatives: IRelative[]
}

const RelativesBlockComponent: React.FunctionComponent<IProps> = ({relatives, selectRelatives}) => {
    return (
        <FlatList
            data={relatives}
            style={styles.noteComponentRelativesWrapper}
            renderItem={({item}) => {
                const uri = getRelativeUri({
                    id: item,
                    selectRelatives: selectRelatives
                })
                return uri ? (
                    <FastImage
                        // @ts-ignore
                        style={styles.noteComponentRelativesItem}
                        source={{uri}}
                    />) : null
            }}
            keyExtractor={(index) => index}
        />
    )
}

export default RelativesBlockComponent
