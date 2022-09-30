import { Card } from "../components/Card";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../core/provider/user";

import "../css/Home.css";

const CardContainer = styled.div`
    margin-top: 100px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    justify-items: center;
    column-gap: 120px;
    row-gap: 50px;
    max-width: 948px;
    margin: 0 auto;
`;

function HomeView(): JSX.Element {
    const { user } = useContext(UserContext);
    const [Books, SetBooks] = useState<any[]>([]);
    const [Page, SetPage] = useState(0);
    // const [Recommend, SetRecommend] = useState<any[]>([]);
    const [Search, SetSearch] = useState('');

    useEffect(() => {
        async function Get_Books() {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: user.token, page: Page })
            };

            const tmp = await fetch(`http://5896-163-5-2-51.ngrok.io/books`, requestOptions);

            const response = await tmp.json();
            SetBooks(response.message);
            console.log(response);
        }
        Get_Books();
    }, [])

    const handlePreviousPage = async () => {
        if (Page > 0) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: user.token, page: Page - 1 })
            };

            const tmp = await fetch(`http://5896-163-5-2-51.ngrok.io/books`, requestOptions);

            const response = await tmp.json();

            if (response.status === "OK") {
                SetBooks(response.message);
                SetPage(Page - 1);
            } else if (response.status === "KO") {
                console.log(response);
            }
        } else {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: user.token, page: Page })
            };

            const tmp = await fetch(`http://5896-163-5-2-51.ngrok.io/books`, requestOptions);

            const response = await tmp.json();
            if (response.status === "OK") {
                SetBooks(response.message);
                SetPage(0);
            } else if (response.status === "KO") {
                console.log(response);
            }
        }
    };

    const handleNextPage = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: user.token, page: Page + 1 })
        };
        console.log(Page);
        const tmp = await fetch(`http://5896-163-5-2-51.ngrok.io/books`, requestOptions);

        const response = await tmp.json();
        console.log(response);
        if (response.status === "OK") {
            SetBooks(response.message);
            SetPage(Page + 1)
        } else if (response.status === "KO") {
            console.log(response);
        }
    };
    const searchBooks = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: user.token, search: Search })
        };

        const tmp = await fetch(`http://5896-163-5-2-51.ngrok.io/searchbooks`, requestOptions);

        const response = await tmp.json();
        
        if (response.status === "OK") {
            SetBooks(response.message);
        } else if (response.status === "KO") {
            console.log(response);
        }
        // RecommendBooks();
    }

    // const RecommendBooks = async () => {
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ token: user.token, search: Books[0].title })
    //     };

    //     const tmp = await fetch(`http://5896-163-5-2-51.ngrok.io/recommend`, requestOptions);

    //     const response = await tmp.json();
        
    //     if (response.status === "OK") {
    //         SetRecommend(response.recommend);
    //     } else if (response.status === "KO") {
    //         console.log(response);
    //     }
    // }

    const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        SetSearch(event.target.value);
        console.log('value is:', event.target.value);
    };

    return <>
        <div className="SearchContainer">
            <input className="SearchInput" name="search" type="text" placeholder="Search" onChange={handleChangeSearch}
                value={Search} />
            <button className="btn tblActnBtn " id="Search" onClick={searchBooks}>
                <i className="material-icons">Search</i>
            </button>
        </div>
        <CardContainer>
            {Books.map((items, index) => <Card title={items.title} date={Math.trunc(items.original_publication_year)} imgUrl={items.image_url} key={items.book_id} id= {items.book_id} />)}
            {/* <div id="wrapperrec">
                <h1>Recommendations</h1>
                {Recommend.map((items, index) =>
                    <div className="divrecommend"key={items.book_id}>
                        <img src={items.small_image_url}></img>
                        <p>{items.title}</p>
                    </div>
                )}
            </div> */}
        </CardContainer>
        <div className="ButtonPage">
            <button className="btn tblActnBtn" id="previouspage" onClick={handlePreviousPage}>
                <i className="material-icons">Previous Page</i>
            </button>

            <button className="btn tblActnBtn" id="nextpage" onClick={handleNextPage}>
                <i className="material-icons">Next Page</i>
            </button>
        </div>
    </>
}
export default HomeView;