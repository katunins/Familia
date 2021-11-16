import {containerWidth, marginHorizontal} from "../../helpers/utils";
import {createStyles} from "../../helpers/style";

const styles = createStyles({
    userPicWrapper: {
        width: containerWidth / 4,
        height: containerWidth / 4,
        borderRadius: 10,
        marginRight: '1rem',
        flex: 0
    },
    relativeName: {
        width: containerWidth / 4 * 3,
        marginBottom: 6
    }
});
export default styles;


