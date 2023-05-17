import React, { useContext, createContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import EscrowFactory from '../artifacts/contracts/Escrow.sol/EscrowFactory.json';
import Escrow from "../artifacts/contracts/Escrow.sol/Escrow.json";

const StateContext = createContext();

const Caddress = "0xB7AA5D074D4A498C52793f395e86fa37043a4485";

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
    const [currentProduct, setCurrentProduct] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isActive, setIsActive] = useState("dashboard");

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
            await provider.send("wallet_switchEthereumChain", [{ chainId: ethers.toBeHex(11155111) }]);
            const _signer = await provider.getSigner();
            const network = await _signer.provider._detectNetwork();
            await setSigner(_signer);
            await setAddress(signer.address);
            if (Number(network.chainId) === 11155111 && _signer) {

                const contract_factory = new ethers.Contract(Caddress, EscrowFactory.abi, signer);
                await setContract(contract_factory);
            } else {
                await alert("Please connect to sepolia netwrork");
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Returns listings which haven't been bought yet.
    const getAllData = async (_search = '') => {
        if (contract && signer.address) {
            try {
                setIsLoading(true);
                const current_listings = await contract.getListings();
                const listingarr = [];
                for (const el of current_listings) {
                    const curr_contract = new ethers.Contract(el, Escrow.abi, signer);
                    const bought = await curr_contract.bought();
                    const title = await curr_contract.title();
                    if (bought === false && title.toLowerCase().includes(_search)) {
                        listingarr.push(curr_contract);
                    }
                }
                const arr = [];
                for (const listing of listingarr) {
                    const data = await getListDetails(listing);
                    arr.push(data);
                }
                await setListingDetailsWithData(arr);
                setIsLoading(false);
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
                        const details = await getListDetails(curr_contract);
                        listingarr.push(details);
                    }
                    return el;
                });
                setUserBroughtProducts(listingarr);
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
                        const details = await getListDetails(curr_contract);
                        listingarr.push(details);
                    }
                    return el;
                });
                setArbiterProducts(listingarr);
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
            setTimeout(async () => {
                await getAllData("");
            }, 3000);
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
                const approved = await _contract.isApproved();
                return [amount.toString(), title.toString(), description.toString(), image.toString(), bought.toString(), seller.toString(), created.toString(), _contract, approved];

            } catch (error) {
                console.log(error);
            }
        }
    }

    // to buy the specific listed product (not state update).
    const buyListing = async (_contract, _arbiter) => {
        if (_arbiter && _contract) {
            try {
                const eth = await currentProduct[7].convertUSDToEther(currentProduct[0]);
                await _contract.buy(_arbiter, { value: eth });
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

    // To get all the listed products.
    useEffect(() => {
        const fetchCampaigns = async () => {
            await setIsLoading(true);
            await getAllData();
            await setIsLoading(false);
        };
        if (contract) fetchCampaigns();
    }, [address, contract]);

    // To get all the user listed products.
    useEffect(() => {
        const fetchCampaigns = async () => {
            setIsLoading(true);
            await getuserListedProducts();
            setIsLoading(false);
        };
        if (contract) fetchCampaigns();
    }, [address, contract]);

    // To get all the arbiter products.
    useEffect(() => {
        const fetchCampaigns = async () => {
            setIsLoading(true);
            await getArbiterProducts();
            setIsLoading(false);
        };
        fetchCampaigns();
    }, [address, contract]);

    // To get all the user bought products.
    useEffect(() => {
        const fetchCampaigns = async () => {
            setIsLoading(true);
            await getuserBoughtProducts();
            setIsLoading(false);
        };
        fetchCampaigns();
    }, [address, contract]);

    // to convert timestamp to days, hours & minutes respectively.
    function getTimeElapsed(timestamp) {
        const now = new Date().getTime();
        const timeDiff = (now - timestamp * 1000) / 1000;
        if (timeDiff >= 86400) {
            const days = Math.floor(timeDiff / 86400);
            return days + (days === 1 ? " day" : " days") + " ago";
        } else if (timeDiff >= 3600) {
            const hours = Math.floor(timeDiff / 3600);
            return hours + (hours === 1 ? " hour" : " hours") + " ago";
        } else if (timeDiff >= 60) {
            const minutes = Math.floor(timeDiff / 60);
            return minutes + (minutes === 1 ? " minute" : " minutes") + " ago";
        } else {
            return "Just now";
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
                isLoading, setIsLoading,
                getTimeElapsed,
                currentProduct, setCurrentProduct,
                isActive, setIsActive
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
