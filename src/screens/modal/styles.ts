import { createStyles } from "../../helpers/style";
import {containerWidth} from "../../helpers/utils";

const styles = createStyles({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "$colorModal",
    justifyContent: "center",
    alignItems: "center",
  },
  window: {
    width: '100%',
    backgroundColor: "$colorWhite",
    borderRadius: 5,
    paddingVertical: "2rem",
    paddingHorizontal: "1rem",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: "1.6rem"
  },
  bodyText: {
    width: "100%",
    marginTop: "1.5rem",
    marginBottom: "2rem",
    textAlign: 'center',
    fontSize: '1rem'
  },
  button: {
    borderWidth: 1,
    borderColor: "$colorGrey",
    width: "19rem",
    height: "2.5rem",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: '0.3rem',
    marginBottom: '0.5rem',
  }
});
export default styles;


