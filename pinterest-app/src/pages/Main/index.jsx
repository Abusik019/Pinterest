import { useEffect, useState, useRef } from "react";
import styles from "./style.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getPictures } from "../../store/slices/pictures";

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
    const [currentIndex, setCurrentIndex] = useState(null);
    const popupRef = useRef(null);

    useEffect(() => {
        dispatch(getPictures());

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setPopupVisible(false);
                setCurrentIndex(null);
            } else if (event.key === "ArrowLeft") {
                handlePrevPicture();
            } else if (event.key === "ArrowRight") {
                handleNextPicture();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [dispatch]);

    const handleClosePopup = (event) => {
        if (event.target === popupRef.current) {
            setPopupVisible(false);
            setCurrentIndex(null);
        }
    };

    const handlePrevPicture = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : pictures.length - 1
        );
    };

    const handleNextPicture = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex < pictures.length - 1 ? prevIndex + 1 : 0
        );
    };

    const shuffledPictures = shuffleArray(pictures);
    const picture = currentIndex !== null ? shuffledPictures[currentIndex] : null;

    return (
        <>
            <div className={styles.header}><img src="https://img.icons8.com/?size=100&id=63676&format=png&color=000000"/></div>
            <div className={styles.gallery_wrapper}>
                <ul className={styles.gallery_grid}>
                    {shuffledPictures.map((picture, index) => (
                        <li
                            key={picture.id}
                            className={styles.gallery_item}
                            onClick={() => {
                                setPopupVisible(true);
                                setCurrentIndex(index);
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
                    onClick={handleClosePopup}
                    ref={popupRef}
                >
                    <div className={styles.popup_body}>
                        <button
                            className={styles.closePopup}
                            onClick={() => {
                                setPopupVisible(false);
                                setCurrentIndex(null);
                            }}
                        />
                        <img src={picture.image} alt={picture.name} />
                        <div className={styles.imageInfo}>
                            <h1>{picture.name}</h1>
                            <div className={styles.redLine}></div>
                            <h2 className={styles.pictureLocation}>
                                {picture.country}<br />
                                <span>{picture.city}</span>
                            </h2>
                            <p>{picture.description}</p>
                            <div className={styles.createdWrapper}>
                                <h3>Created: {picture.created}</h3>
                                <div className={styles.btnContainer}>
                                    <button className={styles.prevBtn} onClick={handlePrevPicture}></button>
                                    <button className={styles.nextBtn} onClick={handleNextPicture}></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Main;
