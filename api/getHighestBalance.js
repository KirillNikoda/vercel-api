const { ethers } = require("ethers");

const { default: axios } = require("axios");

const DAC_ABI = [
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
];

const DAF_FACTORY_ABI = [
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_currencies",
        type: "address[]"
      }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "contract Daf",
        name: "daf",
        type: "address"
      }
    ],
    name: "DafCreated",
    type: "event"
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string"
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string"
      },
      {
        internalType: "address",
        name: "_currency",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "_totalSupply",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_governanceTokensPrice",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_percentToVote",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_limitToBuy",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_votingDuration",
        type: "uint256"
      }
    ],
    name: "create",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    name: "currencies",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    name: "dafs",
    outputs: [
      {
        internalType: "contract Daf",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getDafs",
    outputs: [
      {
        internalType: "contract Daf[]",
        name: "",
        type: "address[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
];

const DAC_FACTORY_ABI = [
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_currencies",
        type: "address[]"
      }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "contract Dac",
        name: "dac",
        type: "address"
      }
    ],
    name: "DacCreated",
    type: "event"
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string"
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string"
      },
      {
        internalType: "address",
        name: "_currency",
        type: "address"
      },
      {
        internalType: "address[]",
        name: "_teammates",
        type: "address[]"
      },
      {
        internalType: "uint256",
        name: "_totalSupply",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_governanceTokensPrice",
        type: "uint256"
      },
      {
        internalType: "bool",
        name: "_purchasePublic",
        type: "bool"
      },
      {
        internalType: "bool",
        name: "_halfToVote",
        type: "bool"
      },
      {
        internalType: "uint256",
        name: "_votingDuration",
        type: "uint256"
      }
    ],
    name: "create",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    name: "currencies",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    name: "dacs",
    outputs: [
      {
        internalType: "contract Dac",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getDacs",
    outputs: [
      {
        internalType: "contract Dac[]",
        name: "",
        type: "address[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
];

module.exports = async (req, res) => {
  const { getTvl = false } = req.query;

  const provider = new ethers.providers.JsonRpcProvider(
    "https://bsc-dataseed.binance.org/"
  );

  const DAC_FACTORY_ADDRESS = "0x9C9A04EBE8c3F06daeA2D52069FFE73BbA807a7B";
  const DAC_FACTORY_ADDRESS_OLD_2 =
    "0x0C6ce89076b9222689bEF148fdbb4CEef6002CA0";
  const DAC_FACTORY_ADDRESS_OLD = "0x8D2219efe612F032BAF46e5c796a262582F11Cd4";

  const DAF_FACTORY_ADDRESS = "0xCdAe7CAEF5abcbb11be1D13E41882621d784C531";
  const DAF_FACTORY_ADDRESS_OLD_2 =
    "0x4C622c6BEec53B984a5dA1AC22Fd8e3e05b4ab09";
  const DAF_FACTORY_ADDRESS_OLD = "0xF3FE40404484A2c67d2F6A8bCc6bBf2Db0a8614a";

  const dacFactory1 = new ethers.Contract(
    DAC_FACTORY_ADDRESS,
    DAC_FACTORY_ABI,
    provider
  );
  const dacFactory2 = new ethers.Contract(
    DAC_FACTORY_ADDRESS_OLD,
    DAC_FACTORY_ABI,
    provider
  );
  const dacFactory3 = new ethers.Contract(
    DAC_FACTORY_ADDRESS_OLD_2,
    DAC_FACTORY_ABI,
    provider
  );

  const dafFactory1 = new ethers.Contract(
    DAF_FACTORY_ADDRESS,
    DAF_FACTORY_ABI,
    provider
  );
  const dafFactory2 = new ethers.Contract(
    DAF_FACTORY_ADDRESS_OLD,
    DAF_FACTORY_ABI,
    provider
  );
  const dafFactory3 = new ethers.Contract(
    DAF_FACTORY_ADDRESS_OLD_2,
    DAF_FACTORY_ABI,
    provider
  );

  const [dacs1, dacs2, dacs3, dafs1, dafs2, dafs3] = await Promise.all([
    dacFactory1.getDacs(),
    dacFactory2.getDacs(),
    dacFactory3.getDacs(),
    dafFactory1.getDafs(),
    dafFactory2.getDafs(),
    dafFactory3.getDafs()
  ]);

  let dacs = [...dacs1, ...dacs2, ...dacs3];
  let dafs = [...dafs1, ...dafs2, ...dafs3];

  dacs = await Promise.all(
    dacs.map(async (address) => {
      const dacContract = new ethers.Contract(address, DAC_ABI, provider);
      const name = await dacContract.name();
      return {
        address,
        name
      };
    })
  );

  dafs = await Promise.all(
    dafs.map(async (address) => {
      const dafContract = new ethers.Contract(address, DAC_ABI, provider);
      const name = await dafContract.name();
      return {
        address,
        name
      };
    })
  );

  let daos = [...dacs, ...dafs];

  daos = await Promise.all(
    daos.map(async ({ address, name }) => {
      const balance = await axios.get(
        `https://openapi.debank.com/v1/user/chain_balance?id=${address.toLowerCase()}&chain_id=bsc`
      );
      return {
        daoAddress: address,
        usd_value: balance.data.usd_value,
        name
      };
    })
  );

  if (getTvl) {
    const tvl = daos.reduce((acc, val) => acc + +val.usd_value, 0);

    res.status(200).send(tvl);
    return;
  }

  const sorted = daos.sort((a, b) => b.usd_value - a.usd_value);

  res.send(sorted);
};
