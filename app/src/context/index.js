import React, { useContext, createContext, useState, useEffect } from "react";
import { ethers } from "ethers";

import EscrowFactory from '../artifacts/contracts/Escrow.sol/EscrowFactory.json';
import Escrow from "../artifacts/contracts/Escrow.sol/Escrow.json";

const StateContext = createContext();

const Caddress = "0x0fd5F6C29875b0dE23A53b2B5d6925F2Ae9455e3";

export const StateContextProvider = ({ children }) => {

    // connected user products.
    const [address, setAddress] = useState();
    // Factory contract.
    const [contract, setContract] = useState();
    const [signer, setSigner] = useState({});
    const [userBroughtProducts, setUserBroughtProducts] = useState([]);
    const [userListedProducts, setUserListedProducts] = useState([]);
    const [arbiterProducts, setArbiterProducts] = useState([]);
    const [listingDetailsWithData, setListingDetailsWithData] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
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
            if (Number(network.chainId) === 11155111 && _signer) {

                const contract_factory = new ethers.Contract(Caddress, EscrowFactory.abi, signer);
                await setContract(contract_factory);
            } else {
                alert("Please connect to sepolia netwrork");
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Returns listings which haven't been bought yet.
    const getAllData = async () => {
        if (contract && signer.address) {
            try {
                const current_listings = await contract.getListings();
                const listingarr = [];
                for (const el of current_listings) {
                    const curr_contract = new ethers.Contract(el, Escrow.abi, signer);
                    const bought = await curr_contract.bought();
                    if (bought === false) {
                        listingarr.push(curr_contract);
                    }
                }
                const arr = [];
                for (const listing of listingarr) {
                    const data = await getListDetails(listing);
                    arr.push(data);
                }
                await setListingDetailsWithData(arr);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const getAllListingDetails = async () => {
        try {

        } catch (error) {
            console.log(error);
            setListingDetailsWithData([]);
        }
    }

    // To get the connected user buyings.
    const getuserBoughtProducts = async () => {
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
    const getuserListedProducts = async () => {
        if (contract) {
            try {
                const current_listings = await contract.getListings();
                var listingarr = [];
                current_listings.map(async el => {
                    let curr_contract = new ethers.Contract(el, Escrow.abi, signer);
                    const seller = await curr_contract.beneficiary();
                    if (seller === signer.address) {
                        const details = await getListDetails(curr_contract);
                        listingarr.push(details);
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
    const getArbiterProducts = async () => {
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
    const createNewList = async ({ title,
        description,
        target,
        image,
        address, }) => {
        if (contract && signer) {
            const newListing = await contract.newListing(title, description, target, image, address);
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
                const created = await _contract.created();
                return [amount, title, description, image, bought, seller, created];

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
                await getAllData();
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

    useEffect(() => {
        const fetchCampaigns = async () => {
            await setIsLoading(true);
            await getAllData();
            await setIsLoading(false);
        };
        if (contract) fetchCampaigns();
    }, [address, contract]);

    
  useEffect(() => {
    const fetchCampaigns = async () => {
      setIsLoading(true);
      await getuserListedProducts();
      setIsLoading(false);
    };
    if (contract) fetchCampaigns();
  }, [address, contract]);

    return (
        <StateContext.Provider
            value={{
                address,
                contract,
                connect,
                setAddress,
                createNewList,
                getListDetails,
                approveListing,
                buyListing,
                getuserBoughtProducts,
                getuserListedProducts,
                getArbiterProducts,
                userBroughtProducts,
                userListedProducts,
                arbiterProducts,
                getAllListingDetails,
                listingDetailsWithData,
                getAllData,
                isLoading, setIsLoading
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
