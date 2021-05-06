import React, {useState} from 'react'
import film from './film.svg'
import check from './check.svg'
import thumbUp from './thumb-up.svg'
import thumbDown from './thumb-down.svg'
import thumbUpActive from './thumb-up-active.svg'
import thumbDownActive from './thumb-down-active.svg'
import trash from './trash.svg'
import { connect } from 'react-redux'

function MovieCard(props) {

    const { dislikeMovies, favoritesMovies } = props

    const [like, setLike] = useState(undefined);
    const [movie, setMovie] = useState(props.movie)

    // console.log(favoritesMovies)

    const toggleLike = (e) => {
        const action = {
            type: "TOGGLE_LIKE", 
            value: movie
        }
        props.dispatch(action)
        console.log("action : " + action.type)
        console.log(favoritesMovies)
        if(e.target.classList.includes("active")) {
            e.target.classList.replace(" active ","")
        } else { e.target.classList += " active " }
    }

    const toggleDislike = (e) => {
        const action = {
            type: "TOGGLE_DISLIKE", 
            value: movie
        }
        props.dispatch(action)   
        console.log("action : " + action.type)     
        console.log(dislikeMovies)
    }

    const toggleLikeOrDislike = (e) => {
        let action_type = like === undefined ? 
            "TOGGLE_LIKE" : ( like === true ? "TOGGLE_DISLIKE" : "TOGGLE_LIKE")
        const action = {
            type: action_type, 
            value: movie
        }
        props.dispatch(action)   
        setLike(like === undefined ? true : !like)
        console.log("action : " + action.type)
        console.log(like)
    }

    const deleteMe = () => {
        props.onMovieDelete(movie)
        props.dispatch({
            type: "REMOVE_MOVIE",
            value: movie
        })
    }
    return (
        <div className="MovieCard">
            <div className="MovieCard__Image">
                <img width="60" src={film} alt={movie.title} loading="lazy" title={movie.title} />
            </div>
            <div className="MovieCard__Body">
                <div className="MovieCard__Title">{ movie.title }</div>
                <div className="MovieCard__Category">
                    <img src={check} alt={movie.category} title={movie.category} />
                    { movie.category }
                </div>
                <div className="MovieCard__Actions">
                    <button className="toggleBtn" onClick={toggleLikeOrDislike}>
                        { like === undefined ?                         
                            <img src={thumbUp} alt="Like" title="Like" /> :
                            ( like === true ? 
                                <img src={thumbDownActive} alt="Like" title="Like" /> :
                                <img src={thumbUpActive} alt="Dislike" title="Dislike" />
                            ) 
                        }
                        {like === undefined ? "Like" : ( like === true ? "Dislike" : "Like")}
                    </button>
                </div>
                <div className="MovieCard__Actions">
                    <div className="Like">
                        {/* <img src={thumbUp} onClick={toggleLike} alt="Like" title="Like" /> */}
                        <img src={ like === true ? thumbUpActive : thumbUp } alt="Like" title="Like" />
                        <span>{ like === true ? movie.likes + 1 : movie.likes }</span>
                    </div>
                    <div className="Dislike">
                        {/* <img src={thumbDown} alt="Dislike" onClick={toggleDislike} title="Dislike" /> */}
                        <img src={ like === false ? thumbDownActive : thumbDown } alt="Dislike" title="Dislike" />
                        <span>{ like === false ? movie.dislikes + 1 : movie.dislikes }</span>
                    </div>
                    <div className="Remove">
                        <img src={trash} alt="Delete Movie" onClick={deleteMe} title="Delete Movie" />
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    favoritesMovies: state.favoritesMovies,
    dislikeMovies: state.dislikeMovies,
})


export default connect(mapStateToProps)(MovieCard)
