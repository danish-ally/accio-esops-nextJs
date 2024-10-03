import React from 'react'
import Image from 'next/image';
import styles from "./WinningTeamCard.module.css"

const WinningTeamCard = ({ imageSrc, name, description }) => {
    return (
        <div className={styles.teamCard}>
            <div className={styles.imageContainer}>
            
                <Image
                    src={imageSrc}
                    alt='imageSrc'
                    width={100}
                    height={100}
                    className={styles.objectContain}
                />
            </div>
            <div className={styles.infoContainer}>
                <div className={styles.name}>{name}</div>
                <div className={styles.description}>{description}</div>
            </div>
        </div>
    );
}

export default WinningTeamCard