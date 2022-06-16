import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { join } from 'path/posix'
import { useQuery } from 'react-query'
import { fetchCoins } from '../api'
const Title = styled.h1`
  color: ${prpos => prpos.theme.accentColor};
`
const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`
const Header = styled.header`
  display: flex;
  font-size: 48px;
  height: 10vh;
  align-items: center;
  justify-content: center;
`
const CoinList = styled.ul`
  justify-content: center;
  align-items: center;
`
const Coin = styled.li`
  background-color: white;
  color: ${props => props.theme.bgColor};
  margin-bottom: 20px;
  border-radius: 15px;

  a {
    padding: 20px;
    display: flex;
    align-items: center;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${props => props.theme.accentColor};
    }
  }
`
const Loding = styled.div`
  align-items: center;
  text-align: center;
  color: ${prpos => prpos.theme.accentColor};
`

const CoinWraper = styled.span``

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`
// const coins = [
//     {
//         id: "btc-bitcoin",
//         name: "Bitcoin",
//         symbol: "BTC",
//         rank: 1,
//         is_new: false,
//         is_active: true,
//         type: "coin",
//         },
//         {
//         id: "eth-ethereum",
//         name: "Ethereum",
//         symbol: "ETH",
//         rank: 2,
//         is_new: false,
//         is_active: true,
//         type: "coin",
//         },
//         {
//         id: "hex-hex",
//         name: "HEX",
//         symbol: "HEX",
//         rank: 3,
//         is_new: false,
//         is_active: true,
//         type: "token",
//         },
// ]
interface ICoin {
  id: string
  name: string
  symbol: string
  rank: number
  is_new: boolean
  is_active: boolean
  type: string
}

const Coins = () => {
  const { isLoading, data } = useQuery<ICoin[]>('allCoins', fetchCoins)
  // const [coins,setCoins] = useState<CoinInterface[]>([]);
  // const [loding, setLoding] = useState(true)
  // useEffect(()=>{
  //     (async()=>{
  //         const response = await fetch("https://api.coinpaprika.com/v1/coins");
  //         const json = await response.json()
  //         setCoins(json.slice(0,100))
  //         setLoding(false)
  //     })();
  // },[]);
  return (
    <Container>
      <Header>
        <Title>코인</Title>
      </Header>

      {isLoading ? (
        <Loding> loading... </Loding>
      ) : (
        <CoinList>
          {data?.slice(1, 100).map(coin => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: {
                    name: coin.name,
                  },
                }}
              >
                <Img
                  src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                />
                {coin.name}
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  )
}
export default Coins
