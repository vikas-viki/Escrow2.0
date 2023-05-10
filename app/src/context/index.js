import React, { useContext, createContext, useState, useEffect } from "react";
import { ethers } from "ethers";

import EscrowFactory from '../artifacts/contracts/Escrow.sol/EscrowFactory.json';

const factoryABI = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "creator",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "_title",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "_description",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_amountInUsd",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "_image",
                "type": "string"
            }
        ],
        "name": "newEscrow",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "getListings",
        "outputs": [
            {
                "internalType": "contract Escrow[]",
                "name": "",
                "type": "address[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "listings",
        "outputs": [
            {
                "internalType": "contract Escrow",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_title",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_description",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_amountInUsd",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_image",
                "type": "string"
            }
        ],
        "name": "newListing",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "noOfListings",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];
const StateContext = createContext();

const Caddress = "0x800184678d0A0dc69FdCEc89F881ae8dABD94e91";

export const StateContextProvider = ({ children }) => {
    const [address, setAddress] = useState("");
    const [contract, setContract] = useState();
    const [listings, setListings] = useState([]);

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

            const signer = await provider.getSigner();
            const network = await signer.provider._detectNetwork();

            if (Number(network.chainId) === 11155111) {
                await setAddress(signer.address);

                const contract_factory = new ethers.Contract(Caddress, factoryABI, signer);
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

    const getListings = async () => {
        if (contract) {
            try {
                const current_listings = await contract.getListings();
                
                current_listings.map(el => (
                    el
                ));
                setListings(current_listings);
            } catch (error) {
                console.log(error);
            }
        }
    }


    const createNewList = async () => {
        if (contract) {
            const newListing = await contract.newListing("title", "description", 100, "Image");
            console.log(newListing);
        }
    }

    const getListDetails = async () => {
        console.log("getListDetails");
    }

    const buyListing = async () => {
        console.log("buyListing");
    }

    const approveListing = async () => {
        console.log("approveListing");
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
                buyListing
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
