import {createStyles} from "../../helpers/style";

const styles = createStyles({
    horizontalContainer:{
        alignItems: 'center',
    },
    container: {
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'grey',
        borderWidth: 2
    },
    itemWrapper: {
        alignItems: 'center',
    },
    lineWrapper: {
        flexDirection: 'row',
    },
    lineBlockContainer: {
        alignItems: 'center',
    },
    verticalLineWrapper: {
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    name: {
        fontSize: 14,
        marginTop: 8,
        textAlign: 'center'
    },
    type: {
        fontSize: 14,
        color: '$colorGrey'
    },
    horizontalLine: {
        height: 1,
        backgroundColor: '$colorGrey',
    },
    verticalLine: {
        width: 1,
        backgroundColor: '$colorGrey'
    },
    verticalMiniLine: {
        width: 1,
        height: 25,
        backgroundColor: '$colorGrey'
    }
});
export default styles;


