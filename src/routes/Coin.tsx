import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { Switch, Route, useRouteMatch,} from "react-router";
import Chart from "./Chart";
import Price from "./Price";
import { fetchCoininfo, fetchCoinTickers } from "../api";
import { useQuery } from "react-query";
interface RouterParmas  {
    coinId:string;
}


interface InfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
  }
  
  interface PriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
      USD: {
        ath_date: string;
        ath_price: number;
        market_cap: number;
        market_cap_change_24h: number;
        percent_change_1h: number;
        percent_change_1y: number;
        percent_change_6h: number;
        percent_change_7d: number;
        percent_change_12h: number;
        percent_change_15m: number;
        percent_change_24h: number;
        percent_change_30d: number;
        percent_change_30m: number;
        percent_from_price_ath: number;
        price: number;
        volume_24h: number;
        volume_24h_change_24h: number;
      };
    };
  }
  const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;
const Title = styled.h1`
    color :${prpos=>prpos.theme.accentColor};

`
const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  min-width: 480px;
  margin: 0 auto;

`
const Header = styled.header`
    display:flex;
    font-size:48px;
    height:10vh;
    align-items: center;
    justify-content:center;
`
const CoinList = styled.ul`
    justify-content:center;
    align-items: center;

`
const Backbutton = styled.span`
  background-color: ${props=>props.theme.textColor};
  color:${props=>props.theme.bgColor};
  font-size: 20px;
  
`

const Loding = styled.div`
    align-items:center;
    text-align:center;
    color: ${prpos=>prpos.theme.accentColor};

`

const CoinWraper = styled.span`

    
`

const Img = styled.img`
    width : 35px;
    height: 35px;
    margin-right: 10px;

`

const Tabs = styled.div`
  display:flex;
  justify-content:space-between;
  margin: 20px 0;
`
const Tab = styled.div<{isActive:boolean}>`
  text-align: center;
  padding: 7px 0;
  width:200px;


  border-radius: 10px;
  background-color: #181C20;

 
  a{
    display:block;
    color : ${props=>props.isActive ? props.theme.accentColor : props.theme.textColor}
  }
  
`
interface Location {
    name:string
}



const Coin = () =>{

    // const [info, setInfo] = useState<InfoData>();
    // const [priceInfo, setPriceInfo] = useState<PriceData>();
    const {coinId} = useParams<RouterParmas>()
    // const [loding, setLoding] = useState(true);
    const {state} = useLocation<Location>()
    const priceMatch = useRouteMatch(`/:${coinId}/price`);
    const chartMatch = useRouteMatch(`/:${coinId}/chart`);


    // useEffect(()=>{
    //     (async()=>{
    //         const infoData = await(await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json()
    //         const priceData= await(await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json()
    //         setInfo(infoData)
    //         setPriceInfo(priceData)
    //         setLoding(false)


    //     })();
    // },[coinId])
    
    const {isLoading:infoLoading,data:infoData} = useQuery<InfoData>(["inifo",coinId],()=>fetchCoininfo(coinId))
    const {isLoading:priceLoading,data:tikersData} = useQuery<PriceData>(["price",coinId],()=>fetchCoinTickers(coinId))

    console.log(tikersData)
    return(
        <Container>
        <Header>
        <Backbutton>
          <Link to = {
              {pathname:"/"}
          }>Back</Link>
        </Backbutton>
            <Title>{state?.name || infoData?.name}</Title>
        </Header>
      
        
        {infoLoading && priceLoading? (
        <Loding>Loading...</Loding>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Open Source:</span>
              <span>{infoData?.open_source ? "Yes" : "No"}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tikersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tikersData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={chartMatch!==null} >  <Link to={`/${coinId}/chart`}>Chart</Link></Tab>
            <Tab isActive={priceMatch!==null}>  <Link to={`/${coinId}/price`}>Price</Link> </Tab>        
          </Tabs>
          <Switch>
            <Route path={`/${coinId}/price`}>
                 <Price/>
            </Route>
            <Route path={`/${coinId}/chart`}>
            
                <Chart coinId={coinId}></Chart>
            </Route>
          </Switch>
        </>
      )}
    </Container>

);
    };
export default Coin;