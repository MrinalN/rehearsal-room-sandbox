module.exports = (db) => {
  const getSpaces = () => {
    const query = {
      text: 'SELECT * FROM spaces',
    }
    return db.query(query)
      .then(result => result.rows)
      .catch(err => err);
  }

  const getSpacesByCity = (city) => {
    const queryString = `
      SELECT *
      FROM spaces
      WHERE LOWER(city) LIKE $1
      ORDER BY id DESC
    `
    const queryParams = [`%${city.toLowerCase()}%`]

    return db.query(queryString, queryParams)
      .then(result => result.rows)
      .catch(err => err);
  }

  const getSpacesByKeyword = (keyword) => {
    const queryString = `
      SELECT *
      FROM spaces
      WHERE title LIKE $1
        OR description LIKE $1
    `
    const queryParams = [`%${keyword}%`]

    return db.query(queryString, queryParams)
      .then(result => result.rows)
      .catch(err => err);
  }

  const getSpacesByUserId = userId => {
    const queryString = `
      SELECT *
      FROM spaces
      WHERE user_id = $1
    `
    const queryParams = [userId]

    return db.query(queryString, queryParams)
      .then(result => result.rows)
      .catch(err => err);
  }

  //to display for space/:id
  const getSpaceById = (id) => {
    const queryString = `
      SELECT users.first_name, 
             users.last_name, 
             users.organization_name, 
             users.email, 
             users.photo, 
             users.phone, 
             
             spaces.id, 
             spaces.title, 
             spaces.description, 
             spaces.cover_photo_url, 
             spaces.address, 
             spaces.city, 
             
             maps.latitude, 
             maps.longitude, 
             
             spaces.price_per_day, 
             spaces.price_per_hour, 

             wifi,
             sound_proofing,
             sprung_floor,
             kitchenette,
             mirrors,
             sound_system,
             bathroom,
             indoor_space,
             outdoor_space,
             bike_parking,
             street_parking,
             private_parking,
             piano,
             natural_light,
             air_conditioning,
             ten_ft_plus_ceiling,
             private,
             semi_private,
             wheelchair_accessible,
             self_entry,
         
             active

      FROM spaces
      JOIN users ON users.id = spaces.user_id
      JOIN maps ON maps.space_id = spaces.id
      WHERE spaces.id = $1
    `
    const queryParams = [id]

    return db.query(queryString, queryParams)
      .then(result => result.rows)
      .catch(err => err);
  }

  const addSpace = (spaceData) => {
    // TODO: Test that addSpace actually works the way I think it should.
    return db.insert('spaces', spaceData)
      .then(result => result.rows)
      .catch(err => err);
  }

  const addMap = (mapData) => {
    return db.insert('maps', mapData)
    .then(result => result.rows)
    .catch(err => err)
  }

  const deleteSpace = id => {
    const queryString = `
      DELETE FROM spaces
      WHERE id = $1
      RETURNING *
    `;
    const queryParams = [id]
    return db.query(queryString, queryParams)
    .then(result => result.rows)
    .catch(err => err)
  }

  return {
    getSpaces,
    getSpacesByCity,
    getSpacesByUserId,
    getSpacesByKeyword,
    getSpaceById,
    addSpace,
    deleteSpace,
    addMap
  };
}