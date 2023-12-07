import ReactDOM from "react-dom/client";
import "./styles/tailwind.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./theme/global.scss";
import "react-tooltip/dist/react-tooltip.css";
import "react-notifications/lib/notifications.css";
import { Provider } from "react-redux";
import { store } from "./store";

const Moralis = require("moralis").default;

const express = require("express");
const cors = require("cors");

const { EvmChain } = require("@moralisweb3/common-evm-utils");

const app = express();
const port = 4000;

// allow access to React app domain
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const MORALIS_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjFjMjJkMGZjLThiODMtNDg5Ny1iNjRkLWJjMDhlYzQzZDJmYiIsIm9yZ0lkIjoiMzQ4NDI4IiwidXNlcklkIjoiMzU4MTQxIiwidHlwZUlkIjoiNjVhYTEyMWMtOTY5ZS00MGIxLTkwNmQtZGYzYmVmMTYzZTY0IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2ODk0Nzg1NTksImV4cCI6NDg0NTIzODU1OX0.6PnPHV5wcqt6X0kHj5JR7WVHRoRwK3iL0OgzAzNt59Q";
const address = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d";

app.get("/balances", async (req: any, res: {
    status: (arg0: number) => {
      (): any; new(): any; json: {
        (arg0: {
          // formatting the output
          address: string; nativeBalance: any; tokenBalances: any;
        }): void; new(): any;
      };
    }; json: (arg0: { EvalError: EvalErrorConstructor; }) => void;
  }) => {
  try {
    // Promise.all() for receiving data async from two endpoints
    const [nativeBalance, tokenBalances] = await Promise.all([
      Moralis.EvmApi.balance.getNativeBalance({
        chain: EvmChain.ETHEREUM,
        address,
      }),
      Moralis.EvmApi.token.getWalletTokenBalances({
        chain: EvmChain.ETHEREUM,
        address,
      }),
    ]);
    res.status(200).json({
      // formatting the output
      address,
      nativeBalance: nativeBalance.result.balance.ether,
      tokenBalances: tokenBalances.result.map((token: { display: () => any; }) => token.display()),
    });
  } catch (error) {
    // Handle errors
    console.error((error as Error).message);
    res.status(500);
    res.json({EvalError});
  }
});

const startServer = async () => {
  await Moralis.start({
    apiKey: MORALIS_API_KEY,
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

startServer();
ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
