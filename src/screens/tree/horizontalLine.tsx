import React from "react";
import {View} from "react-native";
import {treeItemSize} from "../../config";

const HorizontalLineComponent = ({transparent}: { transparent?: boolean }) => {
    return <View style={[{
        width: treeItemSize.horizontalLine,
        height: 1,
        backgroundColor: 'grey',
        alignContent: 'center',
        marginTop: treeItemSize.height / 2 + treeItemSize.marginVertical
    }, transparent ? {opacity: 0} : {}]}/>
}

export default HorizontalLineComponent
