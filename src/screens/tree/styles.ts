import {createStyles} from "../../helpers/style";

const styles = createStyles({

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
    itemTreeWrapper: {
        flexDirection: 'row'
    },
    name: {
        fontSize: 12,
        marginTop: 8,
        textAlign: 'center',
    },
    nameWrapper: {
        minHeight: 52,
        justifyContent: 'center'
    },

    verticalLineWrapper: {
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    itemTreeContainer: {
        justifyContent: 'flex-end'
    },
    verticalLine: {
        width: 1,
        backgroundColor: 'grey',
    },
    horizontalLineWrapper: {
        width:'100%',
    },
    horizontalUnionLine: {
        borderColor: 'grey',
        width: '50%',
        height: 7,
        borderLeftWidth: 1,
        borderRightWidth: 1,
    },
    brothersWrapper: {
        flexDirection: 'row',
    }
});
export default styles;


