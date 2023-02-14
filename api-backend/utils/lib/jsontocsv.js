const JSONToCSV = (objArray, keys) => {
    let csv = keys.join(',');
    objArray.forEach((row) => {
        let values = [];
        keys.forEach((key) => {
        //    console.log(key)
           
            values.push(row[key]|| '');})
           // console.log(row);
        
        csv += '\n' + values.join(',');
    });
    return csv;
};
module.exports ={
    JSONToCSV
}