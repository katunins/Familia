import {INote, IRelative} from "../interfaces/store";
import {FlatList, Pressable, Text, View} from "react-native";
import FastImage from "react-native-fast-image";
import styles from "./styles";
import React, {Component, useState} from "react";
import ImageAndCountComponent from "./imageAndCount";
import globalStyles from "../styles/styles";
import DotsIcon from "../ui/svg/dots";
import SeparatorComponent from "./separator";
import {getRelativeUri} from "../helpers/utils";

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

class NoteComponent extends Component<IProps, { dotsMenuOpen: boolean }> {
    constructor(props: IProps) {
        super(props);
        this.state = {dotsMenuOpen: false};
    }

    dotsButton = () => {
        this.setState({dotsMenuOpen: !this.state.dotsMenuOpen})
        // setTimeout(()=> this.setState({dotsMenuOpen: false}), 3000)
    }

    render() {
        const {description, images, title, relatives} = this.props.item
        const {index} = this.props
        return (
            <View>
                {images.length > 0 && <ImageAndCountComponent imageUriArr={images.map(item => {
                    return {uri: item}
                })}/>}
                <View style={globalStyles.paddingContainer}>
                    <View style={styles.noteComponentDotsWrapper}>
                        <Text style={globalStyles.title}>{title}</Text>
                        <View>
                            <Pressable onPress={this.dotsButton} hitSlop={12}>
                                <DotsIcon/>
                            </Pressable>
                            {this.state.dotsMenuOpen && <View style={[styles.dotsMenu, index === 0 ? styles.dotsMenuShiftDown : {}]}>
                                <FlatList
                                    data={this.props.dotsMenu}
                                    keyExtractor={(item, index) => index.toString()}
                                    // @ts-ignore
                                    listKey={(item, index) => `_keya${index.toString()}`}
                                    ItemSeparatorComponent={SeparatorComponent}
                                    renderItem={({item}) =>
                                        <Pressable
                                            style={styles.noteComponentDotsLineWrapper}
                                            onPress={() => {
                                                this.setState({dotsMenuOpen: false})
                                                item.callBack()
                                            }}>
                                            <Text>{item.title}</Text>
                                            {item.icon && item.icon}
                                        </Pressable>}
                                />
                            </View>}
                        </View>

                    </View>
                    <Text style={styles.noteComponentText}>{description}</Text>
                    <FlatList
                        data={relatives}
                        style={styles.noteComponentRelativesWrapper}
                        renderItem={({item}) => <FastImage source={
                            {uri: getRelativeUri({id: item, selectRelatives: this.props.selectRelatives})}}
                            // @ts-ignore
                                                           style={styles.noteComponentRelativesItem}/>}
                        keyExtractor={(index) => index}
                    />

                </View>
            </View>
        );
    }
}

export default NoteComponent
