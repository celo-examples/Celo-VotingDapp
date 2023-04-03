import React, { useState, useEffect, useRef  } from 'react'
import {
  addCandidate, getCandidates, vote, giveVoterRight, getVotingEndTime,
  updateEndTime, getWinner
} from '@/interact'
import { useCelo } from '@celo/react-celo';
import CandidateList from '@/components/CandidateList';


export default function Home() {
  const [candidates, setCandidates] = useState<any[]>([])
  const [endtime, setEndtime] = useState<number>(0)
  const [ended, setEnded] = useState<boolean>(false)
  const [winner, setWinner] = useState<string>('')
  const [update, setUpdate] = useState<string>('0')
  const [candidateName, setCandidateName] = useState<string>('')
  const [candidateAddress, setCandidateAddress] = useState<string>('')
  const [voterAddress, setVoterAddress] = useState<string>('')
  const [candidateId, setCandidateId] = useState<number>(0)
  const [candidateAd, setCandidateAd] = useState<string>('')

  const { kit, address } = useCelo()

  const handleCandidateName = (e: React.FormEvent<HTMLInputElement>) => {
    setCandidateName(e.currentTarget.value)
    console.log(e.currentTarget.value)
  }

   const handleCandidateAddress = (e: React.FormEvent<HTMLInputElement>) => {
    setCandidateAddress(e.currentTarget.value)
    console.log(e.currentTarget.value)
   }
  
    const handleVoterAddress = (e: React.FormEvent<HTMLInputElement>) => {
    setVoterAddress(e.currentTarget.value)
    console.log(e.currentTarget.value)
  }
  
  const handleUpdateEndtime = (e: React.FormEvent<HTMLInputElement>) => {
    setUpdate(e.currentTarget.value)
    console.log(e.currentTarget.value)
  }
   
  const handleEndtimeUpdate = async () => {
    await updateEndTime(address, update, kit)
    setUpdate("")
    window.location.reload()
  }

  const handleEndtime = async () => {
    const end = await getVotingEndTime(kit)
    setEndtime(end)
  }
  
  const handleWinner = async () => {
    const win = await getWinner(kit)
    setWinner(win)
  }

   const handleCandidates = async () => {
    const candidates = await getCandidates(kit)
    setCandidates(candidates)
  }

  let d = new Date();
  const formatDate = new Date(endtime as number * 1000 + d.getTimezoneOffset() * 60000)
  console.log(formatDate)
  console.log(d.getTime())


   const handleCandidate = (id: number, addr: string) => {
    setCandidateId(id)
     setCandidateAd(addr)
    console.log(id)
    console.log(addr)
    }
 
  useEffect(() => {
    if (formatDate.getTime() > d.getTime()) {
      console.log("Bidding ongoing")
      setEnded(false)
    } else {
      console.log("bidding ended")
      setEnded(true)
    }
    handleCandidates()
    handleEndtime()
    handleWinner()
  }, [kit])
 
  console.log(!ended)
  console.log(winner)
  return (
    <div>
    {!address ? <div>Please connect your wallet</div> :
        <div>
      <h1 className='text-4xl text-center m-4'>Decentralized Voting System</h1>
      {ended ? <div>
       <h1>Voting has ended. Click on the Update End time button to extend the Voting period.</h1>
        <input className='p-4 ml-4' type="number" placeholder='Update End Time' value={update} onChange={handleUpdateEndtime} />
        <button className="bg-slate-300 rounded-md p-4 mt-4" onClick={() => handleEndtimeUpdate()}>Update Endtime</button>
      </div> :
        <div>
          <div>
            <div className=' flex text-xl justify-around'>
              <h1 className='mr-4'>{`Voting Ends on `}</h1>
              <h1 className='text-red-500'>{`${formatDate.toString().slice(0, 24)}`}</h1>
            </div>
            <div className=' flex text-xl justify-between'>
              <h1 className='tex-4xl mt-4'>Give right to vote</h1>
              <div>
                <input className='p-4 ml-4' type="text" placeholder='Voter address' value={voterAddress} onChange={handleVoterAddress} />
                <button className="bg-orange-300 rounded-md p-4 mt-4" onClick={() => giveVoterRight(address, voterAddress, kit)}>Register voter</button>
              </div>
              <div>
                <input className='p-4 ml-4' type="number" placeholder='Update End Time' value={update} onChange={handleUpdateEndtime} />
                <button className="bg-slate-300 rounded-md p-4 mt-4" onClick={() => handleEndtimeUpdate()}>Update Endtime</button>
            </div>
            </div>
            <h1 className='text-2xl text-blue-500 mt-4'>Add Candidate</h1>
            <input className='p-4' type="text" placeholder='Candidate name' value={candidateName} onChange={handleCandidateName} />
            <input className='p-4 ml-4' type="text" placeholder='Candidate Address' value={candidateAddress} onChange={handleCandidateAddress} />
            <button className="bg-yellow-300 rounded-md p-4 mt-4" onClick={() => addCandidate(address, kit, candidateName, candidateAddress)}>Add Candidate</button>
          </div>

            <div className='mt-4'>
              <h1 className='text-2xl mt-4 text-blue-500'>Presidential Candidates</h1>
                {!candidates ? <div></div> : candidates.map((item, index) =>  <CandidateList action={() => handleCandidate(index + 1, item)} key={index} candidateAddress={item} id={index + 1} /> )}          
                <button className="bg-yellow-300 rounded-md p-4 mt-4 w-2/4" onClick={() => vote(address, candidateAd, candidateId, kit)}>Vote</button>
            </div>
          
            <div className=" text-xl mt-4">
              <h1 className='text-2xl text-blue-500 mt-4'>Voting has Ended</h1>
              <h1>{`Winner: ${!winner ? '' :winner[0]}`}</h1>
              <h1>{`Number of winning vote: ${!winner ? '' : winner[1] }`}</h1>
          </div>
        </div>}      
    </div>
    }
    </div>   
  )
}
