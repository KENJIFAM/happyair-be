import axios from 'axios';
import { NUUKA_TOKEN } from '../utils/secrets';
import { IndoorConditionDataParams, MeasurementDataByIDsParams } from '../types';
import { buildingId } from '../utils/constants';

export const getIndoorConditionData = ({ startTime, endTime }: IndoorConditionDataParams) =>
    axios.get(`https://nuukacustomerwebapi.azurewebsites.net/api/latest/GetIndoorConditionData?$format=json&$token=${NUUKA_TOKEN}&BuildingStructureIDs=${buildingId}&StartTime=${startTime}&EndTime=${endTime}&SearchChildrenNodes=true&ReturnRoomGroupedData=false&ReturnDateGroupedData=false`);

export const getMeasurementInfo = () =>
    axios.get(`https://nuukacustomerwebapi.azurewebsites.net/api/v2.0/GetMeasurementInfo/?BuildingID=${buildingId}&MeasurementSystem=SI&$format=json&$token=${NUUKA_TOKEN}`);

export const getMeasurementDataByIDs = ({ dataPointIds, startTime, endTime }: MeasurementDataByIDsParams) =>
    axios.get(`https://nuukacustomerwebapi.azurewebsites.net/api/v2.0/GetMeasurementDataByIDs/?Building=2410&DataPointIDs=${dataPointIds}&StartTime=${startTime}&EndTime=${endTime}&TimestampTimeZone=UTCOffset&MeasurementSystem=SI&$format=json&$token=${NUUKA_TOKEN}`);
