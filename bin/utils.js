require('dotenv').config();

const apiURLMap = {
    'playing' : 'https://api.themoviedb.org/3/movie/now_playing',
    'popular' : 'https://api.themoviedb.org/3/movie/popular',
    'top' : 'https://api.themoviedb.org/3/movie/top_rated',
    'upcoming': 'https://api.themoviedb.org/3/movie/upcoming'
}

const messageHolders = {
    'playing' : 'Displaying a list of movies that are currently in theatres.',
    'popular' : 'Displaying a list of movies ordered by popularity.',
    'top' : 'Displaying a list of movies ordered by rating',
    'upcoming': 'Displaying a list of movies that are being released soon'
}

const optionObject = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.API_ACCESS_TOKEN}`
    }
}

const apiUtility = async ({type, language, page}) => {
    const urlEndpoint = `${apiURLMap[type]}?language=${language}&page=${page}`;
    try{
        const res = await fetch(urlEndpoint,optionObject);
        if(!res.ok){
            throw new Error(`Response Status ${res.status}`);
        }

        const result = await res.json();
        
        let resultData = [];

        for(let elem of result.results){
            resultData.push({
                id: elem.id,
                title: elem.title,
                vote_average: elem.vote_average,
                vote_count: elem.vote_count,
                is_adult: elem.adult
            })
        }

        console.log(messageHolders[type]);
        return resultData;

    }catch(err){
        console.error(err.message);
    }
}

module.exports = {apiUtility};