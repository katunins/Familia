import React from "react";
import {Pressable, Text, View,} from "react-native";
import styles from "./styles";
import {IModalData} from "../../interfaces/store";
import ButtonComponent from "../../components/button";
import {useDispatch} from "react-redux";
import {resetModal} from "../../store/slice/modal.slice";

const ModalScreen: React.FunctionComponent<IModalData> =
    ({
         title,
         bodyText,
         buttons
     }) => {
        const dispatch = useDispatch()
        return (
            <View style={styles.container}>
                <View style={styles.window}>
                    <Text style={styles.title}>{title || ""}</Text>
                    <Text style={styles.bodyText}>{bodyText}</Text>
                    {buttons.map((item, key) =>
                        <ButtonComponent {...item}
                                         callBack={item.callBack ?
                                             () => {
                                                 // @ts-ignore
                                                 item.callBack()
                                                 dispatch(resetModal())
                                             } : () => dispatch(resetModal())}
                                         key={key}/>)
                    }
                </View>
            </View>
        );
    };
export default ModalScreen;
