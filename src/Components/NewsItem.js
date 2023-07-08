import React, { Component } from 'react'

const NewsItem = (props) =>
{
    let {title,description,imageUrl,newsUrl,author,published,source} = props;
    return (
      <div>
        <div className="card">
        <div className="card-body">
        <span className="badge rounded-pill bg-primary" style={{display:'flex',justifyContent:'flex-end',position:'absolute',right:''}}>
    {source}
    <span class="visually-hidden">unread messages</span>
  </span>
        <img src={imageUrl} className="card-img-top" alt="..."/>
        <h5 className="card-title">{title}</h5>
         <p className="card-text">{description}....</p>
          <p className='card-text'><small className="text-muted">By {!author?"Unknown":author} At {new Date(published).toGMTString()}</small></p>{/* reformat the date using the date object javascript */}
          <a href={newsUrl} target="_blank"className="btn btn-sm btn-dark">Read More</a>
      </div>
      </div>
      </div>
    )
  }



export default NewsItem

