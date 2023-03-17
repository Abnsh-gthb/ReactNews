import React, { Component } from 'react'
import NewsItems from './NewsItems'
// import Loading from './loading';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";




export class News extends Component {
    static defaultProps = {
        country: "in",
        pageSize: 8,
        category: "general"
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    capitalizeFirstLetter = (str) => {

        return str = str.charAt(0).toUpperCase() + str.slice(1);

    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            page: 1,
            totalResults:0,
            
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - AppNews`
    }
    updateState = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.api}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        console.log(url);
        let data = await fetch(url);
        let parsedata = await data.json();
        this.setState({ articles: parsedata.articles,
            totalResults: parsedata.totalResults, 
        });
    }




    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.api}&page=1&pageSize=${this.props.pageSize}`;
        console.log(url);
        let data = await fetch(url);
        let parsedata = await data.json();
        this.setState({ articles: parsedata.articles, totalResults: parsedata.totalResults })
        console.log(this.props.api);
    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 });
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.api}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedata = await data.json();
        this.setState({ articles: this.state.articles.concat(parsedata.articles), totalResults: parsedata.totalResults,loader:false});
      };



    // handleprepage = async () => {

    //     // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.api}&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    //     // this.setState({loading:true});
    //     // let data=await fetch(url);
    //     // let parsedata= await data.json();
    //     // this.setState({
    //     //     page: this.state.page-1,
    //     //     articles:parsedata.articles,
    //     //     loading:false
    //     // })
    //     this.setState({ page: this.state.page - 1 })
    //     this.updateState();
    // }
    // handlenxtpage = async () => {
    //     // if(!(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize))){

    //     // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.api}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //     // this.setState({loading:true});
    //     // let data=await fetch(url);
    //     // let parsedata= await data.json();

    //     // this.setState({
    //     //     page: this.state.page + 1,
    //     //     articles:parsedata.articles,
    //     //     loading:false
    //     // })
    //     // this.setState({});
    //     // }
    //     this.setState({ page: this.state.page + 1 })
    //     this.updateState();
    // }

    render() {
        return (
            <>
                <h2>AppNews-Top <span style={{ color: "blue" }}>{this.capitalizeFirstLetter(this.props.category)}</span> Headlines  </h2>
                {/* {this.state.loading && <Loading/>} */}
               
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.totalResults}
                    // loader= {<Loading/>}
                    loader= {<h4>Loading...</h4>}
                >
                    <div className="container my-5">
                    <div className="row d-flex mt-5" style={{ justifyContent: "space-around" }} >
                        {this.state.articles.map((element) => {
                            return <div className="col-md-3 m-2" key={element.url}>
                                <NewsItems title={element.title ? element.title.slice(0, 25) : ""} description={element.description ? element.description.slice(0, 80) : ""} imgurl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                    </div>
                    </InfiniteScroll>
                    {/* <div className="container d-flex justify-content-between">
                        <button disabled={this.state.page <= 1} className="btn btn-sm btn-dark" onClick={this.handleprepage}>&#60; Previous</button>
                        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-sm btn-dark" onClick={this.handlenxtpage}>Next &#62;</button>
                    </div> */}
            </>
        )
    }
}

export default News;
