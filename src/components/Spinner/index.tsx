import { SpinnerContainer } from "../../styles/components/spinner.module";
import ClockLoader from "react-spinners/ClockLoader";

const Spinner = () => {
    return(
        <SpinnerContainer>
            <ClockLoader size={150} color='var(--blue-dark)' />
        </SpinnerContainer>
    )
}

export default Spinner;