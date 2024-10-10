import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const favoriteAPI = `https://67077eaca0e04071d22a9158.mockapi.io/favorite`;
const readAPI = `https://67077eaca0e04071d22a9158.mockapi.io/read`;

const booksAPI = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=UBDHOrOPPSCuAQf55uEMRxNbmUPIbSrk`;
function BookCard(props) {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [currentBook, setCurrentBook] = useState([]);
  const [warningText, setWarningText] = useState("");
  const [favoritebooks, setFavoriteBooks] = useState([]);
  const [readBooks, setReadBooks] = useState([]);

  const [favBtn, setFavbtn] = useState("");

  const [readBtn, setReadbtn] = useState("");

  useEffect(() => {
    getFavoriteBooks();
    getReadBooks();
  }, []);
  useEffect(() => {
    setFavbtn(
      checkFavorite(props.title) ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="#F95454"
          class="icon icon-tabler icons-tabler-filled icon-tabler-heart"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#F95454"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="icon icon-tabler icons-tabler-outline icon-tabler-heart"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
        </svg>
      )
    );
  }, [favoritebooks]);

  useEffect(() => {
    setReadbtn(
      checkRead(props.title) ? 
        (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="#DC8850"
              class="icon icon-tabler icons-tabler-filled icon-tabler-bookmark"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M14 2a5 5 0 0 1 5 5v14a1 1 0 0 1 -1.555 .832l-5.445 -3.63l-5.444 3.63a1 1 0 0 1 -1.55 -.72l-.006 -.112v-14a5 5 0 0 1 5 -5h4z" />
            </svg>
          )
            : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#DC8850"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="icon icon-tabler icons-tabler-outline icon-tabler-bookmark"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M18 7v14l-6 -4l-6 4v-14a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4z" />
                    </svg>
                    
                )
    );
  }, [readBooks]);
  const getFavoriteBooks = () => {
    axios.get(favoriteAPI).then((res) => {
      setFavoriteBooks(res.data);
    });
  };

  const getReadBooks = () => {
    axios.get(readAPI).then((res) => {
      setReadBooks(res.data);
    });
  };

  const checkFavorite = (title) => {
    let isInFavorite = favoritebooks.some((book) => book.title == title);
    return isInFavorite;
  };
  const checkRead = (title) => {
    let isInRead = readBooks.some((book) => book.title == title);
    return isInRead;
  };
  console.log(checkFavorite("BEACH READ"));

  const favoriteAction = () => {
      if (checkFavorite(props.title)) {
          favoritebooks.find(el => {
              if (el.title == props.title) {
                  axios.delete(favoriteAPI + `/` + el.id).then((res) => {
                    console.log(res);
                    getFavoriteBooks();
                    setFavbtn(( <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="icon icon-tabler icons-tabler-outline icon-tabler-heart"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                      </svg>));  
                })
            }
        })
        
      
    } else {
      axios
        .post(favoriteAPI, {
          id: props.id,
          title: props.title,
          author: props.author,
            image: props.image,
          userId: props.userId
        })
        .then((res) => {
          console.log(res);
          console.log("book added to favorite");
          getFavoriteBooks();
        });
    }
  };

  const ReadAction = () => {
      if (checkRead(props.title)) {
        
        readBooks.find(el => {
            if (el.title == props.title) {
                axios.delete(readAPI + `/` + el.id).then((res) => {
                    console.log(res);
                    setReadbtn(( <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="#DC8850"
                        class="icon icon-tabler icons-tabler-filled icon-tabler-bookmark"
                        >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M14 2a5 5 0 0 1 5 5v14a1 1 0 0 1 -1.555 .832l-5.445 -3.63l-5.444 3.63a1 1 0 0 1 -1.55 -.72l-.006 -.112v-14a5 5 0 0 1 5 -5h4z" />
                  </svg>));
              getReadBooks()
              })
          }
      })
   
     
    } else {
      axios
        .post(readAPI, {
          id: props.id,
          title: props.title,
          author: props.author,
            image: props.image,
            userId: props.userId

        })
        .then((res) => {
          console.log(res);
          console.log("book added to readlist");
          getReadBooks();
        });
    }
  };
  const BookDetailsAction = () => {
    navigate(`/bookDetail/${props.id}`);
  };
  return (
    <div className="flex flex-col p-5 justify-between rounded-md bg-[#fdf1e1] items-center text-primary-content shadow-sm">
      <div>
        <img src={props.image} alt="" className="w-[30vw]" />
      </div>
      <div className="flex flex-col items-center border-2">
        <p className="text-center font-semibold">{props.title}</p>
        <p>{props.author}</p>
      </div>
      <div>
        <button className="btn btn-sm btn-primary" onClick={BookDetailsAction}>
          Show book details
        </button>
        <div className="flex my-2 justify-around">
          <button className="btn btn-sm btn-secondary" onClick={favoriteAction}>
            {favBtn}
          </button>
          <button className="btn btn-sm btn-secondary" onClick={ReadAction}>
            {readBtn}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
