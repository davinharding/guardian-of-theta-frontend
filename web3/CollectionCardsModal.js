import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody"
import CardFooter from "components/Card/CardFooter"
import CardHeader from "components/Card/CardHeader"
import useSWR from 'swr';
import axios from 'axios'
import { contractMetadataKey } from "./ContractMetadataKey";

const fetcher = url => axios.get(url).then(res => res.data)

const CollectionCardsModal = (props) => {

  const { data } = useSWR(`https://www.thetascan.io/api/721/?address=${props.account}&contract=${props.nftContract}`, fetcher);

  if (!data) {
    return null;
  }

  return (
    <div key={props.keys}>  
      {data.map((e,idx) => {
        return (
          <div key={idx} style={{textAlign: "center", marginTop: "3rem"}}>
            <Card>
              <CardHeader color="primary">
                {contractMetadataKey[e.contract].name} #{e.token}
              </CardHeader>
              <CardBody>
                <img src={contractMetadataKey[e.contract].url} height="100%" width="100%"/>
              </CardBody>
              <CardFooter>
                {/* <Button color="primary">
                  Stake
                </Button>  */}
              </CardFooter>     
            </Card>
          </div>
        )
        
        })
      }      
    </div>  
  )
}

export { CollectionCardsModal };