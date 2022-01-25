const axios = require('axios');
const { mysql, mysqlFunc } = require('../models/mysql');

const filmUrl = 'https://swapi.py4e.com/api/films/';


const sortFunction = (obj, key, direction) => {
  direction = direction === 'asc' ? -1 : 1;
  return obj.sort((a, b) => {
    return a[key] < b[key] ? direction : a[key] > b[key] ? (-1 * direction) : 0;
  })
}

const sortCharacters = (raw, params) => {
  const { name, gender, height } = params;
  if (name && (name === 'asc' || name === 'desc')) {
    return sortFunction(raw, 'name', name);
  }
  if (gender && (gender === 'asc' || gender === 'desc')) {
    return sortFunction(raw, 'gender', gender);
  }
  if (height && (height === 'asc' || height === 'desc')) {
    return sortFunction(raw, 'height', height);
  }
  return raw;
}


const getTotalHeight = (arr) => {
  let cm = arr.reduce((prev, curr) => prev + Number(curr.height), 0)
  let ft = (cm / 34).toFixed(2);
  return { cm, ft }
}

const characters = (res, movie_id, sort = false) => {
  let response = { success: true, total_height: 0, total_characters: 0, message: '', results: [] };
  try {
    axios.get(filmUrl + movie_id).then((resp) => {
      if (resp.data.detail) res.status(400).json(response);
      let characters = resp.data.characters;
      const asyncFunc = async (callback) => {
        const unresolved = characters.map((url) => {
          return axios.get(url).then((resp) => {
            const { name, height, gender } = resp.data;
            return { name, height, gender };
          })
        });
        const all = await Promise.all(unresolved);
        callback(all)
      }
      asyncFunc((characters) => res.status(200).json({ success: true, total_height: getTotalHeight(characters), total_characters: characters.length, message: 'request successful', results: sort ? sortCharacters(characters, sort) : characters }))
    }).catch((error) => {
      throw error.response;
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error, results: [] })
  }
}



module.exports = (req, res) => {
  const movie_id = req.params.id;
  const queryParam = req.query;
  if (Object.keys(queryParam).length) {
    characters(res, movie_id, queryParam);
  } else {
    characters(res, movie_id)
  }
}