import {INote, IRelative} from "../interfaces/store";
import React from "react";
import ImageAndCountComponent from "./imageAndCount";
import {DotMenuElem} from "./dotsMenu";
import {INavigation} from "../interfaces/navigation";
import NoteDataBlockComponent from "./noteDataBlock";

interface IProps extends INavigation {
    item: INote,
    index: number
    selectRelatives: IRelative[]
    dotsMenu: DotMenuElem[],
}


const NoteComponent: React.FunctionComponent<IProps> =
    ({item, index, selectRelatives, dotsMenu, navigation}) => {
        const {description, images, title, relatives} = item
        const openDetail = images.length > 1 ? () => {
            navigation.navigate('notesListStack', {screen: 'NoteDetailScreen', params: {note: item}})
        } : undefined
        return (
            <>
                {images.length > 0 && <ImageAndCountComponent uriArr={images} callBack={openDetail}/>}
                <NoteDataBlockComponent note={item} selectRelatives={selectRelatives} dotsMenu={dotsMenu}/>
            </>
        );
    }

export default NoteComponent
