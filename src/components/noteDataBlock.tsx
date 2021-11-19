import React from "react";
import globalStyles from "../styles/styles";
import {Text, View} from "react-native";
import styles from "./styles";
import DotsMenuComponent, {DotMenuElem} from "./dotsMenu";
import {INote, IRelative} from "../interfaces/store";
import RelativesBlockComponent from "./relativesBlock";
import {stringDateParse} from "../helpers/utils";

interface IProps {
    note: INote
    dotsMenu?: DotMenuElem[],
    selectRelatives: IRelative[],
    mini?: boolean
}

const NoteDataBlockComponent: React.FunctionComponent<IProps> = ({note, dotsMenu, selectRelatives, mini}) => {
    const {description, date, title, relatives} = note
    return (
        <View style={globalStyles.paddingContainer}>
            <View style={styles.noteComponentDotsWrapper}>
                <Text style={globalStyles.title}>{title}</Text>
                {dotsMenu && !mini && <DotsMenuComponent menuArr={dotsMenu}/>}
            </View>
            {!mini && description !=="" && <Text style={styles.noteComponentText}>{description}</Text>}
            {date !== '' && <Text style={styles.noteDate}>{stringDateParse(date)}</Text>}
            {!mini && <RelativesBlockComponent relatives={relatives} selectRelatives={selectRelatives}/>}
        </View>
    )
}

export default NoteDataBlockComponent
