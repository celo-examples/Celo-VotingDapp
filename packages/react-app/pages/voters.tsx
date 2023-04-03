import React, {useState, useEffect} from 'react'
import { useCelo } from '@celo/react-celo';
import { getVotedVoters, getVoterList } from '@/interact'

import TableList from '@/components/TableList';

export default function Voters(): JSX.Element {
  const { kit, address } = useCelo()
  const [voters, setVoters] = useState<any[]>([])
  const [votedVoters, setVotedVoters] = useState<any[]>([])

  const getVoters = async () => {
    const voterList = await getVoterList(kit)
    setVoters(voterList)
  }
  const handleVotedVoters = async () => {
    const votedList = await getVotedVoters(kit)
    setVotedVoters(votedList)
  }

  useEffect(() => {
    getVoters()
    handleVotedVoters()
  })

  return (
    <div className='flex flex-col'>
      <div>
        <h1 className='text-2xl'>Registered Voters</h1>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-4">Id</th>
                      <th scope="col" className="px-6 py-4">Address</th>
                    </tr>
                  </thead>
                    <tbody>
                      {!voters ? <div>No registered voters</div> : voters.map((item, index) => <tr key={index} className="border-b dark:border-neutral-500">
                        <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
                      <td className="whitespace-nowrap px-6 py-4">{item}</td>
                    </tr>
                    )}            
                  </tbody>
                </table>
              </div>
            </div>
        </div>
      </div>
      </div>
      <div>
        <h1 className='text-2xl'>Voted Voters</h1>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-4">Id</th>
                      <th scope="col" className="px-6 py-4">Address</th>
                    </tr>
                  </thead>
                    <tbody>
                      {!votedVoters ? <div>Please go and vote</div> :votedVoters.map((item, index) => <tr key={index} className="border-b dark:border-neutral-500">
                        <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
                      <td className="whitespace-nowrap px-6 py-4">{item}</td>
                    </tr>
                    )}            
                  </tbody>
                </table>
              </div>
            </div>
            </div>
        </div>
      </div>
    </div>
  )
}
