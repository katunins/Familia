import {createStyles} from '../helpers/style';
import {containerWidth, squareAvatarSize} from "../helpers/utils";

const styles = createStyles({
    // userPicWrapper: {width: '100%', height: 400},
    separator: {
        height: 1,
        flex: 1,
        backgroundColor: '$colorGrey',
        marginVertical: '1rem'
    },
    buttonWrapper: {
        width: '100%',
        paddingVertical: '1rem',
        flexDirection: 'row',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginVertical: '.3rem'
    },
    disabledButton: {
        opacity: 0.3
    },
    buttonText: {
        fontSize: '1rem',
    },
    buttonType__general: {
        backgroundColor: '$colorSuperLightGrey',
        borderColor: '#D3D3D3'
    },
    buttonType__invert: {
        backgroundColor: '$colorDarkGrey',
        borderColor: '$colorDarkGrey'
    },
    buttonTextType__invert: {
        color: '$colorWhite'
    },
    iconWrapper: {
        width: '2rem',
        height: '2rem',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1
    },
    cameraIconWrapper: {
        alignSelf: 'flex-end',
        bottom: '3.5rem',
        marginRight: '1.5rem',
        backgroundColor: '#FFFFFF80',
    },
    buttonIconWrapper: {
        marginRight: "0.5rem"
    },

    circleIconWrapper: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 25,
        backgroundColor: '$colorWhite',
        opacity: 0.6,
        marginHorizontal: 5
    },
    circleIconsContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 15,
        right: 10
    },

    editDescription: {
        marginBottom: '0.3rem',
        color: '$colorGrey'
    },
    inputContainer: {
        marginTop: '0.5rem',
        marginBottom: '0.5rem',
    },
    dateText: {
        fontSize: '1.5rem',
        fontWeight: '300',
        color: '$colorGrey'
    },
    typesContainer: {flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: '0.5rem'},
    typesWrapper: {
        padding: '0.5rem',
        backgroundColor: '$colorLightGrey',
        marginTop: '0.3rem',
        marginBottom: '0.3rem',
        width: '30%',
        alignItems: 'center',
        borderRadius: 5
    },
    selectedType: {
        backgroundColor: '$colorWhite'
    },
    plus: {
        fontSize: '2rem',
        fontWeight: '200'
    },
    textUnderPlus: {
        textAlign: 'center',
        fontSize: '1rem'
    },
    plusButtonWrapper: {
        width: squareAvatarSize,
        height: squareAvatarSize,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },

    avatarWrapper: {
        marginRight: '0.5rem',
        position: 'relative',
        width: squareAvatarSize
    },
    avatarDescriptionWrapper: {
        bottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        backgroundColor: '$colorWhite',
        paddingVertical: '0.2rem',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 1,
    },
    eraseButton: {
        position: 'absolute',
        bottom: 17,
        right: 2,
        borderWidth: 1,
        borderColor: 'red',
        backgroundColor: '$colorWhite',
        borderRadius: 30,
        padding: 5
    },
    relativeName: {
        fontSize: '1rem',
    },
    parentType: {
        color: '$colorGrey',
    },

    parentEditButtonsWrapper: {
        flexDirection: 'row',
        marginRight: '0.5rem'
    },

    cloudText: {
        fontSize: '0.9rem',
    },
    showMore: {
        marginTop: '0.5rem',
        color: 'blue'
    },
    relativeContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    relativeBirthday: {
        color: '$colorGrey',
        marginVertical: '0.5rem',
    },
    leftLineWidth: {
        // width:150,
        // backgroundColor:'red'
    },
    leftBigComponentColumn: {
        flex: 9
    },
    rightBigComponentColumn: {
        flex: 4,
        alignItems: 'flex-end'
    },
    typeBigComponent: {
        marginTop: 5
    },
    aboutBigComponent: {
        marginTop: 5,
        color: '$colorDarkGrey'
    },
    eraseImageButton: {
        backgroundColor: '#EEEEEE99',
        padding: 10,
        borderWidth: 1,
        borderColor: '$colorGrey',
        borderRadius: 35,
        position: 'absolute',
        top: '1rem',
        right: '1rem'
    },
    relativeCheckListElementContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: '0.5rem',
        alignItems: 'center',
        opacity: 0.4
    },
    imageAndText: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    relativeCheckListElementTextWrapper: {
        marginLeft: '1rem'
    },
    relativeCheckListElementChecked: {
        opacity: 1
    },
    imageAndCountImage: {
        width: '100%',
    },
    imageAndCountLabel: {
        backgroundColor: '#FFFFFFAA',
        borderColor: '$colorGrey',
        paddingVertical: 2,
        fontSize: '0.8rem',
        fontWeight: '500',
        width: '3rem',
        textAlign: 'center',
        position: 'absolute',
        bottom: 20,
        right: 20
    },
    noteComponentText: {
        color: '$colorDarkGrey',
        marginVertical: 10,
    },
    noteDate: {
        color: '$colorDarkGrey',
        marginBottom: 12,
    },
    noteComponentDate: {
        color: '$colorDarkGrey',
        marginBottom: 6,
    },
    noteComponentRelativesWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    noteComponentRelativesItem: {
        width: 50,
        height: 50,
        marginRight: '0.5rem',
        borderRadius: 10
    },
    noteComponentDotsWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dotsMenuButton: {
        height: 32, width: 32, alignItems: 'center', justifyContent: 'center'
    },
    dotsMenu: {
        width: '13rem',
        position: 'absolute',
        padding: '1rem',
        borderRadius: 5,
        backgroundColor: '$colorWhite',
        right: '3rem',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    noteComponentDotsLineWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 12,
    },
    noteComponentDotsLineText: {
        fontSize: '1.1rem',
        fontWeight: '600',
    },
    searchLineContainer: {
        backgroundColor: '$colorWhite',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 10
    },
    searchLine: {width: '100%'},
    loaderWrapper: {
        marginRight: '1rem',
        backgroundColor: 'red'
    }
});
export default styles;
