/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../core/provider/user";
import PrettyRating from "pretty-rating-react";
import LoadingOverlay from 'react-loading-overlay-ts';

import "../css/Library.css";

function LibraryView(): JSX.Element {
    const { user } = useContext(UserContext);
    const { id } = useParams()
    const [Books, SetBooks] = useState<any[]>([]);
    const [ratingValue, setRatingValue] = useState(0)
    const [Recommend, SetRecommend] = useState<any[]>([]);
    const [isActive, setActive] = useState(true)
    const navigate = useNavigate()

    const colors = {
        star: ['#d9ad26', '#d9ad26', '#434b4d'],
    };

    function handleReturnPage() {
        navigate("/");
    }

    useEffect(() => {
        const handleRating = (rate: number) => {
            setRatingValue(rate)
        }


        async function Get_Book() {
            let rating = 0;
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: user.token, book_id: id })
            };

            const tmp = await fetch(`http://5896-163-5-2-51.ngrok.io/book`, requestOptions);

            const response = await tmp.json();
            SetBooks(response.message);
            console.log(response.message);

            rating = ((5 * response.message[0].ratings_5) + (4 * response.message[0].ratings_4) + (3 * response.message[0].ratings_3) + (2 * response.message[0].ratings_2) + (1 * response.message[0].ratings_1)) / (response.message[0].ratings_count)
            console.log(rating.toFixed(2));
            handleRating(rating);

        }
        Get_Book();
    }, []);

    useEffect(() => {
        if (Books.length === 0) {
            return;
        }
        async function RecommendBooks() {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: user.token, search: Books[0].title })
            };

            const tmp = await fetch(`http://5896-163-5-2-51.ngrok.io/recommend`, requestOptions);
            const response = await tmp.json();

            if (response.status === "OK") {
                SetRecommend(response.recommend);
                setActive(false);
            } else if (response.status === "KO") {
                console.log(response);
            }
        }
        RecommendBooks();
    }, [Books]);


    return <>
        <div>
            {Books.map((items, index) =>
                <div key={items.book_id} className="container">
                    <div className="col-xs-12 col-md-6">
                        <div className="prod-info-main prod-wrap clearfix">
                            <div className="row">
                                <div className="col-md-7 col-sm-12 col-xs-12">
                                    <div className="product-deatil">
                                        <h5 className="name">
                                            <a href="#">
                                                {items.title}
                                            </a>
                                        </h5>
                                    </div>
                                </div>
                                <div className="col-md-5 col-sm-12 col-xs-12">
                                    <div className="product-image">
                                        <img src={items.image_url} className="img-responsive"></img>
                                    </div>
                                </div>
                                <div className="col-md-7 col-sm-12 col-xs-12">
                                    <div className="description">
                                        <p>auteur : {items.authors}</p>
                                        <p> language : {items.language_code}</p>
                                    </div>
                                    <div className="product-info smart-form">
                                        <div className="row">
                                            <PrettyRating value={ratingValue} colors={colors.star} />
                                        </div>
                                        <br></br>
                                        <div className="col-md-12">
                                            <a href="#" className="btn btn-danger">Ajouter à la biblioothèque</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div id="wrapperrec">
                <LoadingOverlay
                    active={isActive}
                    spinner
                    text='Loading your recommendations...'
                >
                    <h1>Recommendations</h1>
                    {Recommend.map((items, index) =>
                        <div className="divrecommend" key={items.book_id}>
                            <img src={items.small_image_url}></img>
                            <p>{items.title}</p>
                        </div>
                    )}
                </LoadingOverlay>

            </div>
        </div>
        <button className="btn tblActnBtn" id="nextpage" onClick={handleReturnPage}>
            <i className="material-icons">Retour</i>
        </button>
    </>
}

export default LibraryView;