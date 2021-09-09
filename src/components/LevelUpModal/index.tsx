import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useContext } from "react";
import { FacebookShareButton} from "react-share";
import { ChallengesContext } from "../../Contexts/ChallengesContext";
import { UserContext } from "../../Contexts/UserContext";
import { Overlay, ModalContainer, Exit, ShareButton } from "../../styles/components/LevelUpModal.module";

export default function LevelUpModal() {

    const { closeLevelUpModal } = useContext(ChallengesContext);
    const { level } = useContext(UserContext);

    return (
        <Overlay
            as={motion.div}
            transition={{ delay: 0, duration: 0.5 }}
            variants={{
                show: { opacity: 1 },
                hidden: { opacity: 0 },
            }}
            initial="hidden"
            animate="show"
        >
            <ModalContainer

            >
                <header>{level}</header>

                <strong>Parabéns!</strong>
                <p>Você subiu de Nível!</p>

                <Exit onClick={closeLevelUpModal}>
                    <img src="/icons/close.svg" alt="Botão para fechar modal" />
                </Exit>

                <FacebookShareButton
                    url='https://github.com/bsipcs20202/hora_da_pausa'
                    quote='Conseguir subir de nível! Venha tentar me alcançar!'
                    style={{width: '60%', marginTop: '2rem'}}
                >
                    <ShareButton>
                        Compartilhar
                        <FontAwesomeIcon icon={faFacebookSquare} />
                    </ShareButton>
                </FacebookShareButton>


            </ModalContainer>
        </Overlay>
    )
}