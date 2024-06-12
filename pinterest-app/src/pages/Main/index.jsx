import { useEffect, useState } from "react";
import styles from "./style.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getPictureById, getPictures } from "../../store/slices/pictures";

function shuffleArray(array) {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [
            shuffledArray[j],
            shuffledArray[i],
        ];
    }
    return shuffledArray;
}

function Main() {
    const pictures = useSelector((state) => state.pictures.list);
    const dispatch = useDispatch();
    const [popupVisible, setPopupVisible] = useState(false);
    const [picture, setPicture] = useState(null);

    useEffect(() => {
        dispatch(getPictures());
    }, []);

    // реализовать закрытие попап по крестику, нажатию по подложке(useRef) и по esc
    // опдправить стилизацию, добавить кнопки пролистывания картинки вперед и назад, повесить пролистывание на кнопки (клава)

    return (
        <>
            <div className={styles.gallery_wrapper}>
                <ul className={styles.gallery_grid}>
                    {shuffleArray(pictures).map((picture) => (
                        <li
                            key={picture.id}
                            className={styles.gallery_item}
                            onClick={() => {
                                setPopupVisible(true);
                                setPicture(picture);
                            }}
                        >
                            <img
                                className={styles.gallery_item__image}
                                src={picture.image}
                            />
                            <h1 className={styles.gallery_item__name}>
                                {picture.name}
                            </h1>
                        </li>
                    ))}
                </ul>
            </div>
            {picture && (
                <div
                    className={styles.popup_wrapper}
                    style={{ display: popupVisible ? "flex" : "none" }}
                >
                    <div className={styles.popup_body}>
                        <button
                            className={styles.closePopup}
                            onClick={() => {
                                setPopupVisible(false);
                                setPicture(null);
                            }}
                        ></button>
                        <h1>{picture.name}</h1>
                        <img src={picture.image} />
                        <h1 className={styles.pictureLocation}>
                            {picture.country} • {picture.city}
                        </h1>
                    </div>
                </div>
            )}
        </>
    );
}

export default Main;
