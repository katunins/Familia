import React from "react";
import {Pressable, Text, View,} from "react-native";
import styles from "./styles";
import {IModalData} from "../../interfaces/store";
import ButtonComponent from "../../components/button";
import {useDispatch} from "react-redux";
import {resetModal} from "../../store/slice/modal.slice";
import DeleteIcon from "../../ui/svg/deleteIcon";

const ModalScreen: React.FunctionComponent<IModalData> =
    ({
         title,
         bodyText,
         component,
         buttons
     }) => {
        const dispatch = useDispatch()
        const closeModal = () => {
            dispatch(resetModal())
        }
        return (
            <View style={styles.container}>
                <View style={styles.window}>
                    <View style={styles.closeButtonWrapper}>
                        <Pressable onPress={closeModal} hitSlop={32}>
                            <DeleteIcon/>
                        </Pressable>
                    </View>
                    <Text style={styles.title}>{title || ""}</Text>
                    {bodyText && <Text style={styles.bodyText}>{bodyText}</Text>}
                    {component && component}
                    {buttons && buttons.map((item, key) =>
                        <ButtonComponent
                            {...item}
                            callBack={item.callBack ?
                                () => {
                                    // @ts-ignore
                                    item.callBack()
                                    closeModal()
                                } : closeModal}
                            key={key}/>)
                    }
                </View>
            </View>
        );
    };
export default ModalScreen;
