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
    }

    // parentsContainer: {
    //     flexDirection: 'row',
    //     justifyContent: 'center'
    // }
});
export default styles;


