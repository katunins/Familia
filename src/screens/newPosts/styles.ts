import {marginHorizontal} from "../../helpers/utils";
import {createStyles} from "../../helpers/style";

const styles = createStyles({
  container: {
    width: "100%",
    // flex:1,
    paddingHorizontal: marginHorizontal,
    justifyContent: 'center',
    backgroundColor: '$colorWhite'
  },
  paddingTextArea:{paddingTop: '1rem'},
  separator: {
    height:10
  },
  flatListWrapper:{
    marginTop: '1rem',
  }
});
export default styles;


