import React, { Component } from 'react'

//4de89ce4860e4116abc0700fbfe460a5 -- API key
//btn-sm class se button thoda chota ho jata hai
export class NewsItem extends Component {
  render() {
    let {title, description, imageUrl ,newsUrl, author,date, source}=this.props;
    return (
      <div className='my-2'>
        <div className="card">
          <div style={{display:"flex", justifyContent:"flex-end",position:"absolute", right:"0" }}>
          <span className="badge rounded-pill bg-danger">{source}</span>
          </div>
          <img src={!imageUrl ? "https://techcrunch.com/wp-content/uploads/2023/07/GettyImages-942480316.jpg?resize=1200,835" : imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">{title}...</h5>
              <p className="card-text">{description}...</p>
              <p className='card-text'><small className='text-muted'>By {!author? "unknown": author} on {new Date(date).toDateString()}</small></p>
              <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
