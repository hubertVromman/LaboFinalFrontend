import { Race } from "./race.model"
import { Runner } from "./runner.model"

export interface Result {
  race: Race | null
  runner: Runner | null
  raceId: number
  runnerId: number
  generalRank: number
  generalRankShown: string
  genderRank: number
  time: string
  speed: number
  pace: string
}
