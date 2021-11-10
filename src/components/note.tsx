import {INote, IRelative} from "../interfaces/store";
import {Button, Dimensions, FlatList, NativeTouchEvent, Platform, Pressable, Text, View} from "react-native";
import FastImage from "react-native-fast-image";
import styles from "./styles";
import React, {Component, useState} from "react";
import ImageAndCountComponent from "./imageAndCount";
import globalStyles from "../styles/styles";
import DotsIcon from "../ui/svg/dots";
import SeparatorComponent from "./separator";
import {getRelativeUri} from "../helpers/utils";
import {TouchableOpacity} from "react-native-gesture-handler";

interface IProps {
    item: INote,
    index: number
    selectRelatives: IRelative[]
    dotsMenu: {
        title: string
        icon?: React.ReactElement
        callBack: () => void
    }[]
}

class NoteComponent extends Component<IProps, { dotsMenuBottom: number }> {
    constructor(props: IProps) {
        super(props);
        this.state = {dotsMenuBottom: 0};
    }

    dotsButton = (event: { nativeEvent: { pageY: number } }) => {
        const bottom = event.nativeEvent.pageY > (Dimensions.get('window').height / 2) ? 25 : -165
        this.setState({dotsMenuBottom: this.state.dotsMenuBottom === 0 ? bottom : 0})
    }

    render() {
        const {description, images, title, relatives} = this.props.item
        const {index} = this.props
        return (
            <View>
                {images.length > 0 && <ImageAndCountComponent uriArr={images}/>}
                <View style={globalStyles.paddingContainer}>
                    <View style={styles.noteComponentDotsWrapper}>
                        <Text style={globalStyles.title}>{title}</Text>
                        <View>
                            <Pressable onPress={this.dotsButton} hitSlop={32}>
                                <DotsIcon/>
                            </Pressable>
                            {this.state.dotsMenuBottom !== 0 &&
                            <View style={[styles.dotsMenu, {bottom: this.state.dotsMenuBottom}]}>
                                <FlatList
                                    data={this.props.dotsMenu}
                                    // getItemLayout={(data, index) => (
                                    //     {length: 40, offset: 40 * index, index}
                                    // )}
                                    // keyExtractor={(item, index) => index.toString()}
                                    // @ts-ignore
                                    // listKey={(item, index) => `_keya${index.toString()}`}
                                    ItemSeparatorComponent={()=><SeparatorComponent/> }
                                    renderItem={({item}) =>
                                        Platform.OS === 'ios' ?
                                            <Pressable
                                                onPress={() => {
                                                    this.setState({dotsMenuBottom: 0})
                                                    item.callBack()
                                                }}>
                                                <View style={styles.noteComponentDotsLineWrapper}>
                                                    <Text style={styles.noteComponentDotsLineText}>{item.title}</Text>
                                                    {item.icon && item.icon}
                                                </View>
                                            </Pressable>
                                            :
                                            <TouchableOpacity
                                                onPressIn={() => {
                                                    this.setState({dotsMenuBottom: 0})
                                                    item.callBack()
                                                }}>
                                                <View style={styles.noteComponentDotsLineWrapper}>
                                                    <Text style={styles.noteComponentDotsLineText}>{item.title}</Text>
                                                    {item.icon && item.icon}
                                                </View>
                                            </TouchableOpacity>}
                                />
                            </View>}
                        </View>

                    </View>
                    <Text style={styles.noteComponentText}>{description}</Text>
                    <FlatList
                        data={relatives}
                        style={styles.noteComponentRelativesWrapper}
                        renderItem={({item}) => {
                            const uri = getRelativeUri({
                                id: item,
                                selectRelatives: this.props.selectRelatives
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
                </View>
            </View>
        );
    }
}

export default NoteComponent
