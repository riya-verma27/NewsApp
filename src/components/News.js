import React, { Component } from 'react'
import NewsItem from './NewsItem'
import SpinnerTemp from './SpinnerTemp';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

// col-md-4 mtlb medium devices me ye 3 columns le lega , 12 columns ki grid hoti hai bootsrap me toh usme se ye 4 
// columns le lega
export class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 20,
    category: "general"
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    }
    document.title = `${this.capitalize(this.props.category)}-NewsMonkey`;
  }

  fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/everything?q=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    //console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData?.articles),
      totalResults: parsedData.totalResults,
      page: this.state.page + 1,
      loading: false
    });
  }

  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/everything?q=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parsedData?.articles,
      totalResults: parsedData.totalResults,
      loading: false
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  render() {
    return (
      <>
        <h2 className="text-center my-2">NewsMonkey-Top {this.capitalize(this.props.category)} Headlines</h2>
        {this.state.loading && <SpinnerTemp />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<SpinnerTemp />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.length === 0 && !this.state.loading && (
                <h4 className="text-center">No articles found</h4>
              )}
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element?.title ? element.title.slice(0, 60) : ""}
                      description={element?.description ? element.description.slice(0, 88) : ""}
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/*<div className="container d-flex justify-content-between">
          <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrevClick}> ←Previous</button>
          <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next→</button>
        </div>*/}
      </>
    )
  }
}

export default News
