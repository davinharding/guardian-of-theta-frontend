import { formatEther } from '@ethersproject/units';
import { useEthers } from '@usedapp/core';
import { useCalculateRewards } from './useCalculateRewards';
import { useState } from 'react';


const UnclaimedRewards = (props) => {
  const { account } = useEthers();
  const [unclaimedRewards, setUnclaimedRewards] = useState(0);

  function createTokenIdObject(nfts) {
    let tokenIdObj = {};
    nfts.forEach(e => {
      tokenIdObj[e.contract] ? (
        tokenIdObj[e.contract] = tokenIdObj[e.contract].push(parseInt(e.token))
      ) : (
        tokenIdObj[e.contract] = [parseInt(e.token)]
      );
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
    
    setUnclaimedRewards(answer);
  }

  calculateUnclaimedRewards();

  return (
    <div>
      Unclaimed TVIBE Balance: {unclaimedRewards && parseFloat(unclaimedRewards).toFixed(3)} 
    </div>
  )
}

export { UnclaimedRewards}