import React from 'react';
import './List.css';
import Table from './Table';
import Pagination from './Pagination';


class List extends React.Component{
    constructor(){
        super();

        this.state = {
            loading: false,
            currencies: [],
            error: false,
            page: 0,
            limit: 10,
        };
    }
    componentDidMount(){
        this.loadCoins();
    }

    loadCoins(){
        this.setState({loading: true});

        const { page, limit } = this.state;

        fetch(`https://min-api.cryptocompare.com/data/top/totalvolfull?limit=${limit}&tsym=USD&page=${page}`)
        .then(response => {
            //Error handling
            return response.json().then(json => {
                return response.ok ? json : Promise.reject(json);
            });
        }).then((data) => {
            this.setState({currencies: data.Data, loading: false});
        })
        .catch((error) => {
            this.setState({error: error, loading: false})
        });

    }

    changePercentColour(percent){
        if (percent > 0) {
            return <span style = {{color:'green'}} className ="pecent-raised">{percent}% </span>
        } else if (percent < 0){
            return <span style = {{color:'red'}} className = "percent-fallen">{percent}%</span>
        } else {
            return <span>{percent}</span>
        }
    }

    buttonClick = (direction) =>{
        let nextPage = this.state.page;


        if(direction === 'next'){
            nextPage = nextPage + 1;
            console.log(nextPage);
        } else {
            nextPage = nextPage - 1;
            console.log(nextPage);
        }

        this.setState({page : nextPage}, () => {
            this.loadCoins();
        });


    }

    render(){
        const {loading, currencies, page} = this.state;

        return(
            <div>
           <Table currencies={currencies}
           changePercentColour = {this.changePercentColour}
           />
           <Pagination page = {page} buttonClick={this.buttonClick}/>
           </div>
        );
    }
}

export default List;