const inititail = async () => {
  const mockData = await fetch('http://localhost:3000/mockData')
  .then(response => response.json())
  .then(data => { return data });

  this.loadMatrixTable(mockData);
}




function loadMatrixTable(newArray) {
  //console.log(newArray)
  for (i = 0; i < newArray.length; i++) {
      $("#MatrixBefore").append(createTrOfTable(newArray[i].ImpactLevel));

      for (j = 0; j < newArray[i].col.length + 1; j++) {
          if (j === 0) {
              $('#MatrixBefore > .row-' + newArray[i].ImpactLevel).append(createHeadTdOfTable(newArray.length - i));
          } else if (newArray[i].col[j - 1].Priority > 4) {
              if (newArray[i].col[j - 1].CNTBefore == 0) {
                  newArray[i].col[j - 1].CNTBefore = '';
                  $('#MatrixBefore > .row-' + newArray[i].ImpactLevel).append(createTdOfTable(newArray[i].col[j - 1].CNTBefore, 'green'));
              } else {
                  $('#MatrixBefore > .row-' + newArray[i].ImpactLevel).append(createTdOfTable(newArray[i].col[j - 1].CNTBefore, 'green'));
              }
          }else if (newArray[i].col[j - 1].Priority > 3) {
              if (newArray[i].col[j - 1].CNTBefore == 0) {
                  newArray[i].col[j - 1].CNTBefore = '';
                  $('#MatrixBefore > .row-' + newArray[i].ImpactLevel).append(createTdOfTable(newArray[i].col[j - 1].CNTBefore, 'darkgreen'));
              } else {
                  $('#MatrixBefore > .row-' + newArray[i].ImpactLevel).append(createTdOfTable(newArray[i].col[j - 1].CNTBefore, 'darkgreen'));
              }
          } else if (newArray[i].col[j - 1].Priority > 2) {
              if (newArray[i].col[j - 1].CNTBefore == 0) {
                  newArray[i].col[j - 1].CNTBefore = '';
                  $('#MatrixBefore > .row-' + newArray[i].ImpactLevel).append(createTdOfTable(newArray[i].col[j - 1].CNTBefore, 'yellow'));
              } else {
                  $('#MatrixBefore > .row-' + newArray[i].ImpactLevel).append(createTdOfTable(newArray[i].col[j - 1].CNTBefore, 'yellow'));
              }
          } else if (newArray[i].col[j - 1].Priority > 1) {
              if (newArray[i].col[j - 1].CNTBefore == 0) {
                  newArray[i].col[j - 1].CNTBefore = '';
                  $('#MatrixBefore > .row-' + newArray[i].ImpactLevel).append(createTdOfTable(newArray[i].col[j - 1].CNTBefore, 'orange'));
              } else {
                  $('#MatrixBefore > .row-' + newArray[i].ImpactLevel).append(createTdOfTable(newArray[i].col[j - 1].CNTBefore, 'orange'));
              }
          } else {
              if (newArray[i].col[j - 1].CNTBefore == 0) {
                  newArray[i].col[j - 1].CNTBefore = '';
                  $('#MatrixBefore > .row-' + newArray[i].ImpactLevel).append(createTdOfTable(newArray[i].col[j - 1].CNTBefore, 'red'));
              } else {
                  $('#MatrixBefore > .row-' + newArray[i].ImpactLevel).append(createTdOfTable(newArray[i].col[j - 1].CNTBefore, 'red'));
              }
          }
      }


      $("#MatrixAfter").append(createTrOfTable(newArray[i].ImpactLevel));

      for (k = 0; k < newArray[i].col.length + 1; k++) {
          if (k === 0) {
              $('#MatrixAfter > .row-' + newArray[i].ImpactLevel).append(createHeadTdOfTable(newArray.length - i));
          } else if (newArray[i].col[k - 1].Priority > 4) {
              if (newArray[i].col[k - 1].CNTAfter == 0) {
                  newArray[i].col[k - 1].CNTAfter = '';
                  $('#MatrixAfter > .row-' + newArray[i].ImpactLevel).append(createTdOfTable(newArray[i].col[k - 1].CNTAfter, 'green'));
              } else {
                  $('#MatrixAfter > .row-' + newArray[i].ImpactLevel).append(createTdOfTable(newArray[i].col[k - 1].CNTAfter, 'green'));
              }
          } else if (newArray[i].col[k - 1].Priority > 3) {
              if (newArray[i].col[k - 1].CNTAfter == 0) {
                  newArray[i].col[k - 1].CNTAfter = '';
                  $('#MatrixAfter > .row-' + newArray[i].ImpactLevel).append(createTdOfTable(newArray[i].col[k - 1].CNTAfter, 'darkgreen'));
              } else {
                  $('#MatrixAfter > .row-' + newArray[i].ImpactLevel).append(createTdOfTable(newArray[i].col[k - 1].CNTAfter, 'darkgreen'));
              }
          } else if (newArray[i].col[k - 1].Priority > 2) {
              if (newArray[i].col[k - 1].CNTAfter == 0) {
                  newArray[i].col[k - 1].CNTAfter = '';
                  $('#MatrixAfter > .row-' + newArray[i].ImpactLevel).append(createTdOfTable(newArray[i].col[k - 1].CNTAfter, 'yellow'));
              } else {
                  $('#MatrixAfter > .row-' + newArray[i].ImpactLevel).append(createTdOfTable(newArray[i].col[k - 1].CNTAfter, 'yellow'));
              }
          } else if (newArray[i].col[k - 1].Priority > 1) {
              if (newArray[i].col[k - 1].CNTAfter == 0) {
                  newArray[i].col[k - 1].CNTAfter = '';
                  $('#MatrixAfter > .row-' + newArray[i].ImpactLevel).append(createTdOfTable(newArray[i].col[k - 1].CNTAfter, 'orange'));
              } else {
                  $('#MatrixAfter > .row-' + newArray[i].ImpactLevel).append(createTdOfTable(newArray[i].col[k - 1].CNTAfter, 'orange'));
              }
          } else {
              if (newArray[i].col[k - 1].CNTAfter == 0) {
                  newArray[i].col[k - 1].CNTAfter = '';
                  $('#MatrixAfter > .row-' + newArray[i].ImpactLevel).append(createTdOfTable(newArray[i].col[k - 1].CNTAfter, 'red'));
              } else {
                  $('#MatrixAfter > .row-' + newArray[i].ImpactLevel).append(createTdOfTable(newArray[i].col[k - 1].CNTAfter, 'red'));
              }
          }
      }
  }
  for (i = 0; i < newArray.length; ++i) {
      if (i === 0) {
          $("#MatrixBefore").append(createEndTable());
          $("#MatrixAfter").append(createEndTable());


          for (j = 0; j < newArray.length; ++j) {
              $('.row-0').append(createHeadTdOfTable(j + 1));
          }

      }
  }

  function createTrOfTable(rowId,elementId) {
      return '<tr class=row-' + rowId + '>' + '</tr>';
  };
  function createHeadTdOfTable(rowId) {
      return '<td>' + rowId + '</td>';
  }
  function createTdOfTable(rowId, className) {
      return '<td class=' + className + '><span>' + rowId + '</span></td>';
  }
  function createEndTable() {
      return '<tr class=row-0>' + '<td>0</td>' + '</tr >' + '<tr><td style="border: none;" colspan="' + (newArray.length + 1) + '">Likelihood</td></tr>' + '<tr><td class="rotate" colspan="' + (newArray.length + 1) + '">Impact</td></tr>';
  }

}