import useSWR from "swr";
import axios from "axios";
import { stakedNftAddresses } from "./stakedNftAddresses";
import { StakeCollectionCard } from "./StakeCollectionCard";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const StakeCollectionCards = (props) => {
  let commaStr = "";

  stakedNftAddresses.forEach((e) => {
    commaStr += e + ",";
  });

  const { data } = useSWR(
    `https://www.thetascan.io/api/721/?address=${props.account}&multicontract=${commaStr}`,
    fetcher,
    { refreshInterval: 1000 }
  );
  // console.log(props.nftContract, data, props.staked)

  if (!data) {
    return null;
  }

  // console.log(useCalculateRewards(e.contract, account, [e.token]))

  return (
    <span>
      {data.map((e, idx) => {
        return (
          <StakeCollectionCard
            token={e}
            idx={idx}
            setTxnSuccessful={props.setTxnSuccessful}
            staked={props.staked}
          />
        );
      })}
    </span>
  );
};

export { StakeCollectionCards };
