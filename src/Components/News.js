import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Spinner } from './Spinner';
export default class News extends Component {


  //now we will create an endpoint and will fetch the news using the api
 //this is bascially a non blocking architecture it will not wait for the other to complete but will run simultaneously
 //let parsedData = await data.json(); gives us the parsed data
 //resolved the content i.e parses the string the it is converted to json(java script object) stringfy basically creates a java script string from an object or an array
 //execute the react code when the component is already placed in the dom it makes sense first the cards are placed in dom we fetch the data after it and it populates the card with the data
   async componentDidMount() 
  {
this.updateNews();
  }

  static defaultProps = 
  {
    country:'in',
    category:'general'
  }
  static propTypes=
  {
    country:PropTypes.string,
    pageSize:PropTypes.string
  }
  capitalize = (string)=>
  {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props)
  {
    super(props);
    this.state = {
      articles:[],
      loading:false,
      page:1,
    } 
    //this.state is basically used to set state it is different that useState hook
    document.title = `News Crunch - ${this.capitalize(this.props.category)}`
  }

  async updateNews()
  {
    this.props.setProgress(10)
    let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=20`
    let data = await fetch(url);
    this.props.setProgress(30)
    let parsedData = await data.json();
    this.props.setProgress(50)
    this.setState(
        {
          articles:parsedData.articles,
          loading:false,
          totalRes:parsedData.totalResults
        }
      )
      this.props.setProgress(100)
  }
  

  handlePrevClick = async () =>
  {
    //  let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page - 1}&pageSize=20`
    // let data = await fetch(url);
    // let parsedData = await data.json();
    //   console.log("Next")
    //   this.setState(
    //     {
    //       page:this.state.page-1,
    //       articles:parsedData.articles,
          
    //     }
    //   )
    this.setState({page:this.state.page-1})
    this.updateNews();
  }
  handleNextClick = async () =>
  {
  console.log(this.state.totalRes)
   if(this.state.page+1>(Math.ceil(this.state.totalRes/20)))
   {
         
   }
   else{
    // console.log('else')
    // let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=20`
    // let data = await fetch(url);
    // let parsedData = await data.json();
    //   console.log("Next")
    //   this.setState(
    //     {
    //       page:this.state.page+1,
    //       articles:parsedData.articles
    //     }
    //   )
    this.setState({page:this.state.page+1})
    this.updateNews();

      }
  }

  fetchMoreData = async () =>
  {
    this.setState({page:this.state.page + 1})
    let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=20`
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState(
        {
          articles:parsedData.articles.concat(parsedData.articles), //articles array is basically the amoint of articles we have on the page hence when the next page is demanded we concatinate the articles trigring more cards cr
          loading:false,
          totalRes:parsedData.totalResults //gives the total results
        }
      )
  };

  render() {
    console.log("render")
    return (
      <>
      <h1 className='text-center' style={{margin:'35px 0px'}}>Top Headlines - {this.capitalize(this.props.category)}</h1>
        <InfiniteScroll
        dataLength={this.state.articles.length}
        next={this.fetchMoreData}
        
        hasMore={!this.state.loading && this.state.articles.length < this.state.totalRes}
        loader={<Spinner/>}
        >
        {console.log(this.state.articles.length<this.state.totalRes)}
      <div className='container my-3'>
        <div className="row"> {/*give a key when you use map to the element you are returning*/}
        {this.state.articles.map((element)=>{
          return <div className="col-md-3" key={element.id}>
          <NewsItem title={element.title?element.title.slice(0,45):" "}  description={element.description?element.description.slice(0,88):" "} imageUrl={!element.urlToImage?'React\newsapp\src\assets\no-image-icon-23494.png':element.urlToImage} newsUrl={element.url} author={element.author} published={element.publishedAt} source={element.source.name}/>
          </div>
        })}  
          </div>
          </div>
          </InfiniteScroll>
          {/* <div className="d-flex justify-content-between">
          <button disabled={this.state.page<=1} className="btn btn-dark"  type="button" onClick={this.handlePrevClick}>Previous &#8592;</button>
          <button className="btn btn-dark" type="button" onClick={this.handleNextClick} >Next &#8594;</button>
          </div> */}
          </>
    )
  }
}
