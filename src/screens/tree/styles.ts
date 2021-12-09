import {createStyles} from "../../helpers/style";

const styles = createStyles({

    container: {
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'grey',
        borderWidth: 2
    },
    badgeContainer: {
        backgroundColor: '$colorWhite',
        borderColor: 'grey',
        borderWidth: 1,
        width: 20,
        height: 20,
        alignItems: 'center',
        alignSelf: 'flex-end',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: -20,
        marginRight: 13
    },
    badgeText: {
        fontSize: 12,
        color: '$colorDarkGrey'
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
        borderRadius: 10
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
    },
    brothersWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    }
});
export default styles;


