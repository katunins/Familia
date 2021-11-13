import {INote, IRelative} from "../interfaces/store";
import {Text, View} from "react-native";
import styles from "./styles";
import React from "react";
import ImageAndCountComponent from "./imageAndCount";
import globalStyles from "../styles/styles";
import DotsMenuComponent, {DotMenuElem} from "./dotsMenu";
import RelativesBlockComponent from "./relativesBlock";

interface IProps {
    item: INote,
    index: number
    selectRelatives: IRelative[]
    dotsMenu: DotMenuElem[]
}


const NoteComponent: React.FunctionComponent<IProps> =
    ({item, index, selectRelatives, dotsMenu}) => {
        const {description, images, title, relatives} = item
        return (
            <>
                {images.length > 0 && <ImageAndCountComponent uriArr={images}/>}
                <View style={globalStyles.paddingContainer}>
                    <View style={styles.noteComponentDotsWrapper}>
                        <Text style={globalStyles.title}>{title}</Text>
                        <DotsMenuComponent menuArr={dotsMenu}/>

                    </View>
                    <Text style={styles.noteComponentText}>{description}</Text>
                    <RelativesBlockComponent relatives={relatives} selectRelatives={selectRelatives} />
                </View>
            </>
        );
    }

export default NoteComponent
