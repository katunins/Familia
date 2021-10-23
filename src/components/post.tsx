import {IPost, IRelative} from "../interfaces/store";
import {FlatList, Pressable, Text, View} from "react-native";
import FastImage from "react-native-fast-image";
import styles from "./styles";
import React, {Component, useState} from "react";
import ImageAndCountComponent from "./imageAndCount";
import globalStyles from "../styles/styles";
import DotsIcon from "../ui/svg/dots";
import SeparatorComponent from "./separator";
import {getRelativeUri, IGetRelativeUri} from "../helpers/utils";

interface IProps {
    item: IPost,
    selectRelatives:IRelative[]
    dotsMenu: {
        title: string
        icon?: React.ReactElement
        callBack: () => void
    }[]
}

class PostComponent extends Component<IProps, { dotsMenuOpen: boolean }> {
    constructor(props: IProps) {
        super(props);
        this.state = {dotsMenuOpen: false};
    }

    dotsButton = () => {
        this.setState({dotsMenuOpen: !this.state.dotsMenuOpen})
        // setTimeout(()=> this.setState({dotsMenuOpen: false}), 3000)
    }

    render() {

        return (
            <View>
                <ImageAndCountComponent images={this.props.item.images}/>
                <View style={globalStyles.paddingContainer}>
                    <View style={styles.postComponentDotsWrapper}>
                        <Text style={globalStyles.title}>{this.props.item.title}</Text>
                        <View>
                            <Pressable onPress={this.dotsButton} hitSlop={12}>
                                <DotsIcon/>
                            </Pressable>
                            {this.state.dotsMenuOpen && <View style={styles.dotsMenu}>
                                <FlatList data={this.props.dotsMenu}
                                          keyExtractor={(item, index) => index.toString()}
                                    // @ts-ignore
                                          listKey={(item, index) => `_keya${index.toString()}`}
                                          ItemSeparatorComponent={SeparatorComponent}
                                          renderItem={({item}) =>
                                              <Pressable
                                                  style={styles.postComponentDotsLineWrapper}
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
                    <Text style={styles.postComponentText}>{this.props.item.description}</Text>
                    <FlatList
                        data={this.props.item.relatives}
                        style={styles.postComponentRelativesWrapper}
                        renderItem={({item}) => <FastImage source={{uri: getRelativeUri({id:item, selectRelatives: this.props.selectRelatives})}}
                            // @ts-ignore
                                                           style={styles.postComponentRelativesItem}/>}
                        keyExtractor={(index) => index}
                    />

                </View>
            </View>
        );
    }
}

export default PostComponent
