import {containerWidth} from "../../helpers/utils";
import {createStyles} from "../../helpers/style";

const styles = createStyles({
    itemContainer: {
        flexDirection: 'row',
        marginVertical: '0.7rem',
    },
    userPicWrapper: {
        width: containerWidth / 4,
        height: containerWidth / 4,
        borderRadius: 10,
        marginRight: '1rem',
        flex: 0,
    },
    relativeName: {
        fontSize: '1.1rem',
        fontWeight: '600',
        marginBottom: 6
    },
    nameWrapper: {
        flex: 1,
        justifyContent: 'center',
    },
    emptyComponent: {
        alignItems: 'center',
        marginVertical: 40
    }
});
export default styles;


