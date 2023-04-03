import { BigNumber } from "ethers";
import contractABI from "./Election.json"

const contractAddress = "0xad1388932B107a501Fb2511501d3Ef29b72C6b24";

export function donationContract(kit: any) {
  return new kit.connection.web3.eth.Contract(contractABI.abi, contractAddress)
} 


export const addCandidate = async (address: string | null | undefined,
  kit: any, name: string, candidateAddress: string) => {
  try {
    const txHash = await donationContract(kit).methods.addCandidate(name, candidateAddress).send({
    from: address,
    })
    console.log(txHash)
  } catch (e) {
    console.log(e)
  }
}

export const getCandidates = async (kit: any) => {
  try {
    const candidates = await donationContract(kit).methods.getCandidates().call()
    console.log(candidates)
    return candidates;
  } catch (e) {
    console.log(e)
  }
}

export const getCandidateLength = async (kit: any) => {
  try {
    const candidates = await donationContract(kit).methods.getCandidateLength().call()
    console.log(candidates)
    return candidates;
  } catch (e) {
    console.log(e)
  }
}

export const getCandidateData = async (kit: any, candidateAddress : string) => {
  try {
    const candidate = await donationContract(kit).methods.getCandidateLength(candidateAddress).call()
    console.log(candidate)
    return candidate;
  } catch (e) {
    console.log(e)
  }
}

export const giveVoterRight = async (address: string | null | undefined, votersAddress: string | null | undefined,
  kit: any) => {
  try {
    const txHash = await donationContract(kit).methods.giveVoterRight(votersAddress).send({
    from: address,
    })
    console.log(txHash)
  } catch (e) {
    console.log(e)
  }
}

export const vote = async (address: string | null | undefined,
  candidateAddress: string | null | undefined, candidateId: number,
  kit: any) => {
  try {
    const txHash = await donationContract(kit).methods.vote(candidateAddress, candidateId).send({
    from: address,
    })
    console.log(txHash)
  } catch (e) {
    console.log(e)
  }
}

export const getVotersLength = async (kit: any, candidateAddress : string) => {
  try {
    const voters = await donationContract(kit).methods.getVoterLength(candidateAddress).call()
    console.log(voters)
    return voters;
  } catch (e) {
    console.log(e)
  }
}

export const getVoterData = async (kit: any, voterAddress : string) => {
  try {
    const voter = await donationContract(kit).methods.getVoterData(voterAddress).call()
    console.log(voter)
    return voter;
  } catch (e) {
    console.log(e)
  }
}

export const getVotedVoters = async (kit: any) => {
  try {
    const votedVoters = await donationContract(kit).methods.getVotedVoters().call()
    console.log(votedVoters)
    return votedVoters;
  } catch (e) {
    console.log(e)
  }
}

export const getVoterList = async (kit: any) => {
  try {
    const voterList = await donationContract(kit).methods.getVoterList().call()
    console.log(voterList)
    return voterList;
  } catch (e) {
    console.log(e)
  }
}

export const getVotingEndTime = async (kit: any) => {
  try {
    const endtime = await donationContract(kit).methods.getVotingEndTime().call()
    console.log(endtime)
    return endtime;
  } catch (e) {
    console.log(e)
  }
}

export const updateStartTime = async (address: string | null | undefined, startTime: number, kit: any) => {
  try {
    const txHash = await donationContract(kit).methods.updateVotingStartTime(startTime).send({
    from: address,
    })
    console.log(txHash)
  } catch (e) {
    console.log(e)
  }
}

export const updateEndTime = async (address: string | null | undefined, endTime: string, kit: any) => {
  try {
    const txHash = await donationContract(kit).methods.extendVotingEndTime(endTime).send({
    from: address,
    })
    console.log(txHash)
  } catch (e) {
    console.log(e)
  }
}

export const getWinner = async (kit: any) => {
  try {
    const winner = await donationContract(kit).methods.getWinner().call()
    console.log(winner)
    return winner;
  } catch (e) {
    console.log(e)
  }
}
