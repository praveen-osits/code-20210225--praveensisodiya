import axios from 'axios';

/**
 * Function to find that the given url is valid or not
 * @param {string} url url string to check
 * @return {boolean} true or false
 */
const checkIfUrlIsValid = (url: string): boolean => {
  const urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/g;
  if (urlRegex.test(url)) {
    return true;
  } else {
    return false;
  }
};

/**
 * Function to get csv data for given url
 * @param {string} url url string for csv file
 * @return {string} csv data string
 */
const getCsvFileData = async (url: string): Promise<string> => {
  try {
    const response = await axios.get(url);
    if (response && response.data) {
      return response.data;
    } else {
      console.log('Recieved no data while getting csv file'); // not using console.error for beautiful unit test results
      return '';
    }
  } catch (err) {
    console.log('Error occured while getting csv file', err); // not using console.error for beautiful unit test results
    return '';
  }
};

/**
 * Function to get size of a string in byte
 * @param {string} stringText string to calculate size of
 * @return {number} size in byte of a string
 */
const getSizeInBytes = (stringText: string): number => {
  // return encodeURI(stringText.trim()).split(/%..|./).length - 1;
  return Buffer.byteLength(stringText); //stringText.trim() => not using trim() because spaces in file data need to be considered
};

/**
 * Function to describe the meta data of csv file for given url
 * @param {string} csvFileUrl url string for csv file
 */
const describeCsvMetaData = async (csvFileUrl: string): Promise<void> => {
  console.log(`1. Function describeCsvMetaData started...`);
  console.log(`2. Checking if given url ${csvFileUrl} is valid...`);
  const isUrlValid = checkIfUrlIsValid(csvFileUrl);
  if (isUrlValid) {
    console.log(`3. Given url is valid...`);
    console.log(`4. Making API call to get file data...`);
    const csvFileData: string = await getCsvFileData(csvFileUrl);
    if (csvFileData) {
      console.log(`5. Describing csv file meta data...`);
      const sizeinBytes = getSizeInBytes(csvFileData);
      const allCsvRows = csvFileData.split(/\r\n|\n/);
      if (allCsvRows && allCsvRows.length > 0) {
        const rowsCount = allCsvRows.length;
        const allColumns = allCsvRows[0];
        console.log(
          '\t a. Column or field names present in the CSV: ',
          allColumns.replace(/;/g, ', ')
        );
        console.log('\t b. Total size in bytes of the file: ', sizeinBytes);
        console.log('\t c. Total number of rows: ', rowsCount); // including column/first row
      } else {
        console.log('6. No rows in the csv file'); // not using console.error for beautiful unit test results
      }
    } else {
      console.log('5. No csv file data to describe.'); // not using console.error for beautiful unit test results
    }
  } else {
    console.log(`3. Given csv url '${csvFileUrl}' is not valid.`); // not using console.error for beautiful unit test results
  }
};

export {
  checkIfUrlIsValid,
  getCsvFileData,
  describeCsvMetaData,
  getSizeInBytes
};
