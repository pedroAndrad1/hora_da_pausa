import { useContext, useState } from 'react';
import { UserContext } from '../../Contexts/UserContext';
import { ProfileContainer, ProfilePhoto, ProfileInfos, Name, Level, Skeleton }
    from '../../styles/components/Profile.module';

export default function Profile() {
    const { level, name, foto } = useContext(UserContext)
    //'https://hajiri.co/uploads/no_image.jpg'
    const [skeleton, setSkeleton] = useState(true);
    const handleLoad = ({ target }) => {
        target.style.opacity = 1;
        setSkeleton(false);
    }
    
   let url ='';
    if(foto){
        url =  foto ;
    }
    else{
        url = 'https://hajiri.co/uploads/no_image.jpg'
    }
    
    return (
        <ProfileContainer>
            { skeleton && <Skeleton />}
            <ProfilePhoto
                src={url}
                alt='Foto de perfil'
                onLoad={handleLoad}
            />
            <ProfileInfos>
                <Name>{name}</Name>
                <Level>
                    <img src='icons/level.svg' alt='Seta para cima' />
                    Nível {level}
                </Level>
            </ProfileInfos>
        </ProfileContainer>
    )
}