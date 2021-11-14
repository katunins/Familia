import React from "react";
import globalStyles from "../styles/styles";
import {Text, View} from "react-native";
import styles from "./styles";
import DotsMenuComponent, {DotMenuElem} from "./dotsMenu";
import RelativesBlockComponent from "./relativesBlock";
import {INote, IRelative} from "../interfaces/store";
import GetDateComponent from './getDate'

interface IProps {
    note: INote
    dotsMenu?: DotMenuElem[],
    selectRelatives: IRelative[]
}

const NoteDataBlockComponent: React.FunctionComponent<IProps> = ({note, dotsMenu, selectRelatives}) => {
    const {description, date, title, relatives} = note
    return (
        <View style={globalStyles.paddingContainer}>
            <View style={styles.noteComponentDotsWrapper}>
                <Text style={globalStyles.title}>{title}</Text>
                {dotsMenu && <DotsMenuComponent menuArr={dotsMenu}/>}
            </View>
            <Text style={styles.noteComponentText}>{description}</Text>
            <Text style={styles.noteComponentDate}>{GetDateComponent(date)}</Text>
            <RelativesBlockComponent relatives={relatives} selectRelatives={selectRelatives}/>
        </View>
    )
}

export default NoteDataBlockComponent
