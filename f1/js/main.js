let standingsSearchForm = document.getElementById("standingsSearch");

standingsSearchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let formData = new FormData(standingsSearchForm);
  let season = formData.get("season");
  let round = formData.get("round");

  fetch(`https://ergast.com/api/f1/${season}/${round}/driverStandings.json
  `)
    .then((res) => res.json())
    .then((data) =>
      displaySearchResult(data["MRData"]["StandingsTable"]["StandingsLists"])
    );
  setBg();
});

function displaySearchResult(standings) {
  let standingsEl = document.getElementById("standingsTable");
  console.log(standings);

  if (standings.length == 0) {
    standingsEl.innerHTML = `<tr>
    <th scope="row">❌</th>
    <td colspan= 4>Not a valid Season or Round. Please try again</td>`;
    return;
  }

  for (let standing of standings[0]["DriverStandings"]) {
    let tableRow = `
      <tr>
      <th scope="row">${standing.position}</th>
      <td>${standing.Driver.givenName} ${standing.Driver.familyName}</td>
      <td>${standing.Driver.nationality}</td>
      <td>${standing.wins}
      <td>${standing.points}</td>
    </tr>
        `;

    standingsEl.innerHTML += tableRow;
  }
}

