const imPactlevel = 5;
const likelinkhood = 5;


const sortCriteria = (storeCriteria) => {
  return storeCriteria.sort((a,b) => {
    if(a.RiskLevel === b.RiskLevel) return b.ImpactLevel - a.ImpactLevel;
    return  b.RiskLevel - a.RiskLevel;
  }) 
}


const generatorCriteria = (imPactlevel,likelinkhood) => {
  const imPactItems = Array.from({length: imPactlevel}, (_, i) => i + 1);
  const respData = [];
  imPactItems.map((imPactItem) =>{
    const likelinkhoodItems = Array.from({length: likelinkhood}, (_, i) => i + 1);
    let RiskLevel = 0;
    likelinkhoodItems.map((likelinkhoodItem) => {
      RiskLevel = imPactItem * likelinkhoodItem;
      respData.push({
        RiskLevel,
        LikelihoodLevel :likelinkhoodItem,
        ImpactLevel :imPactItem,
        RiskAcceptanceID: 0,
      })
    })
  })
  return sortCriteria(respData)
}

const mergeCriteria = (storeCriteria, imPactlevel,likelinkhood) => {
  const resultSort = sortCriteria(storeCriteria);
  const maxData = resultSort[0];
  const diffImpact = imPactlevel - maxData.ImpactLevel;
  const respData = [];
  let RiskLevel = 0;
  for (i = 0; i < diffImpact; i++) {
    const likelinkhoodItems = Array.from({length: likelinkhood}, (_, i) => i + 1);
    likelinkhoodItems.map((likelinkhoodItem) => {
      RiskLevel = (maxData.ImpactLevel + 1) * likelinkhoodItem;
      respData.push({
        RiskLevel,
        LikelihoodLevel :likelinkhoodItem,
        ImpactLevel  :maxData.ImpactLevel + (i+1),
        RiskAcceptanceID: 0,
      })
    })
  }



  const mergeData = [...respData, ...storeCriteria];
  return sortCriteria(mergeData);

}




// console.log("-----------------------");
const criteriaData = generatorCriteria(5,5)
// console.log(criteriaData);
console.log("-----------------------");
const newCriteria = mergeCriteria(criteriaData, 7,7)
console.log(newCriteria)

