const inititail = async () => {
  const mockData = await fetch('http://localhost:3000/mockData')
  .then(response => response.json())
  .then(data => { return data });
  const reulstData = this.prepareData(mockData);
  this.createMatrixTable("#MatrixBefore",reulstData);
  this.painColorAndContent("#MatrixBefore",reulstData.storeData, "CNTBefore");


  this.createMatrixTable("#MatrixAfter",reulstData);
  this.painColorAndContent("#MatrixAfter",reulstData.storeData, "CNTBefore");

}




function createMatrixTable(domId,data) {
  const {storeData: newArray, maxImpactLevel } = data;
  for (row = 0; row < maxImpactLevel; row++) {
      const select = maxImpactLevel - row;
      $(domId).append(createTrOfTable(select));
      for (col = 0; col < newArray[row].col.length; col++) {
          if (col === 0) {
            $(`${domId} > .row-` + select).append(createYaxis(maxImpactLevel- row));
          }
          $(`${domId} > .row-` + select).append(createTdOfTableV2(
            row,
            col,
            newArray.length, 
          ));
      }
  }
  createEndTable(domId,newArray);
      
}

function prepareData(newArray) {
  const sortData = newArray.sort((a,b) => { return  a.ImpactLevel - b.ImpactLevel   });
  const maxImpactLevel = sortData[sortData.length - 1].ImpactLevel;
  const maxLikelihoodLevel = this.getMaxLikelihoodLevel(newArray);

  const fileImpactLevel = this.fillBoxImpactLevel(sortData,maxImpactLevel);
  const resultData =this.filtBoxLikelihoodLevel(fileImpactLevel,maxLikelihoodLevel);
  return {
    maxImpactLevel,
    maxLikelihoodLevel, 
    storeData: resultData,
  };
}
function filtBoxLikelihoodLevel(sortData,maxLikelihoodLevel) {
  return sortData.map((item) => {
    const temps = [];
    const newData = [];
    if(item.col && item.col.length) {
      const revertData = item.col.reverse()
      for (i = 0; i < maxLikelihoodLevel; i++) {
        if(revertData[i] && revertData[i].LikelihoodLevel === i + 1)  newData.push(revertData[i]);
        else {
          if(revertData[i]) temps.push(revertData[i]);
          const data  = temps.find((item) => { if(item.LikelihoodLevel === i + 1) return item; })
          if(data) {
            newData.push(data); 
          } else {
            newData.push({
              LikelihoodLevel: i + 1,
              CNTBefore: 0,
              CNTAfter: 0,
              RiskLevel: 0,
              Priority: 0
           }); 
    
          }
        }
      } 
        item.col = newData;
    } else {
      item.col = [];
      for (i = 0; i < maxLikelihoodLevel; i++) {
        item.col.push({
          LikelihoodLevel: i + 1,
          CNTBefore: 0,
          CNTAfter: 0,
          RiskLevel: 0,
          Priority: 0
        })
      }
    }
    return item;
  }) 

}
function fillBoxImpactLevel(sortData,maxImpactLevel) {
  const newData = [];
  const temps = [];
  for (i = 0; i < maxImpactLevel; i++) {
    if(sortData[i] && sortData[i].ImpactLevel === i + 1)  newData.push(sortData[i]);
    else {
      if(sortData[i]) temps.push(sortData[i]);
      const data  = temps.find((item) => { if(item.ImpactLevel === i + 1) return item; })
      if(data) {
        newData.push(data); 
      } else {
        newData.push({
         ImpactLevel: i+1
       }); 

      }
    }
  }
  return newData;
}
function getMaxLikelihoodLevel(newArray) {
  let max = 0;
  newArray.map((item) => {
    const { col } = item;
    const sort = col.sort((a,b) => { return b.LikelihoodLevel - a.LikelihoodLevel }); 
    if(sort.length && sort[0].LikelihoodLevel > max) max = sort[0].LikelihoodLevel;
  })
  return max;
}
function createTrOfTable(rowId) {
  return '<tr class=row-' + rowId + '>' + '</tr>';
};
function createYaxis(rowId) {
  return '<td>' + rowId + '</td>';
}
function createXaxis(rowId) {
  return createYaxis(rowId);
}
function createTdOfTableV2(row, col, amountRow) {
  return '<td class=' + (amountRow - row) + '-' + (col + 1) + '><span>' + '' + '</span></td>';
}
function createEndTable(domId,newArray) {
  const component = '<tr class=row-0>'
  + '<td>0</td>'
  + '</tr >'
  + '<tr><td style="border: none;" colspan="' + (newArray.length + 1) + '">Likelihood</td></tr>'
  + '</tr>';
  if ( newArray.length) {
    $(domId).append(component);
    for (j = 0; j < newArray.length; ++j) {
        $(`${domId} >.row-0`).append(createXaxis(j + 1));
    }
  }
}

function painColorAndContent(domId,newArray, prop) {
  const amountRow =  newArray.length;
  for (row = 0; row <amountRow; row++) {
    for (col = 0; col < newArray[row].col.length; col++) {
      const select = `${domId} > tr.row-${row + 1} > td.${( row + 1)}-${col + 1 }`;
      if(newArray[row].col[col][`${prop}`] === 0) {
        $(select).text('');
      } else {
        console.log(select);
        $(select).text(newArray[row].col[col][`${prop}`]);

      }
   
    }
}
}