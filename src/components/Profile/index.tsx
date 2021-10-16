import { useContext, useState } from 'react';
import { UserContext } from '../../Contexts/UserContext';
import { ProfileContainer, ProfilePhoto, ProfileInfos, Name, Level, Skeleton }
    from '../../styles/components/Profile.module';

export default function Profile() {
    const { level, name, foto } = useContext(UserContext)
    //'https://hajiri.co/uploads/no_image.jpg'
    //https://e31b1f67c47a.ngrok.io/imagens/usersIMG/7/0151272021041560779c1f36733.png
    const [skeleton, setSkeleton] = useState(true);
    const handleLoad = ({ target }) => {
        target.style.opacity = 1;
        setSkeleton(false);
    }
    
   let url ='https://hajiri.co/uploads/no_image.jpg';
    if(foto != null){
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