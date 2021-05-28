const inititail = async () => {
  const mockData = await fetch('http://localhost:3000/mockData')
  .then(response => response.json())
  .then(data => { return data });

  this.createMatrixTable("#MatrixBefore",mockData);
  this.painColorAndContent("#MatrixBefore",mockData, "CNTBefore");
}




function createMatrixTable(domId,newArray) {
  for (row = 0; row < newArray.length; row++) {
      $(domId).append(createTrOfTable(newArray[row].ImpactLevel));
      for (col = 0; col < newArray[row].col.length; col++) {
          if (col === 0) {
            $(`${domId} > .row-` + newArray[row].ImpactLevel).append(createYaxis(newArray.length - row));
          }
          $(`${domId} > .row-` + newArray[row].ImpactLevel).append(createTdOfTableV2(
            row,
            col,
            newArray.length, 
          ));
      }
  }
  createEndTable(newArray);
      
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
function createEndTable(newArray) {
  const component = '<tr class=row-0>'
  + '<td>0</td>'
  + '</tr >'
  + '<tr><td style="border: none;" colspan="' + (newArray.length + 1) + '">Likelihood</td></tr>'
  + '<tr><td class="rotate" colspan="' + (newArray.length + 1) + '">Impact</td></tr>';
  if ( newArray.length) {
    $("#MatrixBefore").append(component);
    for (j = 0; j < newArray.length; ++j) {
        $('.row-0').append(createXaxis(j + 1));
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
        console.log(newArray[row]);
        $(select).text(newArray[row].col[col][`${prop}`]);

      }
   
    }
}
}