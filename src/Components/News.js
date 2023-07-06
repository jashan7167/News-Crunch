import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'

export default class News extends Component {


  //now we will create an endpoint and will fetch the news using the api
 //this is bascially a non blocking architecture it will not wait for the other to complete but will run simultaneously
   async componentDidMount() //execute the react code when the component is already placed in the dom it makes sense first the cards are placed in dom we fetch the data after it and it populates the card with the data
  {
  console.log('cdm');
  let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c266efc82fdb447284515a5ec97334f0&page=1&pageSize=20`
  let data = await fetch(url);
  let parsedData = await data.json(); //gives us the parsed data
  console.log(parsedData); //resolved the content i.e parses the string the it is converted to json(java script object) stringfy basically creates a java script string from an object or an array
  this.setState({
    articles: parsedData.articles,
    totalRes:parsedData.totalResults
    
  });
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
  constructor()
  {
    super();
    this.state = {
      articles:[],
      loading:false,
      page:1,
      totalRes:0
    } //this.state is basically used to set state it is different that useState hook
  }

  handlePrevClick = async () =>
  {
     let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c266efc82fdb447284515a5ec97334f0&page=${this.state.page - 1}&pageSize=20`
    let data = await fetch(url);
    let parsedData = await data.json();
      console.log("Next")
      this.setState(
        {
          page:this.state.page-1,
          articles:parsedData.articles,
          
        }
      )

  }
  handleNextClick = async () =>
  {
  console.log(this.state.totalRes)
   if(this.state.page+1>(Math.ceil(this.state.totalRes/20)))
   {
         
   }
   else{
    console.log('else')
    let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=c266efc82fdb447284515a5ec97334f0&page=${this.state.page + 1}&pageSize=20`
    let data = await fetch(url);
    let parsedData = await data.json();
      console.log("Next")
      this.setState(
        {
          page:this.state.page+1,
          articles:parsedData.articles
        }
      )
      }
  }

  render() {
    console.log("render")
    return (
      <div className='container my-3'>
        <h1 className='text-center' style={{margin:'35px 0px'}}>News Crunch- Top Headlines</h1>
        <div className="row"> {/*give a key when you use map to the element you are returning*/}
        {this.state.articles.map((element)=>{
          return <div className="col-md-3" key={element.url}>
          <NewsItem title={element.title?element.title.slice(0,45):" "}  description={element.description?element.description.slice(0,88):" "} imageUrl={!element.urlToImage?'React\newsapp\src\assets\no-image-icon-23494.png':element.urlToImage} newsUrl={element.url} author={element.author} published={element.publishedAt}/>
          </div>
        })}  
          </div>
          <div className="d-flex justify-content-between">
          <button disabled={this.state.page<=1} className="btn btn-dark"  type="button" onClick={this.handlePrevClick}>Previous &#8592;</button>
          <button className="btn btn-dark" type="button" onClick={this.handleNextClick} >Next &#8594;</button>
          </div>
        </div>
    )
  }
}
