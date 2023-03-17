import React, { Component } from 'react';

export class NewsItems extends Component {

    render() {
        let { title, description, imgurl, newsUrl, author, date,source } = this.props;
        return (
            <div>
                <div className="card" style={{ width: "22rem", maxHeight: "400px" }}>
                    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-warning" style={{right:"1%", top:"45%"}}>
                        {source}
                        <span className="visually-hidden"></span>
                    </span>
                    <img className="card-img-top" src={imgurl ? imgurl : "https://gumlet.assettype.com/bloombergquint%2F2022-10%2F9d28646d-50e5-4fed-beac-1ab5a54f7451%2FNestle_range_of_products___Source_Company_website_.png?rect=231%2C0%2C789%2C414&w=1200&auto=format%2Ccompress&ogImage=true"} alt="Card image cap" style={{ height: "180px", objectFit: "cover" }} />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-danger">By {author ? author : "Unknown"} on {!date ? "---" : new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Click Here For Full News</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItems



// 431f94642d6d438595ef52ea7f60857c
// 3129e28ca58d4fe3865eccfe1ea62632