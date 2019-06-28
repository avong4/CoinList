import React from 'react';
import './Card.css';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'


class Card extends React.Component{
    constructor(){
        super();

        this.state = {
            currency: {},
            loading: false,
            error: null,
            highData: [],
            news: [],
            lowData: [],
            limit: 100,
            // Fix nested state..
            options: {
                title: {
                    text: ''
                },
                series:[{
                    name: "Price (USD)",
                    data: []
                }]
            }
        }
    }

    getHigh(){
        const currencyName = this.props.match.params.Name;

        fetch(`https://min-api.cryptocompare.com/data/histoday?fsym=${currencyName}&tsym=USD&limit=${this.state.limit}`)
        .then(response => {
            //Error handling
            return response.json().then(json => {
                return response.ok ? json : Promise.reject(json);
            });
        }).then((highPrice) => {
            let result = highPrice.Data.map(a => a.high);
            console.log(result);
            this.setState({options: {
                title: {
                    text: `Price of ${this.props.match.params.Name} over last ${this.state.limit} days.` 
                },
                series:[{
                    data: result
                }]
            }

            });
        }).catch((error) => {
            console.log(error);
        })
    }

    getLow(){
        const currencyName = this.props.match.params.Name;

        fetch(`https://min-api.cryptocompare.com/data/histoday?fsym=${currencyName}&tsym=USD&limit=${this.state.limit}`)
        .then(response => {
            //Error handling
            return response.json().then(json => {
                return response.ok ? json : Promise.reject(json);
            });
        }).then((lowPrice) => {
            let result = lowPrice.Data.map(a => a.low);
            this.setState({lowData: lowPrice});

        }).catch((error) => {
            console.log(error);
        })

    }
    
    getNews(){
        const currencyname = this.props.match.params.Name;

        fetch(`https://min-api.cryptocompare.com/data/v2/news/?categories=${currencyname}`).then(response =>{
            return response.json().then(json => {
                return response.ok ? json : Promise.reject(json);
            });
        }).then((newsFeed) => {
            console.log('heck', newsFeed);
            this.setState({news: newsFeed.Data.slice(0, 34), loading: false});
    
        }).catch((error) => {
            this.setState({error: error, loading: false})
        });
    }C

    componentDidMount(){

        this.getHigh();
        this.getLow();
        this.getNews();
    }

    render(){
        const renderedList = this.state.news.map((newsItem) => {
            return(
                <div className = "newsItem" onClick = {() => window.open(`${newsItem.url}`, "_blank")}>{newsItem.title}</div>
            );
        })
        return(
            <div className = "detail-container">
                <div id = "chart-container">
                    <HighchartsReact highcharts = {Highcharts}
                    options= {this.state.options} />
                </div>
                <div id = "news-container">
                    {renderedList}
                </div>
                <div id = "stats-container">
                    {renderedList}
                </div>
            </div>

        );
    }
}

export default Card;