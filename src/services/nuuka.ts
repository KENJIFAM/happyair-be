import axios from 'axios';
import { NUUKA_TOKEN } from '../utils/secrets';

const nuuka = (buildingStructureIDs: string, startTime: string, endTime: string) =>
    axios.get(`https://nuukacustomerwebapi.azurewebsites.net/api/latest/GetIndoorConditionData?$format=json&$token=${NUUKA_TOKEN}&BuildingStructureIDs=${buildingStructureIDs}&StartTime=${startTime}&EndTime=${endTime}&SearchChildrenNodes=true&ReturnRoomGroupedData=false&ReturnDateGroupedData=false`);

export default nuuka;
