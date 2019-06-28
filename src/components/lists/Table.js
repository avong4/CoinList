import React from 'react';
import { withRouter } from 'react-router-dom';
import './List.css';

const Table = (props) => {
    const { currencies, changePercentColour, history} = props;
    return(
        <div className ="Table-container"> 
        <table className = "Table">
            <thead className="Table-head">
                <tr>
                    <th style = {{width: '5%', textAlign: "left", justifyContent: "left", paddingLeft: '10px'}}>Cryptocurrency</th>
                    <th style = {{width: '5%', textAlign: "right", justifyContent: "right"}}>Price (USD)</th>
                    <th style = {{width: '5%', textAlign: "right", justifyContent: "right"}}>Market Cap</th>
                    <th style = {{width: '5%', textAlign: "right", justifyContent: "right"}}>24H Change</th>
                    <th style = {{width: '5%', textAlign: "right", justifyContent: "right"}}>24H High</th>
                    <th style = {{width: '5%', textAlign: "right", justifyContent: "right"}}>24H Low</th>
                    <th style = {{width: '5%', textAlign: "right", justifyContent: "right", paddingRight: '10px'}}>24H Volume</th>
                </tr>
                </thead>
                <tbody className ="Table-body">
                {currencies.map((currency) => (
                    <tr key={currency.CoinInfo.Name}
                        onClick={() => history.push(`/currency/${currency.CoinInfo.Name}`)}>
                        <td  style = {{width: '5%', textAlign: "left", justifyContent: "left", paddingLeft: '10px'}}>
                            <span className="Table"><p>{currency.CoinInfo.FullName}</p></span>
                        </td>
                        <td  style = {{width: '5%', textAlign: "right", justifyContent: "right"}}>
                            <span className="Table-dollar"></span>{currency.DISPLAY.USD.PRICE}
                        </td>
                        <td  style = {{width: '5%', textAlign: "right", justifyContent: "right"}}>
                            <span className="Table-dollar">{currency.DISPLAY.USD.MKTCAP}</span>
                        </td>
                        <td  style = {{width: '5%', textAlign: "right", justifyContent: "right"}}>
                            <span className="Table-dollar">{currency.DISPLAY.USD.CHANGE24HOUR} 
                            <br/>
                            {changePercentColour(currency.DISPLAY.USD.CHANGEPCT24HOUR)}</span>
                        </td>
                        <td  style = {{width: '5%', textAlign: "right", justifyContent: "right"}}>
                            <span className="Table-dollar">{currency.DISPLAY.USD.HIGH24HOUR}</span>
                        </td>
                        <td style = {{width: '5%', textAlign: "right", justifyContent: "right"}}>
                            <span className="Table-dollar">{currency.DISPLAY.USD.LOW24HOUR}</span>
                        </td>
                        <td style = {{width: '5%', textAlign: "right", justifyContent: "right", paddingRight: '10px'}}>
                            <span className="Table-dollar">{currency.DISPLAY.USD.VOLUME24HOURTO}</span>
                        </td>
                    </tr>
                ))}
                </tbody>
        </table>
    </div>
    );
}

export default withRouter(Table);