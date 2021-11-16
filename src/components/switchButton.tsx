import React, {useState} from "react";
import {Switch} from "react-native";

const SwitchButtonComponent: React.FunctionComponent<{ callBack: (data: boolean) => void }> = ({callBack}) => {

    const [isSwitch, setIsSwitch] = useState(false);
    return <><Switch
        trackColor={{false: "#767577", true: "#767577"}}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => {
            setIsSwitch(previousState => !previousState)
            callBack(isSwitch)
        }}
        value={isSwitch}
    /></>
}

export default SwitchButtonComponent
