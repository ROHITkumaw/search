const search = document.getElementById('search');
const MatchList = document.getElementById('match-list');
const searchStates = async searchText => {
     const res = await fetch('../data/states.json');
     const states = await res.json();
    // console.log(states);
     // get matches 
     let matches  =  states.filter(state => {
      const regrex = new RegExp(`^${searchText}` ,'gi'); // gi is global insensitive 
      return state.name.match(regrex) || state.abbr.match(regrex);
     });
      // removing after deleting space 
          if(searchText.length === 0)
          {
             matches=[];
             MatchList.innerHTML = '';
          }
          outputhtml(matches);
     };
     const outputhtml = matches => {
        if(matches.length > 0)
        {
           const html = matches.map(match => `
              <div class = "card card-body mb-1">
                <h4>${match.name} (${match.abbr})<span class = "text-primary">${match.capital}</span></h4>
                <small>Lat:${match.lat} / Long:${match.long}</small>
              </div>
           `).join('');
           //console.log(html);
           MatchList.innerHTML = html;

        }
     };
    search.addEventListener('input', () => searchStates(search.value));
