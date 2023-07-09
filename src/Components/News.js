import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./Spinner";
const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
 
  //now we will create an endpoint and will fetch the news using the api
  //this is bascially a non blocking architecture it will not wait for the other to complete but will run simultaneously
  //let parsedData = await data.json(); gives us the parsed data
  //resolved the content i.e parses the string the it is converted to json(java script object) stringfy basically creates a java script string from an object or an array
  //execute the react code when the component is already placed in the dom it makes sense first the cards are placed in dom we fetch the data after it and it populates the card with the data

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=20`;
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(50);
    setArticles(parsedData.articles);
    setLoading(false);
    setTotalResults(parsedData.totalResults);
    props.setProgress(100);
  };
  useEffect(() => {
    document.title = `News Crunch - ${capitalize(props.category)}`
    updateNews();
    // eslint-disable-next-line
  }, []);

  const handlePrevClick = async () => {
    //  let url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page - 1}&pageSize=20`
    // let data = await fetch(url);
    // let parsedData = await data.json();
    //   console.log("Next")
    //   setState(
    //     {
    //       page:page-1,
    //       articles:parsedData.articles,

    //     }
    //   )

    setPage(page - 1);
    updateNews();
  };
  const handleNextClick = async () => {
    if (page + 1 > Math.ceil(totalResults / 20)) {
    } else {
      // console.log('else')
      // let url =`https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=20`
      // let data = await fetch(url);
      // let parsedData = await data.json();
      //   console.log("Next")
      //   setState(
      //     {
      //       page:page+1,
      //       articles:parsedData.articles
      //     }
      //   )
      setPage(page + 1);
      updateNews();
    }
  };

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      // Fetch the data using the updated page value
      props.country
    }&category=${props.category}&apiKey=${props.apiKey}&page=${
      page + 1
    }&pageSize=20`;
    setPage((prevPage) => prevPage + 1); // Use callback to get the updated page value
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles((prevArticles) => prevArticles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };

  return (
    <>
      <h1 className="text-center" style={{ margin: "9px 0px", }}>
        Top Headlines - {capitalize(props.category)}
      </h1>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
      >
        {console.log(articles.length < totalResults)}
        <div className="container my-3">
          <div className="row">
            {" "}
            {/*give a key when you use map to the element you are returning*/}
            {articles.map((element) => {
              return (
                <div className="col-md-3" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : " "}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : " "
                    }
                    imageUrl={
                      !element.urlToImage
                        ? "React\newsappsrcassets\no-image-icon-23494.png"
                        : element.urlToImage
                    }
                    newsUrl={element.url}
                    author={element.author}
                    published={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
      {/* <div className="d-flex justify-content-between">
          <button disabled={page<=1} className="btn btn-dark"  type="button" onClick={handlePrevClick}>Previous &#8592;</button>
          <button className="btn btn-dark" type="button" onClick={handleNextClick} >Next &#8594;</button>
          </div> */}
    </>
  );
};

News.defaultProps = {
  country: "in",
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.string,
  category: PropTypes.string,
};

export default News;
