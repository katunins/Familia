import {containerWidth, marginHorizontal} from "../../helpers/utils";
import {createStyles} from "../../helpers/style";

const styles = createStyles({
  searchHeaderContainer: {
    width: containerWidth,
    alignSelf:'center'
  },
  container: {
    width: "100%",
    // flex:1,
    paddingHorizontal: marginHorizontal,
    justifyContent: 'center',
    // backgroundColor: '$colorWhite'
  },
  separator: {
    height:10
  },
  centerTitleText:{
    textAlign: 'center',
    fontSize: '1rem',
    marginVertical: '1rem',
    fontWeight: '500'
  },
  paddingTextArea:{paddingTop: '1rem'},
  flatListWrapper:{
    // marginTop: '1rem',
    backgroundColor: '$colorWhite'
  },

});
export default styles;


