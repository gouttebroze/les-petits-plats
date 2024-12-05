import { recipes } from "./recipes";

/****************************************
 * filter recipes using reduce() method *
 ****************************************/
/**
 * @param {string[]} term 
 * @returns {string[]} recipesFiltred - a new array that contains search result values
 */
export function filterByReduceMethod(term) {
  const recipesFiltered = recipes.reduce((acc, curr) => {
    // acc. (or accumulator), curr. (or current value)
    // const { id, ...otherProps } = curr; // destructuring recipes array, that is the curr. val. ("curr")
    if (curr.name.toLowerCase().includes(term)
      || curr.description.toLowerCase().includes(term)
      || curr?.ingredients?.ingredient?.toLowerCase()?.includes(term)) {
      acc.push(curr);
      /* to each time it's processed, we push the elements into the acc., 
      that is an array (because it start with initial value, that is an empty array)
      */
    }
    return acc; /* return accumulator - it's operation works as follow: 
        - each of the values in the table is processed, 
        and each time it is processed, the value accumulates, 
        starting with the initial value, & until acc. is returned...    
    */
  }, []); // initial value is an empty array []
  return recipesFiltered;
}

/**
 * @typedef {Object} SearchQuery
 * @property {string} term - Le terme de recherche saisi par l'utilisateur.
 * @property {string[]} appliances - Une liste d'appareils liés à la recherche.
 * @property {string[]} ustensils - Une liste d'ustensiles liés à la recherche.
 * @property {string[]} ingredients - Une liste d'ingrédients liés à la recherche.
 */

/**
 * Processes a search query object.
 * @param {SearchQuery} searchForm - The search query containing filters.
 * @returns {void}
 */
export function filterByReduce(searchForm) {

  const {
    term, appliances, ustensils, ingredients
  } = searchForm;

  // recherche globale
  const recipesFiltered = recipes.reduce((acc, curr) => {

    if (curr.name.toLowerCase().includes(term)
      || curr.description.toLowerCase().includes(term)
      || curr?.ingredients?.ingredient?.toLowerCase()?.includes(term)) {
      acc.push(curr);
    }
    return acc;

  }, []); // initial value is an empty array []

  // filtre par appareil
  const appliancesFilter = recipesFiltered.reduce((acc, curr) => {
    if (curr.appliances.toLowerCase().includes(appliances)) {
      acc.push(curr);
    }
  }, [])

  return appliancesFilter;
}

/**
 *  NOTES / MEMO on "reduce()" method:
 *  - come from JavaScript Array object method, 
 *  - that allow to work on an array copie as immutable principe
 *  - acc.: total value that accumulate on eatch iteration
 *  - curr.:
 *  - init. value: - is optional, intiale value before loops starts, 
 *                 it can be any type (an array, an object, a number ...)
 */

const musicBandsInfos = [
  {
    label: '',
    musicalStyle: 'punk',
    stillPlaying: false,
    country: 'usa', albums: 12, nom: 'Ramones', from: 'New-York',
    collaborations: [
      {
        turnedOrRecorded: 'turned with Pavement',
        turnedOrRecorded: 'turned with Throwing Muses',
        turnedOrRecorded: 'with Low, recorded by Touch & Go label',
        turnedOrRecorded: 'turned with Cat Power',
        turnedOrRecorded: 'turned with PJ Harvey',
        turnedOrRecorded: 'turned with The Pogues',
        turnedOrRecorded: 'turned with Nick Cave',
        turnedOrRecorded: 'turned with Sonic Youth'
      }
    ]
  },
  {
    label: '', musicalStyle: 'punk & traditional irish folk',
    stillPlaying: false,
    country: 'uk',
    albums: 6,
    nom: 'The Pogues', from: 'London',
    collaborations: [{
      turnedOrRecorded: 'turned with Pavement',
      turnedOrRecorded: 'turned with Throwing Muses',
      turnedOrRecorded: 'with Low, recorded by Touch & Go label',
      turnedOrRecorded: 'turned with Cat Power',
      turnedOrRecorded: 'turned with PJ Harvey',
      turnedOrRecorded: 'turned with The Pogues',
      turnedOrRecorded: 'turned with Nick Cave',
      turnedOrRecorded: 'turned with Sonic Youth'
    }]
  },
  {
    label: '', musicalStyle: 'punk',
    stillPlaying: true,
    country: 'nepal', albums: 4, nom: 'Raï-Kho-Ris', from: 'katmandou',
    collaborations: [{
      turnedOrRecorded: 'turned with Pavement',
      turnedOrRecorded: 'turned with Throwing Muses',
      turnedOrRecorded: 'with Low, recorded by Touch & Go label',
      turnedOrRecorded: 'turned with Cat Power',
      turnedOrRecorded: 'turned with PJ Harvey',
      turnedOrRecorded: 'turned with The Pogues',
      turnedOrRecorded: 'turned with Nick Cave',
      turnedOrRecorded: 'turned with Sonic Youth'
    }]
  },
  {
    /*
    return only if the band is stillPlaying, have released more than 6 albums & is comming from Seattle, 
    // so this band is... EARTH, yeah, okay... famous doom rock band, leaded by Dylan Carlson, great musician & a really nice person, 
    // a very nice guy, having met him during a completely unsuccessful interview, realised with my old friend, Loïc Devigne. 
    // And, he and my friend have been working on some folk music writings ... !!!
    //a very nice guy, having met him during a completely unsuccessful interview. 
    // He and my friend had been working on some folk music writing, a lovely project 
    // that would have made for good reading, always funny, quirky and surprising, 
    //for sure, but since fallen by the wayside or into oblivion it seems to me.
    */
    label: '', musicalStyle: 'doom',
    stillPlaying: true,
    country: 'usa', albums: 7, nom: 'Earth', from: 'Seattle', collaborations: [
      {
        turnedOrRecorded: 'turned with Pavement',
        turnedOrRecorded: 'turned with Throwing Muses',
        turnedOrRecorded: 'with Low, recorded by Touch & Go label',
        turnedOrRecorded: 'turned with Cat Power',
        turnedOrRecorded: 'turned with PJ Harvey',
        turnedOrRecorded: 'turned with The Pogues',
        turnedOrRecorded: 'turned with Nick Cave',
        turnedOrRecorded: 'turned with Sonic Youth'
      }
    ]
  },
  {
    label: '', musicalStyle: 'punk',
    stillPlaying: false,
    country: 'usa', albums: 7, nom: 'Butthole Surfers', from: 'Austin, Texas',
    collaborations: [{
      turnedOrRecorded: 'turned with Pavement',
      turnedOrRecorded: 'turned with Throwing Muses',
      turnedOrRecorded: 'with Low, recorded by Touch & Go label',
      turnedOrRecorded: 'turned with Cat Power',
      turnedOrRecorded: 'turned with PJ Harvey',
      turnedOrRecorded: 'turned with The Pogues',
      turnedOrRecorded: 'turned with Nick Cave',
      turnedOrRecorded: 'turned with Sonic Youth'
    }]
  },
  {
    label: '', musicalStyle: 'punk rock as jazz, reggae, ska & more influences',
    stillPlaying: false,
    country: 'uk', albums: 6, nom: 'The Clash', from: 'London', collaborations: [
      {
        turnedOrRecorded: 'turned with Pavement',
        turnedOrRecorded: 'turned with Throwing Muses',
        turnedOrRecorded: 'with Low, recorded by Touch & Go label',
        turnedOrRecorded: 'turned with Cat Power',
        turnedOrRecorded: 'turned with PJ Harvey',
        turnedOrRecorded: 'turned with The Pogues',
        turnedOrRecorded: 'turned with Nick Cave',
        turnedOrRecorded: 'turned with Sonic Youth'
      }
    ]
  },
  {
    label: '', musicalStyle: 'post punk noise',
    stillPlaying: true,
    country: 'uk',
    albums: 6,
    nom: 'The Pixies',
    from: 'somewhere, maybe ...', collaborations: [
      {
        turnedOrRecorded: 'turned with Pavement',
        turnedOrRecorded: 'turned with Throwing Muses',
        turnedOrRecorded: 'with Low, recorded by Touch & Go label',
        turnedOrRecorded: 'turned with Cat Power',
        turnedOrRecorded: 'turned with PJ Harvey',
        turnedOrRecorded: 'turned with The Pogues',
        turnedOrRecorded: 'turned with Nick Cave',
        turnedOrRecorded: 'turned with Sonic Youth'
      }
    ]
  },
  {
    label: ['Scuzz Productions', 'Torn & Frayed', 'Anchor & Hope', 'Madman', 'Bella Union', 'Touch & Go'],
    musicalStyle: 'instrumental rock',
    stillPlaying: true,
    country: 'Australia',
    albums: 17,
    nom: 'Dirty Three',
    from: 'Melbourne',
    collaborations: [
      {
        turnedOrRecorded: 'turned with Pavement',
        turnedOrRecorded: 'turned with Throwing Muses',
        turnedOrRecorded: 'with Low, recorded by Touch & Go label',
        turnedOrRecorded: 'turned with Cat Power',
        turnedOrRecorded: 'turned with PJ Harvey',
        turnedOrRecorded: 'turned with The Pogues',
        turnedOrRecorded: 'turned with Nick Cave',
        turnedOrRecorded: 'turned with Sonic Youth'
      }
    ]
  },
];

function bandsInformations(term) {
  const musiciansObj = musicBandsInfos.reduce((acc, curr) => {
    const { country, nom, from, ...otherProps } = curr;

    if (curr.country === term) {
      curr.nom + ' ';
    }
    // acc[curr.country] = otherProps;
    return acc;
  }, {});
  return musiciansObj;
}
console.log('info. music bands here: ', bandsInformations('uk'));

const punkBands = musicBandsInfos.reduce((acc, curr) => {
  const { nom, musicalStyle, albums, from, country, stillPlaying, ...otherProps } = curr;
  if (curr.albums > 3 && curr.musicalStyle.includes('punk')) {

    acc[curr.nom] = curr.from; // 'nom' as obj.key: 'from' as obj. values
  }

  return acc;
}, {}); // on commence à parcourir le tab. avec 0 comme nbre d'albums 
console.log('bands as punk rock music could be :', punkBands);

const bandsByFrom = musicBandsInfos.reduce((acc, curr) => {
  const { nom, albums, from, stillPlaying, ...otherProps } = curr;
  if (curr.stillPlaying && curr.albums > 6 && curr.from === 'Seattle') {
    acc[curr.nom] = curr.from; // 'nom' as obj.key: 'from' as obj. values
  }
  return acc;
}, {}); // on commence à parcourir le tab. avec 0 comme nbre d'albums 
console.log('from-location:', bandsByFrom);

const bandsFromUK = musicBandsInfos.reduce((acc, curr) => {
  if ((Object.keys(acc).includes(curr.country))) {
    acc[curr.country] += curr.nom
  } else {
    acc[curr.country] = curr.nom
  }
  return acc;
}, {}); // on commence à parcourir le tab. avec 0 comme nbre d'albums 
console.log('Reduce bands from UK:', bandsFromUK);

const nbreOfAlbums = musicBandsInfos.reduce((acc, curr) => {
  acc += curr.albums;
  return acc;
}, 0); // on commence à parcourir le tab. avec 0 comme nbre d'albums 
const albumNumberByCountry = musicBandsInfos.reduce((acc, curr) => {
  if (Object.keys(acc).includes(curr.country)) {
    acc[curr.country] += curr.albums;
  } else {
    acc[curr.country] = curr.albums;
  }
  return acc;
}, {});
console.log("nombre d'albums", albumNumberByCountry);   // usa:26, uk: 12, nepal: 4