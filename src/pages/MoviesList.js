// import axios from 'axios'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { movies$ } from '../data/movies'
import MovieCard from '../components/MovieCard'
import Pagination from '../components/Pagination'

class MoviesList extends Component {

    // constructor(props) {
    //     super(props)
    // }

    state = {
        moviesList: [],
        filterByCategory: [],
        perPage: 4,
        currentPage: 1,
    }


    componentDidMount() {
        movies$.then( data => {
            console.log(data)
            this.setState({ moviesList: data })
        })
    }

    // handleSelect = (e) => {
    //     this.setState({ filterByCategory: e.target.value })
    //     e.preventDefault()
    // }

    handleCheckboxChange = (e) => {
        // console.log(e.target.value + " : " + e.target.checked)
        if(e.target.checked === true) {
            console.log(e.target.value + " : " + e.target.checked)
            let temp1 = this.state.filterByCategory
            temp1.push(e.target.value)
            this.setState({
                currentPage: 1,
                filterByCategory: temp1
            })
        } else {
            let temp = this.state.filterByCategory
            temp.splice(temp.findIndex( item => item === e.target.value))
            this.setState({
                filterByCategory: temp,
                currentPage: 1
            })
        }
    }

    deleteAMovie = (movie) => {
        let Temp = this.state.moviesList
        let movieIndexTemp = Temp.findIndex( item => ( item.id === movie.id ))
        Temp.splice(movieIndexTemp, 1)
        this.setState({ moviesList: Temp})
        console.log(movieIndexTemp);
    }

    perPageChange = (e) => {
        this.setState({ perPage: e.target.value })
    }

    handlePageChange = (pageNumber) => {
        this.setState({ currentPage: pageNumber})
    }

    render() {
        let categoriesList = []
        this.state.moviesList.filter( item => { 
            if( !categoriesList.includes(item.category) ) { categoriesList.push(item.category); return false } 
        })
        let filterMoviesList = []
        let filterBC = this.state.filterByCategory
        if( filterBC.length /*!== 0*/ ) {
            // console.log(filterBC)
            filterMoviesList = this.state.moviesList.filter( item => ( filterBC.includes(item.category) ) )
            // console.log(filterMoviesList)
        } else { filterMoviesList = this.state.moviesList }
        let indexOfLast = this.state.currentPage * this.state.perPage
        let indexOfFirst = indexOfLast - this.state.perPage
        // console.log(this.state.filterByCategory)
        console.log("Page Changed : " + this.state.currentPage)
        return (
            <div className="Movies-List-Page">
                <h1>React Interview</h1>
                <div className="Container">
                    {/* <label>Filtrer par Catégorie</label>
                    <select onChange={this.handleSelect}>
                        <option value="">-- Aucun --</option>
                        { categoriesList.map( (item, index) => (
                            <option key={index}>
                                {item}
                            </option>
                        ))}
                    </select> */}
                    <div className="Filter__MultiSelect">
                        <div className="Filter__MultiSelect__Label">
                        Filtrer Par Catégorie
                        </div>
                        <div className="Filter__MultiSelect__Dropdown">
                        { categoriesList.map( (item, index) => (
                            <span key={index}>
                                <input onClick={this.handleCheckboxChange} type="checkbox" value={item} 
                                    className="filter-multi-select"/>
                                {item}
                            </span>
                        ))}
                        </div>
                    </div>
                </div>
                <div className="Container">
                    { filterMoviesList.slice(indexOfFirst, indexOfLast).map( (movie, index) => (
                        <MovieCard movie={movie} key={movie.id} onMovieDelete={this.deleteAMovie}/>
                    ))}
                </div>
                <div className="Container pt-50 justify-content-start align-items-center">
                    <div className="perPageselector">
                        <select onChange={this.perPageChange} className="pageSelect">
                            <option value={4}>4</option>
                            <option value={8}>8</option>
                            <option value={12}>12</option>
                        </select>
                    </div>
                    <Pagination
                        currentPage={this.state.currentPage}
                        itemsLength={filterMoviesList.length}
                        perPage={this.state.perPage}
                        pageChanged={this.handlePageChange} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    favoritesMovies: state.favoritesMovies,
    dislikeMovies: state.dislikeMovies,
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList)

