"use strict";

var _this = void 0;

var inititail = function inititail() {
  var mockData, reulstData;
  return regeneratorRuntime.async(function inititail$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch('http://localhost:3000/mockData').then(function (response) {
            return response.json();
          }).then(function (data) {
            return data;
          }));

        case 2:
          mockData = _context.sent;
          reulstData = _this.prepareData(mockData);

          _this.createMatrixTable("#MatrixBefore", reulstData);

          _this.painColorAndContent("#MatrixBefore", reulstData.storeData, "CNTBefore");

          _this.createMatrixTable("#MatrixAfter", reulstData);

          _this.painColorAndContent("#MatrixAfter", reulstData.storeData, "CNTBefore");

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
};

function createMatrixTable(domId, data) {
  var newArray = data.storeData,
      maxImpactLevel = data.maxImpactLevel;

  for (row = 0; row < maxImpactLevel; row++) {
    var select = maxImpactLevel - row;
    $(domId).append(createTrOfTable(select));

    for (col = 0; col < newArray[row].col.length; col++) {
      if (col === 0) {
        $("".concat(domId, " > .row-") + select).append(createYaxis(maxImpactLevel - row));
      }

      $("".concat(domId, " > .row-") + select).append(createTdOfTableV2(row, col, newArray.length));
    }
  }

  createEndTable(domId, newArray);
}

function prepareData(newArray) {
  var sortData = newArray.sort(function (a, b) {
    return a.ImpactLevel - b.ImpactLevel;
  });
  var maxImpactLevel = sortData[sortData.length - 1].ImpactLevel;
  var maxLikelihoodLevel = this.getMaxLikelihoodLevel(newArray);
  var fileImpactLevel = this.fillBoxImpactLevel(sortData, maxImpactLevel);
  var resultData = this.filtBoxLikelihoodLevel(fileImpactLevel, maxLikelihoodLevel);
  return {
    maxImpactLevel: maxImpactLevel,
    maxLikelihoodLevel: maxLikelihoodLevel,
    storeData: resultData
  };
}

function filtBoxLikelihoodLevel(sortData, maxLikelihoodLevel) {
  return sortData.map(function (item) {
    var temps = [];
    var newData = [];

    if (item.col && item.col.length) {
      var revertData = item.col.reverse();

      for (i = 0; i < maxLikelihoodLevel; i++) {
        if (revertData[i] && revertData[i].LikelihoodLevel === i + 1) newData.push(revertData[i]);else {
          if (revertData[i]) temps.push(revertData[i]);
          var data = temps.find(function (item) {
            if (item.LikelihoodLevel === i + 1) return item;
          });

          if (data) {
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
        });
      }
    }

    return item;
  });
}

function fillBoxImpactLevel(sortData, maxImpactLevel) {
  var newData = [];
  var temps = [];

  for (i = 0; i < maxImpactLevel; i++) {
    if (sortData[i] && sortData[i].ImpactLevel === i + 1) newData.push(sortData[i]);else {
      if (sortData[i]) temps.push(sortData[i]);
      var data = temps.find(function (item) {
        if (item.ImpactLevel === i + 1) return item;
      });

      if (data) {
        newData.push(data);
      } else {
        newData.push({
          ImpactLevel: i + 1
        });
      }
    }
  }

  return newData;
}

function getMaxLikelihoodLevel(newArray) {
  var max = 0;
  newArray.map(function (item) {
    var col = item.col;
    var sort = col.sort(function (a, b) {
      return b.LikelihoodLevel - a.LikelihoodLevel;
    });
    if (sort.length && sort[0].LikelihoodLevel > max) max = sort[0].LikelihoodLevel;
  });
  return max;
}

function createTrOfTable(rowId) {
  return '<tr class=row-' + rowId + '>' + '</tr>';
}

;

function createYaxis(rowId) {
  return '<td>' + rowId + '</td>';
}

function createXaxis(rowId) {
  return createYaxis(rowId);
}

function createTdOfTableV2(row, col, amountRow) {
  return '<td class=' + (amountRow - row) + '-' + (col + 1) + '><span>' + '' + '</span></td>';
}

function createEndTable(domId, newArray) {
  var component = '<tr class=row-0>' + '<td>0</td>' + '</tr >' + '<tr><td style="border: none;" colspan="' + (newArray.length + 1) + '">Likelihood</td></tr>' + '</tr>';

  if (newArray.length) {
    $(domId).append(component);

    for (j = 0; j < newArray.length; ++j) {
      $("".concat(domId, " >.row-0")).append(createXaxis(j + 1));
    }
  }
}

function painColorAndContent(domId, newArray, prop) {
  var amountRow = newArray.length;

  for (row = 0; row < amountRow; row++) {
    for (col = 0; col < newArray[row].col.length; col++) {
      var select = "".concat(domId, " > tr.row-").concat(row + 1, " > td.").concat(row + 1, "-").concat(col + 1);

      if (newArray[row].col[col]["".concat(prop)] === 0) {
        $(select).text('');
      } else {
        console.log(select);
        $(select).text(newArray[row].col[col]["".concat(prop)]);
      }
    }
  }
}