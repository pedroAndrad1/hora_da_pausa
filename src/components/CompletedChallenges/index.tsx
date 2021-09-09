import { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { CompletedChallengesContainer } from "../../styles/components/CompletedChallenges.module";

export default function CompletedChallenges(){
    
    const {rotinasFeitas} = useContext(UserContext);
    
    return(
        <CompletedChallengesContainer>
            <span>Desafios completos</span>
            <span>{rotinasFeitas}</span>
        </CompletedChallengesContainer>
    )
}