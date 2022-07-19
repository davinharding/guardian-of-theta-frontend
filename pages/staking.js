import Base from "./base"
import StakingPageBody from "../pages-sections/Staking-Sections/StakingPageBody";

export default function Staking(props) {

  return (
    <Base bodyComponent={<StakingPageBody />} />
  )
}