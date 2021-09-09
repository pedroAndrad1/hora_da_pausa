import { useContext, useEffect } from 'react';
import { UserContext } from '../../Contexts/UserContext';
import {BarContainer, Bar, StyledExperienceBar, ExperienceValue} 
from '../../styles/components/ExperienceBar.module';

export default function ExperienceBar(){

   const {xp, xpParaUpar} = useContext(UserContext);
    //Regra de tres
    const experiencePercent = Math.floor(xp * 100) / xpParaUpar;

    return(
        <BarContainer>
            <span>0xp</span>
            <Bar>
                <StyledExperienceBar experiencePercent = {experiencePercent} />
                <ExperienceValue experiencePercent={experiencePercent} >
                    {xp}xp
                </ExperienceValue>
            </Bar>
            <span>{xpParaUpar}xp</span>
        </BarContainer>
    )

}

