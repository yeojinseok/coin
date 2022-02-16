import { BrowserRouter, Switch, Route} from "react-router-dom";
import Coins from "./Coins";
import Coin from "./Coin";

const Router = () =>{
    return <BrowserRouter>
        <Switch>
            <Route path="/:coinId">
                <Coin></Coin>
            </Route>
            <Route path="/">
                <Coins></Coins>
            </Route>
            
        </Switch>
    
    </BrowserRouter>
}

export default Router;