import { formatEther } from '@ethersproject/units';
import { useEthers } from '@usedapp/core';
import { useCalculateRewards } from './useCalculateRewards';

const UnclaimedRewards = (props) => {
  const { account } = useEthers();
  // const [unclaimedRewards, setUnclaimedRewards] = useState(0);

  function createTokenIdObject(nfts) {
    let tokenIdObj = {
      "0x67fc8c72707f17761ced1e71ee9a92be36179eac": [], // Staked Guardian
      "0x76d39587003800215059070dc1e36d5e939da0ac": [], // Staked Down With Me
      "0xace401567d517af35c1f8e234975f95b3760a1e3": [], // Staked Dreamland
      "0x14daeae94ac3e065c07d2fd1b440919f3dbeeb3e": [], // Staked Fly N High
      "0x9beb67806cc909131328edd2daf822aa3bd4c30f": [], // Staked Beam My Line
      "0x6cd2ddf245340bc2322de497bdaedd963c09c22c": [], // Staked Gimme The TFuel
    };
    nfts.forEach(e => {      
      tokenIdObj[e.contract].push(parseInt(e.token));
    })
    return tokenIdObj;
  }

  const stakedTokenObj = createTokenIdObject(props.stakedNftData);
  
  async function calculateUnclaimedRewards() {
    const bigNumberArray = [];
    
    Object.keys(stakedTokenObj).forEach(async (e) => {
      const bigNumberValue = await useCalculateRewards(e, account, stakedTokenObj[e]);
      bigNumberArray.push(bigNumberValue);
    })

    const bigNumberFlat = [].concat(...await bigNumberArray);
    
    let answer = 0;
    bigNumberFlat.forEach(e => {
      if(e){
        answer += parseFloat(formatEther(e));
      }        
    })
    
    props.setUnclaimedRewards(answer);
  }

  calculateUnclaimedRewards();

  return (
    <div>
      <span style={{color: "purple",
    fontSize: "2rem"}}>Unclaimed TVIBE Balance:</span> {props.unclaimedRewards && parseFloat(props.unclaimedRewards).toFixed(3)} 
    </div>
  )
}

export { UnclaimedRewards}