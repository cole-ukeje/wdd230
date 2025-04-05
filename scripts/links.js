const baseURL = "https://cole-ukeje.github.io/wdd230/";  // Replace with your base URL
const linksURL = "https://cole-ukeje.github.io/wdd230/data/links.json";  // Path to links.json file

async function getLinks() {
  const response = await fetch(linksURL);
  const data = await response.json();
  displayLinks(data);
}

function displayLinks(data) {
  const linksContainer = document.getElementById('links-container'); // Add a div with this id in HTML
  
  // Loop through the weeks and their activity links
  data.weeks.forEach(week => {
    const weekElement = document.createElement('div');
    const weekHeader = document.createElement('h3');
    weekHeader.textContent = week.week;
    weekElement.appendChild(weekHeader);
    
    const linksList = document.createElement('ul');
    week.links.forEach(link => {
      const linkItem = document.createElement('li');
      const linkAnchor = document.createElement('a');
      linkAnchor.href = baseURL + link.url;
      linkAnchor.textContent = link.title;
      linkItem.appendChild(linkAnchor);
      linksList.appendChild(linkItem);
    });
    
    weekElement.appendChild(linksList);
    linksContainer.appendChild(weekElement);
  });
}

// Call the function to load links
getLinks();