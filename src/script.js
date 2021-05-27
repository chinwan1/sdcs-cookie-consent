const inititail = async () => {
  const mockData = await fetch('http://localhost:3000/mockData')
  .then(response => response.json())
  .then(data => { return data });

  console.log(mockData);
}


