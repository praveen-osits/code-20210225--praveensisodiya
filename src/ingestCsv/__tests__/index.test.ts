import axios from 'axios';
import {
  checkIfUrlIsValid,
  getCsvFileData,
  describeCsvMetaData,
  getSizeInBytes
} from '../';
import { csvFileUrl } from '../../config';

describe('checkIfUrlIsValid function', () => {
  it('Should return true for valid url', () => {
    const result = checkIfUrlIsValid(csvFileUrl);
    expect(result).toBe(true);
  });

  it('Should return false for empty string', () => {
    const result = checkIfUrlIsValid('');
    expect(result).toBe(false);
  });

  it('Should return false for invalid url', () => {
    const result = checkIfUrlIsValid('abc/rws');
    expect(result).toBe(false);
  });
});

describe('getSizeInBytes function', () => {
  it('Should return size for a string', () => {
    const result = getSizeInBytes('Praveen S');
    expect(result).toBe(9);
  });

  it('Should return size as 0 for empty string', () => {
    const result = getSizeInBytes('');
    expect(result).toBe(0);
  });
});

describe('describeCsvMetaData function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('Should return true for valid url', async () => {
    const result = await describeCsvMetaData(csvFileUrl);
    expect(result).not.toBe(null);
  });
  it('Should return true for valid url', async () => {
    const result = await describeCsvMetaData('');
    expect(result).not.toBe(null);
  });
});

describe('getCsvFileData function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('Should return true for valid url', async () => {
    const result = await getCsvFileData(csvFileUrl);
    expect(result).not.toBe(null);
    expect(result).not.toBe(undefined);
  });
  it('Should return true for valid url', async () => {
    axios.get = jest.fn().mockResolvedValue({});
    const result = await getCsvFileData(csvFileUrl);
    expect(result).toBe('');
  });

  it('Should return true for valid url', async () => {
    const mockError = new Error('Network Error');
    axios.get = jest.fn().mockRejectedValue(mockError);
    try {
      const result = await getCsvFileData(csvFileUrl);
      expect(result).toBe('');
    } catch (err) {
      expect(err).toBe(mockError);
    }
  });
});
