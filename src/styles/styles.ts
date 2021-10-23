import {createStyles} from '../helpers/style';
import {marginHorizontal, squareAvatarSize} from "../helpers/utils";

const globalStyles = createStyles({
    border:{
        borderColor:'$colorGrey',
        borderWidth: 1
    },
    scrollBottomMargin:{
        marginBottom:20
    },
    body: {width: '100%', height: '100%'},
    boldText: {fontWeight: '500'},
    bigThinText:{
        fontSize: '1.3rem',
        fontWeight: '200'
    },
    paddingWrapper: {
        textAlign: 'left',
        width: '100%',
        paddingHorizontal: marginHorizontal,
    },
    marginBottom:{
        marginBottom: '1rem'
    },
    paddingTop:{
      marginTop: '1rem'
    },
    paddingContainer:{
        padding: '1rem'
    },
    rowSpaceBetween:{
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'flex-start'
    },
    verticalCentre: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },

    title: {
        fontSize: '1.5rem',
    },
    textCenter:{textAlign: 'center'},
    strokeForm: {
        height: 48,
        padding: '1rem',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '$colorGrey',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        flexDirection: 'row'
    },
    textAreaForm:{
        height: 140,
        paddingVertical: '2rem'
    },
    signInButton: {
        backgroundColor: '$colorLightGrey',
    },
    buttonMargin: {
        marginBottom: '0.8rem',
    },

    linkButton: {
        color: '$colorBlue',
    },
    marginTop: {
        marginTop: '2rem'
    },
    spaceBetween: {
        justifyContent:'space-between'
    },
    marginLine: {
        marginVertical: '1rem',
    },
// ----------


    barStyle: {
        height: 40, //TODO
        backgroundColor: '$colorWhite',
        borderTopColor: '$colorLightGrey',
        borderTopWidth: 1,
        shadowColor: 'transparent',
        shadowRadius: 0,
        elevation: 0,
        justifyContent: 'center',
    },
    container: {
        alignItems: 'center',
        width: '100%',
    },
    textInput: {
        height: 48,
        fontSize: '1rem',
        padding: '1rem',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '$colorGrey',
        width: '100%',
    },
    miniUserPic: {
        width: '5rem',
        height: '5rem',
        borderRadius: 6
    },

});
export default globalStyles;
