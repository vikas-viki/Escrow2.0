import React, { useContext, createContext, useState, useEffect } from "react";
import { ethers } from "ethers";

import EscrowFactory from '../artifacts/contracts/Escrow.sol/EscrowFactory.json';
import Escrow from "../artifacts/contracts/Escrow.sol/Escrow.json";
const StateContext = createContext();

const Caddress = "0x800184678d0A0dc69FdCEc89F881ae8dABD94e91";

export const StateContextProvider = ({ children }) => {
    // connected user products.
    const [address, setAddress] = useState("");
    // Factory contract.
    const [contract, setContract] = useState();
    const [listings, setListings] = useState([]);
    const [signer, setSigner] = useState({});
    const [userBroughtProducts, setUserBroughtProducts] = useState([]);
    const [userListedProducts, setUserListedProducts] = useState([]);
    const [arbiterProducts, setArbiterProducts] = useState([]);

    // To connect user to dapp.
    const connect = async () => {
        // Check if the browser has MetaMask installed
        if (typeof window.ethereum === "undefined") {
            alert("Please install MetaMask first.");
            return;
        }

        try {
            const provider = new ethers.BrowserProvider(
                window.ethereum
            );
            await provider.send("eth_requestAccounts");

            const _signer = await provider.getSigner();
            const network = await _signer.provider._detectNetwork();
            await setSigner(_signer);
            await setAddress(signer.address);
            if (Number(network.chainId) === 11155111 && signer) {

                const contract_factory = new ethers.Contract(Caddress, EscrowFactory.abi, signer);
                await setContract(contract_factory);
            } else {
                alert("Please connect to sepolia netwrork");
                window.location.reload();
            }
        } catch (error) {
            alert(error.message);
        }
        console.log(address, contract);
    };

    // Returns listings which haven't brought yet.
    const getListings = async () => {
        if (contract && signer.address) {
            try {
                const current_listings = await contract.getListings();
                var listingarr = [];
                current_listings.map(async el => {
                    let curr_contract = new ethers.Contract(el, Escrow.abi, signer);
                    const bought = await curr_contract.bought();
                    if (bought === false) {
                        listingarr.push(curr_contract);
                    }
                    return el;
                });
                setListings(listingarr);
                console.log("Listings: ", listingarr);
            } catch (error) {
                console.log(error);
            }
        }
    }

    // To get the connected user buyings.
    const getuserBoughtProducts = async ()=>{
        if (contract) {
            try {
                const current_listings = await contract.getListings();
                var listingarr = [];
                current_listings.map(async el => {
                    let curr_contract = new ethers.Contract(el, Escrow.abi, signer);
                    const buyer = await curr_contract.buyer();
                    if (buyer === signer.address) {
                        listingarr.push(curr_contract);
                    }
                    return el;
                });
                setUserBroughtProducts(listingarr);
                console.log(listingarr);
            } catch (error) {
                console.log(error);
            }
        }
    }

    // To get the connected user listings.
    const getuserListedProducts = async ()=>{
        if (contract) {
            try {
                const current_listings = await contract.getListings();
                var listingarr = [];
                current_listings.map(async el => {
                    let curr_contract = new ethers.Contract(el, Escrow.abi, signer);
                    const seller = await curr_contract.beneficiary();
                    if (seller === signer.address) {
                        listingarr.push(curr_contract);
                    }
                    return el;
                });
                setUserListedProducts(listingarr);
                console.log(listingarr);
            } catch (error) {
                console.log(error);
            }
        }
    }

    // To get the connected arbiter products (to be approved).
    const getArbiterProducts = async ()=>{
        if (contract) {
            try {
                const current_listings = await contract.getListings();
                var listingarr = [];
                current_listings.map(async el => {
                    let curr_contract = new ethers.Contract(el, Escrow.abi, signer);
                    const arbiter = await curr_contract.arbiter();
                    if (arbiter === signer.address) {
                        listingarr.push(curr_contract);
                    }
                    return el;
                });
                setArbiterProducts(listingarr);
                console.log(listingarr);
            } catch (error) {
                console.log(error);
            }
        }
    }

    // For creating a new listing.
    const createNewList = async () => {
        if (contract) {
            const newListing = await contract.newListing("title", "description", 100, "Image");
            console.log(newListing);
        }
    }

    // for just getting the details of a contract (not state update).
    const getListDetails = async (_contract) => {
        if (_contract) {
            try {
                const amount = await _contract.amountInUsd();
                const bought = await _contract.bought();
                const seller = await _contract.beneficiary();
                const title = await _contract.title();
                const description = await _contract.description();
                const image = await _contract.image();
                return [amount, title, description, image, bought, seller];

            } catch (error) {
                console.log(error);
            }
        }
    }

    // to buy the specific listed product (not state update).
    const buyListing = async (_contract, _arbiter) => {
        if (_arbiter && _contract) {
            try {
                await _contract.buy(_arbiter);
                await getListings();
            } catch (error) {
                console.log(error);
            }
        }
    }

    // for just approving the buy (not state update).
    const approveListing = async (_contract, value) => {
        if (_contract && (value === true || value === false)) {
            try {
                const arbiter = await _contract.arbiter();
                const approved = await _contract.isApproved();
                if (arbiter === signer.address && approved === false) {
                    await _contract.approve(value);
                } else {
                    alert('Only inspector set by buyer can approve');
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
    return (
        <StateContext.Provider
            value={{
                address,
                contract,
                connect,
                setAddress,
                createNewList,
                getListings,
                listings,
                getListDetails,
                approveListing,
                buyListing,
                getuserBoughtProducts,
                getuserListedProducts,
                getArbiterProducts,
                userBroughtProducts,
                userListedProducts,
                arbiterProducts
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
