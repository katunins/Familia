import React from "react";
import {View} from "react-native";
import ItemTreeComponent, {IItemTree} from "./item";
import styles from "./styles";
import VerticalLineComponent from "./verticalLine";
import HorizontalLineComponent from "./horizontalLine";
import {treeItemSize} from "../../config";
import EmptyTreeComponent from "./empty";

export interface ITreeLine {
    bottomVerticalLine?: boolean
    topVerticalLine?: boolean
    bottomHorizontalLine?: boolean
    topHorizontalLine?: boolean
}

interface IProps extends ITreeLine {
    items: IItemTree[]
    scale: number,
    between?: number
    empty?: boolean
}

const LineBlockComponent: React.FunctionComponent<IProps> =
    ({
         items,
         scale,
         bottomVerticalLine,
         topVerticalLine,
         topHorizontalLine,
         bottomHorizontalLine,
         between = 0,
         empty
     }) => {
        if (items.length === 0 && !empty) return null
        const horizontalLineWidth = (items.length - 1 + between + (empty ? 1 : 0)) * (treeItemSize.containerWidth + treeItemSize.margin * 2)
        return (
            <View style={styles.lineBlockContainer}>
                {/*{topVerticalLine && <VerticalLineComponent scale={scale}/>}*/}
                {topHorizontalLine && <HorizontalLineComponent
                    scale={scale}
                    width={horizontalLineWidth}
                />}
                <View style={styles.lineWrapper}>
                    {items.map((item, index) =>
                        <ItemTreeComponent
                            item={item} key={index} scale={scale}  between={between}
                            bottomLine={bottomHorizontalLine}
                            topLine={topHorizontalLine}
                        />
                    )}
                    {empty && <EmptyTreeComponent scale={scale}/>}
                </View>
                {bottomHorizontalLine &&
                <HorizontalLineComponent
                    scale={scale}
                    width={horizontalLineWidth}
                    // width={(items.length) * (treeItemSize.containerWidth)}
                />}
                {bottomVerticalLine && <VerticalLineComponent scale={scale} long/>}
            </View>
        )
    }

export default LineBlockComponent
